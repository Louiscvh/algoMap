import React from 'react'
import styled from "styled-components"

const DistanceStyle = styled.div`
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 1;
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
`
export default function Distance({distance}) {
  return (
    <DistanceStyle>
        <h2>Votre distance</h2>
        <p>{distance < 1000 ? `${Math.round(distance)} mètres` : `${(distance /1000).toFixed(2)} km` }</p>
    </DistanceStyle>
  )
}
