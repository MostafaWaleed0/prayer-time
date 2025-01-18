'use server';

import { headers } from 'next/headers';
import { GeolocationProps } from './type';

export async function loadGeolocation() {
  let forwardedFor = headers().get('x-forwarded-for');
  let ip = typeof forwardedFor === 'string' ? forwardedFor.split(/, /)[0] : headers().get('x-real-ip');

  try {
    // IMPORTANT: When using this code locally, ensure to replace the IP address in the API URL from
    // https://ipapi.co/${ip}/json to https://ipapi.co/json. Failure to do so will result in errors.
    let res = await fetch(`https://ipapi.co/${ip}/json`);
    return res.json();
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    throw new Error('Error fetching geolocation');
  }
}

export const getTimingsByCity = async (geolocation: GeolocationProps) => {
  try {
    let res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(geolocation.city)}&country=${encodeURIComponent(
        geolocation.country_name
      )}`
    );

    return res.json();
  } catch {
    throw new Error('Error fetching timings');
  }
};

export const getCalendarByCity = async (geolocation: GeolocationProps) => {
  try {
    let res = await fetch(
      `http://api.aladhan.com/v1/calendarByCity?city=${encodeURIComponent(geolocation.city)}&country=${encodeURIComponent(
        geolocation.country_name
      )}`
    );

    return res.json();
  } catch {
    throw new Error('Error fetching calendar');
  }
};
