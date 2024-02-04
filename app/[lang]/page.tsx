import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getDictionary } from '../../get-dictionary';
import { Locale } from '../../i18n-config';
import { getCalendarByCity, getHadiths, getTimingsByCity, loadGeolocation } from './actions';
import Hadith from './components/hadith';
import PrayerView from './components/prayer-view';
import { mapPrayers } from './lib/prayers';
import type { GeolocationProps, PrayerCalendarProps } from './lib/type';
import { convertToSeconds, secondsToHm } from './utils';

function PrayerCalendar({ calendar, locale, prayersNames }: PrayerCalendarProps) {
  const date = new Date();
  const dayOfMonth = Number(date.toLocaleString('en', { day: '2-digit' }));
  const maxStartDay = Math.max(0, calendar.data.length === dayOfMonth ? dayOfMonth - 1 : dayOfMonth - 2);
  const startDay = Math.min(maxStartDay, calendar.data.length - 1);
  const endDay = Math.min(dayOfMonth + 10, calendar.data.length);
  const slicedData = calendar.data.slice(startDay, endDay);

  return (
    <div className="w-full space-y-10 overflow-auto">
      <table className="font-medium w-[350%] sm:w-[250%] md:w-[200%] lg:w-full">
        <thead>
          <tr className="grid grid-flow-col grid-cols-7 items-center gap-2">
            <th className="text-start whitespace-nowrap">
              <Suspense fallback={null}>{date.toLocaleString(locale, { month: 'long', year: 'numeric' })}</Suspense>
            </th>
            {Object.keys(prayersNames).map((prayer) => {
              return <th key={prayersNames[prayer]}>{prayersNames[prayer]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {slicedData.map((item) => {
            return (
              <tr
                key={item.date.readable}
                className={`grid grid-flow-col grid-cols-7 items-center gap-2 ${
                  Number(
                    date.toLocaleString('en', {
                      day: '2-digit'
                    })
                  ) === Number(item.date.gregorian.day)
                    ? 'bg-yellow-400 text-black'
                    : ''
                }`}
              >
                <td className="whitespace-nowrap">
                  {item.date.gregorian.day} {locale === 'en' ? item.date.gregorian.weekday.en : item.date.hijri.weekday.ar}
                </td>
                {Object.keys(item.timings).map((pr) => {
                  const secondsOfThePrayers = convertToSeconds(item.timings[pr].substring(0, 5));
                  const shortHour = secondsToHm(secondsOfThePrayers);

                  return Object.keys(prayersNames).map((prayer) => {
                    if (prayer.toLocaleLowerCase() === pr.toLocaleLowerCase())
                      return (
                        <td key={pr} className="text-center" dir="ltr">
                          {shortHour}
                        </td>
                      );
                  });
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

async function fetchData(geolocation: GeolocationProps) {
  try {
    const [prayerData, calendar, hadiths] = await Promise.all([
      getTimingsByCity(geolocation),
      getCalendarByCity(geolocation),
      getHadiths()
    ]);

    return { prayerData, calendar, hadiths };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  const geolocation = await loadGeolocation();
  const LocaleSwitcher = lang === 'en' ? 'ar' : 'en';
  const { prayerData, calendar, hadiths } = await fetchData(geolocation);
  const prayers = mapPrayers(prayerData.data, dict?.prayers);

  if (!geolocation) {
    notFound();
  }

  return (
    <>
      <section className="relative">
        <Link
          type="button"
          href={LocaleSwitcher}
          className="absolute border-2 border-yellow-400 uppercase w-12 border-b-0 -top-[50px] left-[5%] bg-green-800 p-3 rounded-t-lg"
        >
          {LocaleSwitcher}
        </Link>
        <PrayerView prayers={prayers} locale={lang} geolocation={geolocation} dict={dict} />
      </section>
      <section>
        <PrayerCalendar calendar={calendar} prayersNames={dict?.prayers} locale={lang} />
      </section>
      <article className="relative">
        <Hadith hadiths={hadiths} locale={lang} dict={dict?.home} />
      </article>
    </>
  );
}
