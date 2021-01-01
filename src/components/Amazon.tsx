import React from 'react'
import styled from 'styled-components'

export default function Amazon() {
  return (
    <Container>
      <AdLabel>Ads</AdLabel>
      <AmazonWidget asin="B07M6RVW79" />
      <AmazonWidget asin="B086PKMZ1Q" />
      <AmazonWidget asin="B07TD94TQF" />
      <AmazonWidget asin="B00WAA2704" />
    </Container>
  )
}

const Container = styled.div`
  height: 215px;
  width: 460px;
  overflow: hidden;
  white-space: nowrap;
  background-color: white;
  position: relative;

  @media (max-width: 460px) {
    display: none;
  }
`

const AdLabel = styled.div`
  color: grey;
  position: absolute;
  top: 0px;
  left: 5px;
  font-size: 12px;
`

function AmazonWidget({asin}: {asin: string}) {
  return (
    <WidgetContainer
      scrolling="no"
      frameBorder="0"
      src={`//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=karugamo-20&marketplace=amazon&region=US&placement=${asin}&asins=${asin}&linkId=695dfc819ab4f0f9d3324288ea4b0427&show_border=false&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff`}
    ></WidgetContainer>
  )
}

const WidgetContainer = styled.iframe`
  width: 120px;
  height: 240px;
  transform: scale(0.78) translateX(-13px) translateY(-12px);
`
