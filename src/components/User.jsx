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
    background-color: #E2E2E2;
  }
`
export default function User({name}) {
  return (
    <UserStyled type='button'>{name}</UserStyled>
  )
}
