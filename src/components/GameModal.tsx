import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import {useLogConversion, ConversionType} from '../lib/tracking'
import {Game} from '../types'
import YoutubeWidget from './YoutubeWidget'

type GameModalProps = {
  game: Game
  onClose: () => void
}

export default function GameModal({game, onClose}: GameModalProps) {
  useLogConversion(ConversionType.ModalOpen)

  return (
    <Modal onRequestClose={onClose}>
      {game.video && <YoutubeWidget videoId={game.video} />}
      <SteamWidget appId={game.appId} />
    </Modal>
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
