import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header, Footer } from 'components/common';
import { Inter } from '@next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Container(props: { [x: string]: any; children: React.ReactNode }) {
  const router = useRouter();
  const { children, ...customMeta } = props;
  const { locale } = useRouter();

  const meta = {
    title: 'Prayer',
    description: ``,
    image: '',
    ...customMeta
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{meta.title}</title>
        <link rel="canonical" href={`https://www..${router.asPath}`} />
      </Head>
      <div className={`${inter.className} app`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Image
          src="/static/images/window.svg"
          width={100}
          height={100}
          className="fixed top-0 min-h-screen w-full -z-50 object-cover"
          alt={''}
          quality={100}
          aria-hidden={true}
        />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
