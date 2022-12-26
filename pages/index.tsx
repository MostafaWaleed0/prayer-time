import Image from 'next/image';
import { lang } from 'lib';
import { useRouter } from 'next/router';
import { Container } from 'components/common';
import { CurrentTime } from 'lib/current-time';
import { Suspense, useEffect, useState } from 'react';
import { getRandom, convertToLink } from 'utils';
import { loadGeolocation } from 'lib/load-geolocation';
import type { InferGetServerSidePropsType } from 'next';
import { PrayerView, PrayerCalender } from 'components/prayer';
import { Sunrise, Dhuhr, Maghrib, Fajr, Isha, Asr } from 'components/icons';

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
  const [randomNumber, setRandomNumber] = useState<number>(6);

  useEffect(() => {
    if (
      bukhariData.hadiths.data[randomNumber].hadithArabic.length &&
      bukhariData.hadiths.data[randomNumber].hadithEnglish.length > 600
    ) {
      return setRandomNumber(randomNumber + 1);
    }
    setInterval(() => {
      setRandomNumber(getRandom(0, 200));
    }, 1000 * 60 * 60 * 24);
  }, [bukhariData.hadiths.data, randomNumber]);

  const hadiths = bukhariData.hadiths.data[randomNumber];

  const prayers = [
    {
      prayerHour: timezone.timings['Fajr'],
      style: 'bg-[#2e689f] text-white',
      icon: <Fajr />,
      ar: 'الفجر',
      en: 'Fajr'
    },
    {
      prayerHour: timezone.timings['Sunrise'],
      style: 'bg-[#fedfb1] text-black',
      icon: <Sunrise />,
      ar: 'الشروق',
      en: 'Sunrise'
    },
    {
      prayerHour: timezone.timings['Dhuhr'],
      style: 'bg-[#FFCC33] text-black',
      icon: <Dhuhr />,
      ar: 'الظهر',
      en: 'Dhuhr'
    },
    {
      prayerHour: timezone.timings['Asr'],
      style: 'bg-[#f5ad43] text-black',
      icon: <Asr />,
      ar: 'العصر',
      en: 'Asr'
    },
    {
      prayerHour: timezone.timings['Maghrib'],
      style: 'bg-[#fad6a5] text-black',
      icon: <Maghrib />,
      ar: 'المغرب',
      en: 'Maghrib'
    },
    {
      prayerHour: timezone.timings['Isha'],
      style: 'bg-[#16165F] text-white',
      icon: <Isha />,
      ar: 'العشاء',
      en: 'Isha'
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
            <PrayerCalender calender={calendar} prayers={prayers} locale={locale} date={date} />
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

export async function getServerSideProps({ req }) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  const geolocation = await loadGeolocation(ip);

  const timezone = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
  );

  const calendarByCity = await fetch(
    `http://api.aladhan.com/v1/calendarByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
  );

  const bukhari = await fetch(`https://hadithapi.com/api/hadiths/?apiKey=$2y$10$${process.env.IP_HADITHS}`);

  const bukhariData = await bukhari.json();
  const timezoneData = await timezone.json();
  const calendarByCityData = await calendarByCity.json();

  return {
    props: {
      timezoneData,
      geolocation,
      bukhariData,
      calendar: calendarByCityData
    }
  };
}
