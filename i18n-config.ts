export const i18n = {
  defaultLocale: 'ar',
  locales: ['en', 'ar']
} as const;

export type Locale = (typeof i18n)['locales'][number];
