import React from 'react'
import styled from 'styled-components'

const StatsCardStyle = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`
export default function StatsCard({title, content, image}) {
  return (
    <StatsCardStyle>
        <h2>{title}</h2>
        <p>{content}</p>
    </StatsCardStyle>
  )
}
