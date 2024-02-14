import { Asr, Dhuhr, Fajr, Isha, Maghrib, Sunrise } from '../components/icons';
import { PrayerInfo } from './type';

const prayersTextColors: Record<string, string> = {
  fajr: 'white',
  sunrise: 'black',
  dhuhr: 'black',
  asr: 'black',
  maghrib: 'black',
  isha: 'white'
};

const prayersColors: Record<string, string> = {
  fajr: 'bg-[#2e689f]',
  sunrise: 'bg-[#fedfb1]',
  dhuhr: 'bg-[#FFCC33]',
  asr: 'bg-[#f5ad43]',
  maghrib: 'bg-[#fad6a5]',
  isha: 'bg-[#16165F]'
};

const prayerIcons: Record<string, JSX.Element> = {
  fajr: <Fajr />,
  sunrise: <Sunrise />,
  dhuhr: <Dhuhr />,
  asr: <Asr />,
  maghrib: <Maghrib />,
  isha: <Isha />
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPrayerStyle(prayerName: string): string {
  return `${prayersColors[prayerName]} text-${prayersTextColors[prayerName]}`;
}

interface PrayerData {
  timings: Record<string, string>;
}

export function mapPrayers(prayerData: PrayerData, prayersNames?: Record<string, string>): PrayerInfo[] {
  const prayerNamesOrder = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  return prayerNamesOrder.map((prayerName) => {
    const prayerHour = prayerData.timings[capitalize(prayerName)];
    const style = getPrayerStyle(prayerName);
    const icon = prayerIcons[prayerName];
    const name = prayersNames?.[prayerName];

    return { prayerHour, style, icon, name };
  });
}
