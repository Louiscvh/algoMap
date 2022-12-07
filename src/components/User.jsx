import React from 'react'
import styled from 'styled-components'

const UserStyled = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 150px;
  border: none;
  cursor: pointer;
  will-change: background-color;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #E3E3E3;
  }
`

export default function User({name, userName}) {

  return (
    <UserStyled type='button' style={{backgroundColor: userName === name ? "black" : "#F1F1F1", color: userName === name ? "white" : "black"}}>{name}</UserStyled>
  )
}
