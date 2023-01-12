import Link from 'next/link';
import { useRouter } from 'next/router';
import { Brand } from 'components/ui';

export default function Header() {
  const router = useRouter();
  const { locale } = useRouter();

  return (
    <header role="banner" className="py-6 h-fit w-full z-10 flex items-center justify-center relative">
      <div className="container">
        <div className="flex flex-col">
          <div className="flex items-center	justify-between gap-2">
            <Link href="/">
              <Brand />
            </Link>
            <div className="flex gap-3 items-center">
              <Link
                locale={locale === 'en' ? 'ar' : 'en'}
                href={router.pathname}
                className="uppercase w-12 h-12 font-bold bg-green-600 rounded-lg grid place-content-center hover:ring-2 ring-yellow-400 transition-all"
              >
                {locale === 'en' ? 'ar' : 'en'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
