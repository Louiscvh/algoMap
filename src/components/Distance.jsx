import React from 'react'
import styled from "styled-components"

const DistanceStyle = styled.div`
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 1;
    background-color: lightgray;
    padding: 1rem;
`
export default function Distance({distance}) {
  return (
    <DistanceStyle>
        <h2>Distance</h2>
        <p>{Math.round(distance)} mètres</p>
    </DistanceStyle>
  )
}
