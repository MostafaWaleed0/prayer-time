import './global.css';
import { i18n, type Locale } from '@/i18n-config';
import window from '@/public/window.svg';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prayer Time'
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Locale } }) {
  return (
    <html lang={params.lang} className={inter.className} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-green-700 min-h-screen grid">
        <Image
          src={window}
          width={100}
          height={100}
          className="fixed top-0 min-h-screen w-full -z-50 object-cover"
          alt={''}
          aria-hidden
        />
        <main className="w-full max-w-[70rem] px-2 py-24 space-y-32 m-auto" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
