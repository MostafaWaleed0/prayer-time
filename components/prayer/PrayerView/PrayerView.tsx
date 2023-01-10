import { Suspense } from 'react';
import { lang } from 'lib';
import type { PrayerItemsProps } from 'lib/type';
import { convertToSeconds, secondsToHms, secondsToHm } from 'utils';
import { PrayersInfo } from 'components/prayer';

export default function PrayerItem({ prayers, geolocation, date, currentTime, locale }: PrayerItemsProps) {
  const language = lang();
  let firstUpcomingPrayer: number;
  const arrayOfRemainingTimeForUpcomingPrayer: number[] = [];
  const arrayOfUpcomingPrayers: boolean[] = [];

  return (
    <div className="grid lg:grid-cols-2 gap-20 items-center lg:gap-40 space-y-4 font-medium w-full">
      <ol role="list" className="space-y-2 order-1 lg:-order-1">
        {prayers &&
          prayers.map(({ name, style, icon, prayerHour }, i: number) => {
            const secondsOfTheDay = convertToSeconds('24:00:00');
            const secondsOfTheUpcomingPrayer = convertToSeconds(prayerHour);
            const secondsFromTheBeginningOfTheDayToTheCurrentMoment = convertToSeconds(currentTime);

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
      <PrayersInfo
        prayers={prayers}
        currentTime={currentTime}
        geolocation={geolocation}
        data={language}
        date={date}
        locale={locale}
        firstUpcomingPrayer={firstUpcomingPrayer}
      />
    </div>
  );
}
