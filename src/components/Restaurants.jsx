import React from 'react'
import Restaurant from './Restaurant';
import styled from 'styled-components'

const RestaurantsStyled = styled.section`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem; 
  z-index: 1;
  padding: 1rem;
  background-color: lightgray;
`

export default function Restaurants({restaurants}) {
  return (
    <RestaurantsStyled>
      <h2>Restaurant</h2>
      <div>
        {restaurants.map((restaurant, index) => (
          <Restaurant key={index} name={restaurant.name}/>
        ))}
      </div>
    </RestaurantsStyled>
  )
}
