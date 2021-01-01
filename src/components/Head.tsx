import React from 'react'
import {Helmet} from 'react-helmet'

type HeadProps = {
  title: string
}

export default function Head({title}: HeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
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
       gtag('config', 'AW-480060544');

       gtag('event', 'conversion', {
        send_to: 'AW-480060544/XsOyCMjf3egBEIDJ9OQB'
      })
  `}
      </script>
      <script type="text/javascript">
        {`var sc_project=12425663; var sc_invisible=1; var sc_security="4cf878ee";
        var sc_https=1; var sc_remove_link=1;`}
      </script>
      <script
        type="text/javascript"
        src="https://www.statcounter.com/counter/counter.js"
        async
        defer
      ></script>
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
      <script
        data-ad-client="ca-pub-3133111331732634"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
      <script
        async
        src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=685271c8-8839-4b09-8db4-0528bfa8ec69"
      ></script>
    </Helmet>
  )
}
