import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCalendarByCity, getTimingsByCity, loadGeolocation } from './actions';
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

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  async function fetchData(geolocation: GeolocationProps) {
    try {
      let [prayerData, calendar] = await Promise.all([getTimingsByCity(geolocation), getCalendarByCity(geolocation)]);

      return { prayerData, calendar };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  let dict = await getDictionary(lang);
  let geolocation = await loadGeolocation();
  const LocaleSwitcher = lang === 'en' ? 'ar' : 'en';
  let { prayerData, calendar } = await fetchData(geolocation);
  let prayers = mapPrayers(prayerData.data, dict?.prayers);

  return (
    <>
      <section className="relative border-2 border-yellow-400 flex flex-col-reverse md:flex-row gap-7 justify-between items-center w-full bg-green-800 text-white py-20 px-8 md:px-14 rounded-3xl h-full">
        <Link
          type="button"
          href={LocaleSwitcher}
          className="absolute border-2 text-yellow-400 border-yellow-400 uppercase w-12 border-b-0 -top-[50px] left-[5%] bg-green-800 p-3 rounded-t-lg"
        >
          {LocaleSwitcher}
        </Link>
        <Suspense fallback={<LoadingIndicator />}>
          {geolocation.error ? (
            <ErrorMessage />
          ) : (
            <PrayerView prayers={prayers} locale={lang} geolocation={geolocation} dict={dict} /> // Render the PrayerView component with necessary props
          )}
        </Suspense>
      </section>
      <section className="border-2 border-yellow-400 flex flex-col-reverse md:flex-row gap-7 justify-between items-center w-full bg-green-800 text-white py-20 px-8 md:px-14 rounded-3xl h-full">
        <Suspense fallback={<LoadingIndicator />}>
          <PrayerCalendar calendar={calendar} prayersNames={dict?.prayers} locale={lang} />
        </Suspense>
      </section>
    </>
  );
}

function LoadingIndicator() {
  return (
    <p className="w-full text-center text-5xl normal-case" dir="ltr">
      Loading...
    </p>
  );
}

function ErrorMessage() {
  return (
    <p className="w-full text-center text-3xl normal-case text-red-600">
      Sorry, we were unable to determine the prayer time in your country
    </p>
  );
}
