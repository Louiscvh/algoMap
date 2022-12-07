import React from 'react'
import Restaurant from './Restaurant';
import styled from 'styled-components'

const RestaurantsStyled = styled.section`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem; 
  z-index: 1;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  display: flex;
  gap: 1rem;
  & > div {
    display: flex;
    gap: 0.5rem;
  }
`

export default function Restaurants({restaurants, setUserPoint, userPoint, setUsers, userName, users}) {
  return (
    <RestaurantsStyled>
      <h2>Restaurants</h2>
      <div>
        {restaurants.map((restaurant, index) => (
          <Restaurant 
            key={index} 
            restaurant={restaurant} 
            userPoint={userPoint} 
            setUserPoint={setUserPoint} 
            setUsers={setUsers} 
            users={users}
            userName={userName}/>
        ))}
      </div>
    </RestaurantsStyled>
  )
}
