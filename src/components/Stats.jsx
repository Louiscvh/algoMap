import React from 'react'
import StatsCard from './StatsCard'

import styled from 'styled-components'

const StatsStyle = styled.div`
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 1;
    display: flex;
    gap: 0.8rem;
`

export default function Stats({distance, rdvHours}) {
    const kmh = distance / 83.3
    const time = `${Math.round(kmh)} ${kmh > 1 ? "mins" : "min"}`
    const distanceMeter = distance < 1000 ? `${Math.round(distance)} mètres` : `${(distance /1000).toFixed(2)} km` 
	// const travel = `${Math.round(time)} ${time > 1 ? "mins" : "min"}`
    const rdv = `À ${rdvHours}h`
    const hour = rdvHours * 60
    const hourDisplay = `À ${Math.round((hour - kmh) / 60)}h`
    console.log(time)	
  return (
    <StatsStyle>
        <StatsCard title="Distance" content={distanceMeter}/>
        <StatsCard title="Temps" content={time}/>
        <StatsCard title="Partir" content={hourDisplay}/>
        <StatsCard title="Rdv" content={rdv} />
    </StatsStyle>
  )
}
