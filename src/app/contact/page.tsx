import ContactForm from '@/components/ContactForm';

const LINKS = [
  { image: 'Github Emoji', url: '' },
  { image: 'LinkedIn Emoji', url: '' },
];

export default function ContactPage() {
  return (
    <>
      <section className="flex flex-col items-center my-8">
        <h1>Contact Me</h1>
        <p>sgmin206@naver.com</p>
        <ul className="flex gap-4">
          {LINKS.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-lime-700"
            >
              {link.image}
            </a>
          ))}
        </ul>
        <h2>Or send me an email</h2>
        <ContactForm />
      </section>
    </>
  );
}
