import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import {Game} from '../types'

type GameModalProps = {
  game: Game
  onClose: () => void
}

export default function GameModal({game, onClose}: GameModalProps) {
  return (
    <Modal onRequestClose={onClose}>
      {game.video && <YoutubeWidget videoId={game.video} />}
      <G2AWidget name={game.name} />
      <SteamWidget appId={game.appId} />
    </Modal>
  )
}

function YoutubeWidget({videoId}) {
  return (
    <StyledYoutubeWidget
      src={`https://www.youtube.com/embed/${videoId}?start=120&autoplay=1&mute=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></StyledYoutubeWidget>
  )
}

function SteamWidget({appId}) {
  return (
    <StyledSteamWidget
      title="Steam store widget"
      src={`https://store.steampowered.com/widget/${appId}/`}
    ></StyledSteamWidget>
  )
}

function G2AWidget({name}) {
  return (
    <G2AWidgetContainer>
      <G2ALink
        href="https://www.g2a.com/?gtag=a46977ce5c"
        target="_blank"
      >{`Buy ${name} on G2A`}</G2ALink>
    </G2AWidgetContainer>
  )
}

const G2ALink = styled.a`
  padding: 10px 20px;
  text-align: center;
  border-radius: 5px;
  margin-right: 8px;
  color: white;
  font-family: Roboto;
  background: #0084c1;
  text-decoration: none;
`

const G2AWidgetContainer = styled.div`
  width: 920px;
  height: 50px;
  background: #fafafa;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 2px;

  @media (max-width: 920px) {
    width: 100%;
  }
`

const StyledSteamWidget = styled.iframe`
  width: 920px;
  height: 200px;
  border: 0;

  @media (max-width: 920px) {
    width: 100%;
  }
`

const StyledYoutubeWidget = styled.iframe`
  width: 920px;
  height: 518px;
  border: 0;

  @media (max-width: 920px) {
    width: 100%;
    height: 56.25%;
  }
`

function ReactModalWrapper({className, modalClassName, ...props}) {
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className}
      ariaHideApp={false}
      isOpen
      {...props}
    />
  )
}

const Modal = styled(ReactModalWrapper).attrs({
  overlayClassName: 'Overlay',
  modalClassName: 'Content'
})`
  .Content {
    background: rgba(0, 0, 0, 0);
    border-radius: 4px;
    outline: none;
    width: 920px;
    overflow-y: auto;

    @media (max-width: 920px) {
      width: 100%;
    }
  }

  .Overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1001;
  }
`

function removeHash() {
  history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  )
}
