import { Suspense } from 'react';
import type { PrayersInfoProps } from 'lib/type';
import Image from 'next/image';

export default function PrayersInfo({ prayers, firstUpcomingPrayer, geolocation, data, date, locale }: PrayersInfoProps) {
  return (
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
              <td className="after:content-[':'] after:mx-1 capitalize">{data.praying?.location}</td>
              <td>{geolocation.city}</td>
            </tr>
            <tr>
              <td className="after:content-[':'] after:mx-1 capitalize">{data.praying?.time}</td>
              <td>
                <time
                  dateTime={date.toLocaleTimeString('en', {
                    hour12: false,
                    timeZone: geolocation.timezone
                  })}
                  dir="ltr"
                >
                  <Suspense fallback={null}>
                    {date.toLocaleTimeString('en', {
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
              <td className="after:content-[':'] after:mx-1 capitalize">{data.praying?.date}</td>
              <td>
                <Suspense fallback={null}>
                  {new Intl.DateTimeFormat(locale, {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    timeZone: geolocation.timezone
                  }).format(date)}
                </Suspense>
              </td>
            </tr>
            <tr>
              <td className="after:content-[':'] after:mx-1 capitalize">{data.praying?.hijri}</td>
              <td>
                {new Intl.DateTimeFormat(`${locale}-TN-u-ca-islamic-umalqura`, {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  timeZone: geolocation.timezone
                }).format(date)}
              </td>
            </tr>
            <tr>
              <td className="after:content-[':'] after:mx-1 capitalize">{data.praying?.upcomingPrayer}</td>
              <td>{firstUpcomingPrayer > 0 ? prayers[firstUpcomingPrayer].name : data.prayers?.fajr}</td>
            </tr>
            <tr>
              <td className="after:content-[':'] after:mx-1 capitalize">{data.praying?.line}</td>
              <td>
                {geolocation.latitude.toFixed(4)}
                {', '}
                {geolocation.longitude.toFixed(4)}
              </td>
            </tr>
            <tr>
              <td className="after:content-[':'] after:mx-1 capitalize">{data.praying?.timezone}</td>
              <td>{geolocation.timezone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
