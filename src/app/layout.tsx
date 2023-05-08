import Header from '@/components/Header';
import './globals.css';
import Footer from '@/components/Footer';
import { Noto_Sans } from 'next/font/google';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: {
    default: 'MSG',
    template: 'MSG | %s',
  },
  description: '프론트엔드 개발자 MSG 블로그',
  icons: {
    icon: '/favicon.ico',
  },
};

const sans = Noto_Sans({ subsets: ['latin'], weight: '500' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.className}>
      <body className="relative flex flex-col w-full mx-auto max-w-screen-2xl lg:pl-[80px]">
        <Sidebar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
