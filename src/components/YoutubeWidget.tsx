import React from 'react'
import styled from 'styled-components'

export default function YoutubeWidget({videoId}) {
  return (
    <StyledYoutubeWidget
      src={`https://www.youtube.com/embed/${videoId}?start=120&autoplay=1&mute=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></StyledYoutubeWidget>
  )
}

const StyledYoutubeWidget = styled.iframe`
  width: 920px;
  height: 518px;
  border: 0;

  @media (max-width: 920px) {
    width: 100%;
    height: 56.25%;
  }
`
