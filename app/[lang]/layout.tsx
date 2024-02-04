import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import window from '../../public/window.svg';
import { i18n, type Locale } from '../../i18n-config';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: '...',
  description: '...',
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html lang={params.lang} className={inter.className} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-green-700 flex flex-col justify-between min-h-screen">
        <Image
          src={window}
          width={100}
          height={100}
          className="fixed top-0 min-h-screen w-full -z-50"
          alt={''}
          aria-hidden={true}
        />
        <main className="max-w-[70rem]  px-2 py-24 space-y-32 mx-auto" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
