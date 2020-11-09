import React from 'react'
import {Helmet} from 'react-helmet'

export default function Head() {
  return (
    <Helmet>
      <title>Overwhelmingly Positive Rated Games on Steam</title>
      <meta
        name="description"
        content="See overwhelmingly positive rated games on steam in a list"
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1R0QR3M2YR"
      ></script>
      <script>
        {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
  
       gtag('config', 'G-1R0QR3M2YR');
       gtag('config', 'UA-136930923-2');
  `}
      </script>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  )
}
