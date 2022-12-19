import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#fec200" />
        <meta name="msapplication-TileColor" content="#185d4e" />
        <meta name="theme-color" content="#185d4e" />
        <meta content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="robots" />
      </Head>
      <body className="bg-green-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
