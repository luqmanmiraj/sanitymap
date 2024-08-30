import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}