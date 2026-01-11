import './globals.css';
import Footer from '@/components/Footer';
import { Noto_Sans } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Providers from '@/provider/ThemeProvider';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: {
    default: 'Steadystudy',
    template: '%s | Steadystudy',
  },
  description: '프론트엔드 개발자 Steadystudy 블로그',
  icons: {
    icon: '/favicon.ico',
  },
};

const sans = Noto_Sans({ subsets: ['latin'], weight: '500', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={sans.className}>
      <body className="flex flex-col w-full lg:pl-[80px] h-full">
        <Providers>
          <Sidebar />
          <main className="relative lg:max-w-[960px] mx-auto w-full grow mt-10">{children}</main>
          <Footer />
        </Providers>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
