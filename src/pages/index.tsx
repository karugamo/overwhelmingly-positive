import React from 'react'
import styled from 'styled-components'
import games from '../../games.json'
import {Helmet} from 'react-helmet'
import {shuffle} from 'lodash'

import '../styles/main.css'

export default function App() {
  return (
    <Main>
      <Head />
      <Headline>overwhelmingly positive on steam</Headline>
      <Games>
        {shuffle(games).map((game) => (
          <Game key={game.appId} {...game} />
        ))}
      </Games>
      <About />
    </Main>
  )
}

function Game({appId, name}) {
  return (
    <GameContainer>
      <GameLink
        href={`https://store.steampowered.com/app/${appId}`}
        target="_blank"
      >
        <Image
          width="460"
          height="215"
          alt={name}
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`}
        />
      </GameLink>
    </GameContainer>
  )
}

function Head() {
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
`}
      </script>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/site.webmanifest" />
    </Helmet>
  )
}

function About() {
  return <AboutLink href="http://karugamo.agency/">🦆</AboutLink>
}

const Image = styled.img`
  @media (max-width: 460px) {
    display: block;
    width: 100%;
    height: auto;
  }
`

const AboutLink = styled.a`
  font-size: 50px;
  text-decoration: none;
  margin: 50px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Headline = styled.h1`
  color: #dcdcdc;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`

const GameLink = styled.a``

const GameContainer = styled.div``

const Games = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
