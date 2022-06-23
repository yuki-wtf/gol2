import React from 'react'
import styled from 'styled-components'
const StyledHeader = styled.header`
  background-color: ${(props) => (props.empty ? '#1D222D' : props.theme.colors.neutral100)};
  border: 1px solid ${(props) => props.theme.colors.neutral400};
  height: 68px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding: 14px;
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const Header = ({ children, empty }) => {
  return <StyledHeader empty={empty}>{children}</StyledHeader>
}

export default Header
