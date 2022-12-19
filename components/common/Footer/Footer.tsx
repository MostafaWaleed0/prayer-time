import { Instagram, Facebook, Twitter } from 'components/icons';
import { Brand } from 'components/ui';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t-2 border-yellow-400 mt-20 py-5 bg-green-700">
      <div className="container">
        <div className="flex justify-between items-center">
          <Brand />
          <ul className="flex items-center gap-3">
            <li>
              <Link href="">
                <Instagram />
              </Link>
            </li>
            <li>
              <Link href="">
                <Facebook />
              </Link>
            </li>
            <li>
              <Link href="">
                <Twitter />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
