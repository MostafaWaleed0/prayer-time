export type PrayerInfo = {
  prayerHour: string;
  style: string;
  icon: JSX.Element;
  name?: string;
};

export type TimezoneProps = {
  date: {
    gregorian: {
      date: string;
      day: string;
      format: string;
      weekday: {
        en: string;
        number: number;
      };
      month: { number: number; en: string };
      year: string;
    };
    hijri: {
      date: string;
      format: string;
      day: string;
      month: {
        ar: string;
        en: string;
        number: number;
      };
      weekday: { ar: string; en: string };
      year: string;
    };
    readable: string;
    timestamp: string;
  };
  meta: {
    latitude: number;
    longitude: number;
    method: {
      id: number;
      location: {
        latitude: number;
        longitude: number;
      };
      name: string;
    };
    timezone: string;
  };
  timings: { [key: string]: string };
};

export type GeolocationProps = {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: false;
  postal: null;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
};

export type PrayerViewProps = {
  prayers: Array<PrayerInfo>;
  locale: string;
  geolocation: GeolocationProps;
  dict: any;
};

export type PrayerCalendarProps = {
  prayersNames: any;
  locale: string;
  calendar: { data: Array<TimezoneProps> };
};
