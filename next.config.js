/** @type {import('next').NextConfig} */
const nextConfig = {
  unstable_runtimeJS: false,
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["static.abstractapi.com"],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "ar"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ar",
    localeDetection: false,
  },
};

module.exports = nextConfig;
