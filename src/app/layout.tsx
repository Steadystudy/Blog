import './globals.css';
import Footer from '@/components/Footer';
import { Noto_Sans } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Providers from '@/provider/ThemeProvider';
import Script from 'next/script';

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
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.className}>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <body className="flex flex-col w-full lg:pl-[80px] h-full">
        <Providers>
          <Sidebar />
          <main className="relative lg:max-w-[900px] mx-auto w-full grow mt-10">{children}</main>
          <Footer />
        </Providers>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
      </body>
    </html>
  );
}
