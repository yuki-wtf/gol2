import styled from 'styled-components'
import IHeader from './IHeader'
import { useSelector } from 'react-redux'
import DialogGiveLife from '../../GolGrid/DialogGiveLife/DialogGiveLife'
import IFooter from './IFooter'
import GridWrapper from './GridWrapper'
import { useInfiniteGamePlayback } from '~/hooks/useInfiniteGamePlayback'

const StyledGridContainer = styled.div`
  background-color: #000000;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`

export default function GameContainer() {
  const { latest_generation } = useSelector((state) => state.generations)
  const [state, actions] = useInfiniteGamePlayback({
    maxFrame: latest_generation ?? null,
    currentFrame: latest_generation ?? null,
  })

  return (
    <StyledGridContainer>
      <IHeader />
      <DialogGiveLife />
      <GridWrapper grid={state.frames[state.currentFrame]?.grid ?? null} />
      <IFooter actions={actions} state={state} />
    </StyledGridContainer>
  )
}
