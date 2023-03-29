'use client';

import { FormEvent, useState } from 'react';
import Banner, { BannerType } from './Banner';
import sendContactEmail from '@/service/contact';

export type Form = {
  from: string;
  subject: string;
  message: string;
};

const INITIAL_FORM_STATE = {
  from: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<Form>(INITIAL_FORM_STATE);
  const [banner, setBanner] = useState<BannerType | null>(null);

  const onChange = ({ target }: { target: HTMLInputElement | HTMLTextAreaElement }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form)
      .then(() => {
        setBanner({ message: '성공했어', state: 'success' });
        setForm(INITIAL_FORM_STATE);
      })
      .catch(() => {
        setBanner({ message: '실패했어', state: 'fail' });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 3000);
      });
  };

  return (
    <>
      {banner && <Banner banner={banner} />}
      <form onSubmit={onSubmit} className="w-full max-w-md flex flex-col gap-2 p-4 bg-gray-600">
        <label className="group-[dd]" htmlFor="from">
          Your Email
        </label>
        <input
          type="email"
          id="from"
          name="from"
          value={form.from}
          required
          autoFocus
          onChange={onChange}
        />
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={form.subject}
          required
          onChange={onChange}
        />
        <label htmlFor="message">Message</label>
        <textarea
          rows={8}
          id="message"
          name="message"
          value={form.message}
          required
          onChange={onChange}
        />
        <button type="submit" className="bg-lime-400">
          Submit
        </button>
      </form>
    </>
  );
}
