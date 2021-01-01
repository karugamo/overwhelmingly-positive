import React from 'react'
import styled from 'styled-components'

export default function Amazon() {
  return (
    <Container>
      <Ad id="amzn-assoc-ad-685271c8-8839-4b09-8db4-0528bfa8ec69" />
    </Container>
  )
}

const Container = styled.div`
  height: 215px;
  width: 460px;
  background-color: white;
  overflow: hidden;

  @media (max-width: 460px) {
    display: none;
  }
`

const Ad = styled.div`
  height: 100%;
  transform: scale(0.9) translateY(-40px);
`
