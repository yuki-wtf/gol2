import styled from '@emotion/styled'
import Body from '../GolGrid/Body/Body'
import Footer from '../GolGrid/Footer/Footer'
import Header from '../GolGrid/Header/Header'
import UserCreatedGrid from './UserCreatedGrid'

const StyledGridContainer = styled.div`
  background-color: #000000;
  overflow: hidden;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
  margin-top: 32px;
`

const CreateGolGrid = () => {
  return (
    <StyledGridContainer>
      <Header empty />
      <Body>
        <UserCreatedGrid />
      </Body>
      <Footer empty />
    </StyledGridContainer>
  )
}

export default CreateGolGrid
