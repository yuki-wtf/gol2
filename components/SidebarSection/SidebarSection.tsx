import React from 'react'
import styled from 'styled-components'
import Skeleton from '../Skeleton/Skeleton'
import T from '../Typography/Typography'
const StyledSidebarSection = styled.div`
  display: flex;
  max-width: 300px;

  flex-direction: column;
  border-bottom: ${(props) => (props.type === 'statistics' ? '2px solid transparent' : '2px solid black')};
`
const StyledHeading = styled(T.H4Bold)`
  padding-bottom: 16px;
  border-bottom: ${(props) => (props.type === 'statistics' ? '2px solid transparent' : '2px solid black')};
  margin-bottom: 8px;
`

const SidebarSection = ({ children, title = 'title', type = 'statistics' }) => {
  return (
    <StyledSidebarSection type={type}>
      <StyledHeading type={type}>{title}</StyledHeading>
      {children}
    </StyledSidebarSection>
  )
}

export default SidebarSection
