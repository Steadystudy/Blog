import './globals.css';
import Footer from '@/components/Footer';
import { Noto_Sans } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Providers from '@/provider/ThemeProvider';

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

const sans = Noto_Sans({ subsets: ['latin'], weight: '500', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full lg:pl-[80px] h-full">
        <Providers>
          <Sidebar />
          <main className="relative lg:max-w-[900px] mx-auto w-full grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
