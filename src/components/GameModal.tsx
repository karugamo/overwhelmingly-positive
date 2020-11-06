import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

type GameModalProps = {
  game: any
  onClose: () => void
}

export default function GameModal({game, onClose}: GameModalProps) {
  return (
    <Modal onRequestClose={onClose}>
      <SteamWidget
        title="Steam store widget"
        src={`https://store.steampowered.com/widget/${game.appId}/`}
      ></SteamWidget>
    </Modal>
  )
}

const SteamWidget = styled.iframe`
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1001;
  }
`
