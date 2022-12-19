import type { PrayerCalenderProps, TimezoneProps } from 'lib/type';
import { Suspense } from 'react';
import { convertToSeconds, secondsToHm } from 'utils';

export default function PrayerCalender({ prayers, calender, locale, date }: PrayerCalenderProps) {
  return (
    <table className="font-medium w-[350%] sm:w-[250%] md:w-[200%] lg:w-full">
      <thead>
        <tr className="grid grid-flow-col grid-cols-7 items-center gap-2">
          <th className="text-start whitespace-nowrap">
            <Suspense fallback={null}>{date.toLocaleString(locale, { month: 'long', year: 'numeric' })}</Suspense>
          </th>
          {prayers.map((prayer: any) => {
            return <th key={prayer.en}>{locale === 'en' ? prayer.en : prayer.ar}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {calender.data
          .slice(
            Number(
              date.toLocaleString('en', {
                day: '2-digit'
              })
            ) - 2,
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

                  return prayers.map((prayer) => {
                    if (prayer.en === pr)
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
