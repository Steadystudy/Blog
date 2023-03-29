import nodemailer from 'nodemailer';

export type EmailData = {
  from: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '', // generated ethereal user
    pass: '', // generated ethereal password
  },
});

export default function sendEmail({ from, subject, message }: EmailData) {
  const data: nodemailer.SendMailOptions = {
    from,
    to: '', // Auth user
    subject,
    html: `
        <h1>${subject}</h1>
        <div>${message}</div>
        <br />
        <p>보낸사람 : ${from}</p>
      `,
  };

  return transporter.sendMail(data);
}
