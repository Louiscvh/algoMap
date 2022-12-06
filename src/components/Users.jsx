import React from 'react'
import User from './User'
import styled from 'styled-components'

const UsersStyled = styled.section`
    background-color: lightgray;
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
