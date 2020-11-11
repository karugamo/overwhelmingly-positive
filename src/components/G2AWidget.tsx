import React from 'react'
import styled from 'styled-components'
import {ConversionType, trackClick} from '../lib/tracking'
import {Game} from '../types'

export default function G2AWidget({game}: {game: Game}) {
  if (!game?.g2a?.slug) {
    return <></>
  }

  return (
    <G2AWidgetContainer>
      <G2AInfo>
        <img
          style={{height: '30px'}}
          src="https://www.g2a.com/en/assets/images/logo_g2a.svg"
          alt="G2A"
        />
        <G2ASeller game={game} />
      </G2AInfo>
      <G2APayment>
        <G2APrice>
          {game.g2a.price}
          <CurrencySign>€</CurrencySign>
        </G2APrice>
        <G2ALink
          onClick={() =>
            trackClick(
              `https://www.g2a.com/${game.g2a.slug}?gtag=a46977ce5c`,
              ConversionType.G2AClick
            )
          }
        >
          Buy
        </G2ALink>
      </G2APayment>
    </G2AWidgetContainer>
  )
}

function G2ASeller({game}: {game: Game}) {
  return (
    <G2ASellerContainer>
      <SellerName>Seller: {game.g2a.sellerName}</SellerName>
      <SellerInfo>
        <SellerRating>{game.g2a.sellerRating}%</SellerRating> Positive feedback
        | {game.g2a.sellerVotes} Ratings
      </SellerInfo>
    </G2ASellerContainer>
  )
}

const CurrencySign = styled.sup`
  top: -4px;
  left: 2px;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
`

const G2APrice = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.87);
`

const G2APayment = styled.div`
  display: flex;
  align-items: center;
`

const G2AInfo = styled.div`
  display: flex;
  align-items: center;
`

const SellerName = styled.div``

const SellerInfo = styled.div`
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
`

const SellerRating = styled.span`
  color: #29b474;
  font-weight: bolder;
`

const G2ASellerContainer = styled.div`
  margin-left: 15px;

  @media (max-width: 920px) {
    display: none;
  }
`

const G2ALink = styled.span`
  cursor: pointer;
  padding: 10px 20px;
  text-align: center;
  border-radius: 5px;
  color: white;
  font-family: Roboto;
  background: #0084c1;
  text-decoration: none;
`

const G2AWidgetContainer = styled.div`
  width: 900px;
  height: 80px;
  background: #fafafa;
  margin-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2px;

  @media (max-width: 920px) {
    width: 94%;
    padding-left: 3%;
    padding-right: 3%;
  }
`
