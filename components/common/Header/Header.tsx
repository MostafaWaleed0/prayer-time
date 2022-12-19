import Link from 'next/link';
import { useRouter } from 'next/router';
import { Brand } from 'components/ui';
import { useState } from 'react';
import { List } from 'components/icons';
import { lang } from 'lib';

export default function Header() {
  const data = lang();
  const router = useRouter();
  const [toggle, setToggle] = useState(true);
  const { locale } = useRouter();

  return (
    <header role="banner" className="py-6 h-fit w-full z-10 flex items-center justify-center relative">
      <div className="container">
        <div className="flex flex-col">
          <div className="flex items-center	justify-between gap-2">
            <Link href="/">
              <Brand />
            </Link>
            <nav
              aria-label="primary"
              tabIndex={-1}
              className={`md:flex p-3 lg:p-0 absolute top-full right-0 md:static md:h-fit text-lg bg-yellow-400 md:bg-transparent rounded-lg ${
                toggle ? 'hidden' : 'flex'
              }`}
            >
              <ul
                className="flex flex-col md:flex-row text-lg text-black md:text-white capitalize font-medium divide-y-2 md:divide-y-0 divide-white"
                role="list"
              >
                {/* {Object.keys({ ...data?.header }).map((item) => {
                  return (
                    <li key={item} className="p-4">
                      <Link href={data.header[item]}>{item}</Link>
                    </li>
                  );
                })} */}
              </ul>
            </nav>
            <div className="flex gap-3 items-center">
              <Link
                locale={locale === 'en' ? 'ar' : 'en'}
                href={router.pathname}
                className="uppercase w-12 h-12 font-bold bg-green-600 rounded-lg grid place-content-center hover:ring-2 ring-yellow-400 transition-all"
              >
                {locale === 'en' ? 'ar' : 'en'}
              </Link>
              {/* <button
                type="button"
                className="md:hidden uppercase w-12 h-12 font-bold bg-green-600 rounded-lg grid place-content-center hover:ring-2 ring-yellow-400 transition-all"
                onClick={() => setToggle((x) => !x)}
                aria-label="Toggle Menu"
              >
                <List />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
