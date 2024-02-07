'use server';

import { unstable_cache as cache } from 'next/cache';
import { headers } from 'next/headers';
import { GeolocationProps } from './lib/type';
import { getRandom } from './utils';
import { convertToLink } from './utils/convert-to-link';

export async function loadGeolocation() {
  let forwardedFor = headers().get('x-forwarded-for');
  let ip = typeof forwardedFor === 'string' ? forwardedFor.split(/, /)[0] : headers().get('x-real-ip');

  try {
    let res = await fetch(`https://ipapi.co/${ip}/json`, { next: { revalidate: 3600 } });
    return res.json();
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    throw new Error('Error fetching geolocation');
  }
}

export const getTimingsByCity = cache(
  async (geolocation: GeolocationProps) => {
    try {
      let res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
      );

      return res.json();
    } catch {
      throw new Error('Error fetching timings');
    }
  },
  ['timings-by-city'],
  {
    revalidate: 1800
  }
);

export const getCalendarByCity = cache(
  async (geolocation: GeolocationProps) => {
    try {
      let res = await fetch(
        `http://api.aladhan.com/v1/calendarByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
      );

      return res.json();
    } catch {
      throw new Error('Error fetching calendar');
    }
  },
  ['calendar'],
  {
    revalidate: 3600
  }
);

export async function getHadiths() {
  try {
    let res = await fetch(
      `https://hadithapi.com/api/hadiths/?apiKey=$2y$10$${process.env.IP_HADITHS}&paginate=50&chapter=${getRandom(1, 15)}`
    );

    return res.json();
  } catch {
    throw new Error('Error fetching hadiths');
  }
}
