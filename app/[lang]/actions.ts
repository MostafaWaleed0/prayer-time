'use server';

import { headers } from 'next/headers';
import { GeolocationProps } from './lib/type';
import { getRandom } from './utils';
import { convertToLink } from './utils/convert-to-link';

export async function loadGeolocation() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0';
  const forwardedFor = headers().get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS : headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json`, { cache: 'no-store' });
    return res.json();
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    throw new Error('Error fetching geolocation');
  }
}

export async function getTimingsByCity(geolocation: GeolocationProps) {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
    );

    return res.json();
  } catch {
    throw new Error('Error fetching timings');
  }
}

export async function getCalendarByCity(geolocation: GeolocationProps) {
  try {
    const res = await fetch(
      `http://api.aladhan.com/v1/calendarByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
    );

    return res.json();
  } catch {
    throw new Error('Error fetching calendar');
  }
}

export async function getHadiths() {
  try {
    const res = await fetch(
      `https://hadithapi.com/api/hadiths/?apiKey=$2y$10$${process.env.IP_HADITHS}&paginate=50&chapter=${getRandom(1, 15)}`
    );

    return res.json();
  } catch {
    throw new Error('Error fetching hadiths');
  }
}
