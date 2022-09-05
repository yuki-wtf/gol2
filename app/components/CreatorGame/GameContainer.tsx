import styled from '@emotion/styled'
import GridWrapper from './GridWrapper'
import CHeader from './CHeader'
import CFooter from './CFooter'
import { useFetchCreatorFrames, useGamePlayback } from '~/hooks/useGamePlayback'

const StyledGridContainer = styled.div`
  background-color: #000000;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`
interface Props {
  readonly gameId: string
  readonly maxFrame: number
  readonly currentFrame: number
}

export default function GameContainer({ currentFrame, maxFrame, gameId }: Props) {
  const fetchFrames = useFetchCreatorFrames(gameId)
  const [state, actions] = useGamePlayback({
    maxFrame,
    currentFrame,
    fetchFrames,
    lastFrameRefreshInterval: 5000
  })

  return (
    <StyledGridContainer>
      <CHeader gameId={gameId} />
      <GridWrapper gameState={state.frames[state.currentFrame]?.state ?? null} />
      <CFooter actions={actions} state={state} />
    </StyledGridContainer>
  )
}
