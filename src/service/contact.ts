import { EmailData } from './email';

export default async function sendContactEmail(email: EmailData) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `contact api에 제대로 전송이 되지 않았습니다.`);
  }

  return data;
}
