import React from 'react'
import User from './User'
import styled from 'styled-components'

const UsersStyled = styled.section`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 1rem;

  & > div {
    display: flex;
    gap: 0.5rem;
  }
`
export default function Users({users, userName}) {
  return (
    <UsersStyled>
      <h2>Users</h2>
      <div>
      {users.map((user, index) => (
        <User key={index} name={user.name} userName={userName}/>
      ))}
      </div>
    </UsersStyled>
  )
}
