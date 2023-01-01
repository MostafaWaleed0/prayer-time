import { lang } from 'lib';
import type { PrayerCalendarProps } from 'lib/type';
import { Suspense } from 'react';
import { convertToSeconds, secondsToHm } from 'utils';

export default function PrayerCalendar({ calendar, locale, date }: PrayerCalendarProps) {
  const language = lang();
  const prayersNames = language?.prayers || {};

  return (
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
        {calendar.data
          .slice(
            Number(
              date.toLocaleString('en', {
                day: '2-digit'
              })
            ) - 1,
            Number(
              date.toLocaleString('en', {
                day: '2-digit'
              })
            ) + 10
          )
          .map((item) => {
            return (
              <tr
                key={item.date.readable}
                className={`grid grid-flow-col grid-cols-7 items-center gap-2 ${
                  Number(
                    date.toLocaleString('en', {
                      day: '2-digit'
                    })
                  ) === Number(item.date.gregorian.day) && 'bg-yellow-400 text-black'
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
  );
}
