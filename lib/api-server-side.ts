import axios from 'axios';
import { IncomingMessage } from 'http';
import { convertToLink } from 'utils';
import { GeolocationProps } from './type';

export async function loadGeolocation(req: IncomingMessage) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTimingsByCity(geolocation: GeolocationProps) {
  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
  );

  return res.json();
}

export async function getCalendarByCity(geolocation: GeolocationProps) {
  const res = await fetch(
    `http://api.aladhan.com/v1/calendarByCity?city=${convertToLink(geolocation.city, geolocation.country_name)}`
  );

  return res.json();
}

export async function getHadiths() {
  const res = await fetch(`https://hadithapi.com/api/hadiths/?apiKey=$2y$10$${process.env.IP_HADITHS}`);

  return res.json();
}
