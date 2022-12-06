import React from 'react'
import Restaurant from './Restaurant';
import styled from 'styled-components'

const RestaurantsStyled = styled.section`
    background-color: lightgray;
`

export default function Restaurants() {
  return (
    <RestaurantsStyled>
      <h2>Restaurant</h2>
      <div>
        <Restaurant name="Restaurant 1 (Sorbone)"/>
        <Restaurant name="Restaurant 2 (Hotel de ville)"/>
        <Restaurant name="Restaurant 3 (Pont)"/>
      </div>
    </RestaurantsStyled>
  )
}
