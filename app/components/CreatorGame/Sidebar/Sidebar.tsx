import Statistics from './Statistics'
import styled from 'styled-components'
import Gameplay from './Gameplay'

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  min-width: 274px;
  gap: 24px;
  position: relative;
  padding-top: 60px;
`

const Sidebar = ({ currentGen }) => {
  return (
    <StyledSidebar>
      <Statistics title="Statistics" currentGen={currentGen} />
      <Gameplay type="gameplay" title="On-chain Play" />
    </StyledSidebar>
  )
}

export default Sidebar
