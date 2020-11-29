import React from 'react'
import styled from 'styled-components'

export default function About() {
  return <AboutLink href="http://karugamo.agency/">🦆</AboutLink>
}

const AboutLink = styled.a`
  font-size: 50px;
  text-decoration: none;
  margin: 50px;
  color: transparent;
  text-shadow: 0 0 0 #a0d6f6;
`
