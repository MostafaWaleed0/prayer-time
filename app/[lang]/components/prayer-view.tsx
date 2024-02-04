'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { useCurrentTime } from '../lib/current-time';
import { convertToSeconds, secondsToHm, secondsToHms } from '../utils';
import type { PrayerViewProps } from '../lib/type';

export default function PrayerView({ prayers, geolocation, dict, locale }: PrayerViewProps) {
  let firstUpcomingPrayer: number = 0;
  const currentTime = useCurrentTime();
  const arrayOfUpcomingPrayers: boolean[] = [];
  const arrayOfRemainingTimeForUpcomingPrayer: number[] = [];

  return (
    <div className="grid lg:grid-cols-2 gap-20 items-center lg:gap-40 space-y-4 font-medium w-full">
      <ol role="list" className="space-y-2 order-1 lg:-order-1">
        {prayers &&
          prayers.map(({ name, style, icon, prayerHour }, i: number) => {
            const secondsOfTheDay = convertToSeconds('24:00:00');
            const secondsOfTheUpcomingPrayer = convertToSeconds(prayerHour);
            const secondsFromTheBeginningOfTheDayToTheCurrentMoment = convertToSeconds(
              currentTime.toLocaleTimeString('en', {
                hour12: false,
                timeZone: geolocation.timezone
              })
            );

            const theUpcomingPrayerOfFajrPrayer =
              secondsOfTheDay - secondsFromTheBeginningOfTheDayToTheCurrentMoment + convertToSeconds(prayers[0].prayerHour);
            const secondsOfTheLastPrayer = convertToSeconds(prayers[prayers.length - 1].prayerHour);

            const fajrPrayerTheNextDay = secondsOfTheLastPrayer < secondsFromTheBeginningOfTheDayToTheCurrentMoment;
            const upcomingPrayers = secondsOfTheUpcomingPrayer > secondsFromTheBeginningOfTheDayToTheCurrentMoment;
            const remainingTimeForUpcomingPrayer = secondsOfTheUpcomingPrayer - secondsFromTheBeginningOfTheDayToTheCurrentMoment;

            arrayOfRemainingTimeForUpcomingPrayer.push(remainingTimeForUpcomingPrayer);
            arrayOfUpcomingPrayers.push(upcomingPrayers);

            firstUpcomingPrayer = arrayOfUpcomingPrayers.findIndex((x) => x === true);

            const styleOfUpcomingPrayer = `absolute top-2/4 hidden lg:block ${
              locale === 'en' ? 'left-[calc(100%+4rem)]' : 'right-[calc(100%-1rem)]'
            } rounded-md px-3 py-6 ${style} -translate-x-1/2 -translate-y-1/2`;

            return (
              <li key={name} className={`p-4 rounded-[10px] relative ${style}`}>
                <div className="flex items-center justify-between" dir="ltr">
                  <div className="flex items-center justify-center space-x-5">
                    {icon}
                    <div className="px-4">{name}</div>
                  </div>
                  <time dateTime={prayerHour}>{secondsToHm(secondsOfTheUpcomingPrayer)}</time>
                </div>
                {arrayOfUpcomingPrayers[arrayOfUpcomingPrayers.indexOf(true) === i ? firstUpcomingPrayer : undefined!] ? (
                  <div className={styleOfUpcomingPrayer}>
                    <Suspense fallback={null}>
                      {secondsToHms(arrayOfRemainingTimeForUpcomingPrayer[firstUpcomingPrayer])}
                    </Suspense>
                    <div></div>
                  </div>
                ) : i === 0 && fajrPrayerTheNextDay ? (
                  <div className={styleOfUpcomingPrayer}>
                    <Suspense fallback={null}>{secondsToHms(theUpcomingPrayerOfFajrPrayer)}</Suspense>
                  </div>
                ) : null}
              </li>
            );
          })}
      </ol>
      <div>
        <Image
          src={`https://static.abstractapi.com/country-flags/${geolocation.country}_flag.svg`}
          width={100}
          height={100}
          alt={`${geolocation.country_name} Flag`}
          title={`${geolocation.country_name} Flag`}
          className="rounded"
        />
        <div className="flex justify-between items-start w-full">
          <table className="text-md md:text-xl w-full">
            <tbody className="table-cell">
              <tr>
                <td className="after:content-[':'] after:mx-1 capitalize">{dict.praying?.location}</td>
                <td>{geolocation.city}</td>
              </tr>
              <tr>
                <td className="after:content-[':'] after:mx-1 capitalize">{dict.praying?.time}</td>
                <td>
                  <time
                    dateTime={currentTime.toLocaleTimeString('en', {
                      hour12: false,
                      timeZone: geolocation.timezone
                    })}
                    dir="ltr"
                  >
                    <Suspense fallback={null}>
                      {currentTime.toLocaleTimeString('en', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: geolocation.timezone
                      })}
                    </Suspense>
                  </time>
                </td>
              </tr>
              <tr>
                <td className="after:content-[':'] after:mx-1 capitalize">{dict.praying?.date}</td>
                <td>
                  <Suspense fallback={null}>
                    {new Intl.DateTimeFormat(locale, {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      timeZone: geolocation.timezone
                    }).format(currentTime)}
                  </Suspense>
                </td>
              </tr>
              <tr>
                <td className="after:content-[':'] after:mx-1 capitalize">{dict.praying?.hijri}</td>
                <td>
                  {new Intl.DateTimeFormat(`${locale}-TN-u-ca-islamic-umalqura`, {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    timeZone: geolocation.timezone
                  }).format(currentTime)}
                </td>
              </tr>
              <tr>
                <td className="after:content-[':'] after:mx-1 capitalize">{dict.praying?.upcomingPrayer}</td>
                <td>
                  {firstUpcomingPrayer !== undefined && firstUpcomingPrayer > 0
                    ? prayers[firstUpcomingPrayer].name
                    : dict.prayers?.fajr}
                </td>
              </tr>
              <tr>
                <td className="after:content-[':'] after:mx-1 capitalize">{dict.praying?.line}</td>
                <td>
                  {geolocation.latitude.toFixed(4)}
                  {', '}
                  {geolocation.longitude.toFixed(4)}
                </td>
              </tr>
              <tr>
                <td className="after:content-[':'] after:mx-1 capitalize">{dict.praying?.timezone}</td>
                <td>{geolocation.timezone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
