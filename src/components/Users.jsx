import React from 'react'
import User from './User'
import styled from 'styled-components'

const UsersStyled = styled.section`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background-color: lightgray;
  padding: 1rem;
`
export default function Users() {
  return (
    <UsersStyled>
      <h2>Users</h2>
      <div>
        <User name="Username"/>
        <User name="Username"/>
        <User name="Username"/>
      </div>
    </UsersStyled>
  )
}
