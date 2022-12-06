import React from 'react'
import styled from 'styled-components'

const UserStyled = styled.button`
    
`
export default function User({name}) {
  return (
    <UserStyled type='button'>{name}</UserStyled>
  )
}
