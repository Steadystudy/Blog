import ContactForm from '@/components/ContactForm';

const LINKS = [
  { image: 'Github Emoji', url: '' },
  { image: 'Linked In Emoji', url: '' },
];

export default function ContactPage() {
  return (
    <>
      <section>
        <h1>Contact Me</h1>
        <p>sgmin206@naver.com</p>
        <div>
          {LINKS.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer">
              {link.image}
            </a>
          ))}
        </div>
      </section>
      <ContactForm />
    </>
  );
}
