import { Logo } from 'components/icons';
import { lang } from 'lib';

export default function Brand() {
  const data = lang();

  return (
    <div className="flex items-center gap-2 text-lg">
      <Logo width={37} height={37} /> <span className="capitalize">{data?.logo}</span>
    </div>
  );
}
