import React from 'react'
import styled from 'styled-components'
import { arrays_equal } from '../App'

const RestaurantStyled = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 150px;
  border: none;
  cursor: pointer;
  will-change: background-color;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #E2E2E2;
  }
`
export default function Restaurant({restaurant, setUserPoint, userPoint, setUsers, userName, users}) {
  const restaurantPoint = [restaurant.lat, restaurant.lon]
  console.log(users)
  const handleSetPoint = () => {
    setUserPoint([restaurant.lat, restaurant.lon])

    setUsers(prevState => {
      const newState = prevState.map(user => {
        console.log(user, userName)
        if(users.name === userName) {
          return {...user, point: userPoint}
        }
        return user
      })
      return newState
    })
    
    
  }

  return (
    <RestaurantStyled type="button" style={{ backgroundColor: arrays_equal(userPoint, restaurantPoint) ? "black" : "#F1F1F1", color: arrays_equal(userPoint, restaurantPoint) ? "white" : "black"}} onClick={handleSetPoint}>{restaurant.name}</RestaurantStyled>
  )
}
