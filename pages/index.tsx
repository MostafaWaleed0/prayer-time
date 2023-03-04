import { Container } from 'components/common';
import { Asr, Dhuhr, Fajr, Isha, Maghrib, Sunrise } from 'components/icons';
import { PrayerCalendar, PrayerView } from 'components/prayer';
import { getCalendarByCity, getHadiths, getTimingsByCity, lang, loadGeolocation } from 'lib';
import { CurrentTime } from 'lib/current-time';
import { GeolocationProps } from 'lib/type';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import { getRandom } from 'utils';

export default function Home({
  timezoneData,
  geolocation,
  bukhariData,
  calendar
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const date = CurrentTime();
  const language = lang();
  const home = language.home;
  const { locale } = useRouter();
  const timezone = timezoneData.data;
  const [randomNumber, setRandomNumber] = useState<number>(3);
  const prayersNames = language.prayers;
  const hadiths = bukhariData.hadiths.data[randomNumber];

  useEffect(() => {
    const intervalId = setInterval(() => {
      let newRandomNumber = getRandom(0, 25);
      setRandomNumber(newRandomNumber);
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(intervalId);
  }, []);

  const prayers = [
    {
      prayerHour: timezone.timings['Fajr'],
      style: 'bg-[#2e689f] text-white',
      icon: <Fajr />,
      name: prayersNames?.fajr
    },
    {
      prayerHour: timezone.timings['Sunrise'],
      style: 'bg-[#fedfb1] text-black',
      icon: <Sunrise />,
      name: prayersNames?.sunrise
    },
    {
      prayerHour: timezone.timings['Dhuhr'],
      style: 'bg-[#FFCC33] text-black',
      icon: <Dhuhr />,
      name: prayersNames?.dhuhr
    },
    {
      prayerHour: timezone.timings['Asr'],
      style: 'bg-[#f5ad43] text-black',
      icon: <Asr />,
      name: prayersNames?.asr
    },
    {
      prayerHour: timezone.timings['Maghrib'],
      style: 'bg-[#fad6a5] text-black',
      icon: <Maghrib />,
      name: prayersNames?.maghrib
    },
    {
      prayerHour: timezone.timings['Isha'],
      style: 'bg-[#16165F] text-white',
      icon: <Isha />,
      name: prayersNames?.isha
    }
  ];

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Container>
        <article>
          <PrayerView
            prayers={prayers}
            locale={locale}
            geolocation={geolocation}
            data={home}
            date={date}
            currentTime={date.toLocaleTimeString('en', {
              hour12: false,
              timeZone: geolocation.timezone
            })}
          />
        </article>
        <article>
          <div className="w-full space-y-10 overflow-auto">
            <PrayerCalendar calendar={calendar} prayers={prayers} locale={locale} date={date} />
          </div>
        </article>
        <article>
          <div className="w-full space-y-10">
            <h2>{home?.hadith.heading}</h2>
            <p className="flex">
              {home?.hadith.source}
              {': '}
              {locale === 'en' ? (
                <>
                  {hadiths.chapter.chapterNumber}
                  {' - '}
                  {hadiths.chapter.chapterEnglish}
                </>
              ) : (
                <>
                  {hadiths.chapter.chapterNumber}
                  {' - '}
                  {hadiths.chapter.chapterArabic}
                </>
              )}
              {', '}
              {home?.hadith?.hadith} {hadiths.hadithNumber}
            </p>
            <blockquote>{locale === 'en' ? hadiths.hadithEnglish : hadiths.hadithArabic}</blockquote>
          </div>
          <div>
            <Image src="/static/images/Praise.png" width={300} height={300} alt={''}></Image>
          </div>
        </article>
      </Container>
    </Suspense>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const geolocation: GeolocationProps = await loadGeolocation(req);

    const [timingsByCity, calendarByCity, bukhariData] = await Promise.all([
      getTimingsByCity(geolocation),
      getCalendarByCity(geolocation),
      getHadiths()
    ]);

    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

    return {
      props: {
        timezoneData: timingsByCity,
        geolocation,
        bukhariData,
        calendar: calendarByCity
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true
    };
  }
};
