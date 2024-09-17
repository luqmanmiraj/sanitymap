import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <title>Sanity Map</title>
      <link
        rel="stylesheet"
          href="/fonts/fonts.min.css"
          as="text/css"
          crossOrigin=""
        />
         <link
          rel="stylesheet"
          href="/fonts/fonts.css"
          as="text/css"
          crossOrigin=""
        />
        <meta name="description" content="Explore and discover events with Sanity Map - your interactive guide to local happenings and attractions." />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}