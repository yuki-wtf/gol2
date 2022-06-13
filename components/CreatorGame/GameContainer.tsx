import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import GridWrapper from './GridWrapper'
import CHeader from './CHeader'
import CFooter from './CFooter'
const StyledGridContainer = styled.div`
  background-color: #000000;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`

const GameContainer = ({ address, currentGen, gameId }) => {
  console.log(address, currentGen, gameId)
  return (
    <StyledGridContainer>
      <CHeader gameId={gameId} />
      <GridWrapper gameId={gameId} address={address} currentGen={currentGen} />
      <CFooter gameId={gameId} />
    </StyledGridContainer>
  )
}

export default GameContainer
