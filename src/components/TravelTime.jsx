import React from 'react'
import styled from "styled-components"

const TravelStyle = styled.div`
    position: absolute;
    bottom: 9.5rem;
    left: 0.5rem;
    z-index: 1;
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
`
export default function TravelTime({distance, rdvHours}) {
    const time = distance / 83.3 // 83.3m/min = 5km/h
    const hour = rdvHours * 60
  return (
    <TravelStyle>
		<h2>Miam à {rdvHours}h</h2>
        <h2>Partez à</h2>
        <p>{Math.round((hour - time) / 60)}h</p>
    </TravelStyle>
  )
}
