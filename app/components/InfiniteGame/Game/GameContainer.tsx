import styled from '@emotion/styled'
import IHeader from './IHeader'
import DialogGiveLife from '../../GolGrid/DialogGiveLife/DialogGiveLife'
import IFooter from './IFooter'
import GridWrapper from './GridWrapper'
import { useFetchInfiniteFrames, useGamePlayback } from '~/hooks/useGamePlayback'

const StyledGridContainer = styled.div`
  background-color: #000000;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`

interface Props {
  readonly maxFrame: number
  readonly currentFrame: number
}

export default function GameContainer({ currentFrame, maxFrame }: Props) {
  const fetchFrames = useFetchInfiniteFrames()
  const [state, actions] = useGamePlayback({ maxFrame, currentFrame, fetchFrames })

  return (
    <StyledGridContainer>
      <IHeader />
      <DialogGiveLife />
      <GridWrapper gameState={state.frames[state.currentFrame]?.state ?? null} />
      <IFooter actions={actions} state={state} />
    </StyledGridContainer>
  )
}
