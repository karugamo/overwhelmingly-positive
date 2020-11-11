import React, {useEffect} from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import {useLogConversion} from '../lib/tracking'
import {Game} from '../types'
import G2AWidget from './G2AWidget'

type GameModalProps = {
  game: Game
  onClose: () => void
}

export default function GameModal({game, onClose}: GameModalProps) {
  useLogConversion()

  return (
    <Modal onRequestClose={onClose}>
      {game.video && <YoutubeWidget videoId={game.video} />}
      <G2AWidget game={game} />
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
