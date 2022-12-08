import React, { useEffect } from 'react'
import styled from 'styled-components'

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
export default function Restaurant({restaurant, setUserPoint, setUsers, userName, users, setCurrentRestaurant, currentRestaurant}) {
  const handleUpdateRestaurant = () => {
    setUserPoint([restaurant.lat, restaurant.lon])
    setCurrentRestaurant(restaurant)
    const newUsers = users.map((user) => {
      if (user.name === userName) {
        return {...user, point: [restaurant.lat, restaurant.lon]};
      }
      return user;
    });

    setUsers(newUsers);
  }
  
  return (
    <RestaurantStyled type="button" style={{ backgroundColor: currentRestaurant.id === restaurant.id ? "black" : "#F1F1F1", color: currentRestaurant.id === restaurant.id ? "white" : "black"}} onClick={handleUpdateRestaurant}>{restaurant.name}</RestaurantStyled>
  )
}
