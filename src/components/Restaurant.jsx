import React from 'react'
import styled from 'styled-components'

const RestaurantStyled = styled.button`
    background-color: red;
`
export default function Restaurant({name}) {
  return (
    <RestaurantStyled type="button">{name}</RestaurantStyled>
  )
}
