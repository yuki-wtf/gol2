import styled from '@emotion/styled'
import GridWrapper from './GridWrapper'
import CHeader from './CHeader'
import CFooter from './CFooter'
import { useFetchCreatorFrames, useGamePlayback } from '~/hooks/useGamePlayback'
import type { CreatorGame } from '~/db.server'
import type { SerializeFrom } from '@remix-run/node'

const StyledGridContainer = styled.div`
  background-color: #000000;
  border-radius: 10px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
`
interface Props {
  readonly game: SerializeFrom<CreatorGame>
  readonly maxFrame: number
  readonly currentFrame: number
}

export default function GameContainer({ currentFrame, maxFrame, game }: Props) {
  const fetchFrames = useFetchCreatorFrames(game.gameId)
  const [state, actions] = useGamePlayback({
    maxFrame,
    currentFrame,
    fetchFrames,
    lastFrameRefreshInterval: 5000,
  })

  return (
    <StyledGridContainer>
      <CHeader
        gameId={game.gameId}
        isGameOver={
          game.gameState != null &&
          BigInt(game.gameState) === BigInt(0)
        }
      />
      <GridWrapper
        gameState={state.frames[state.currentFrame]?.state ?? null}
        isGameOver={
          state.frames[state.currentFrame]?.state != null &&
          BigInt(state.frames[state.currentFrame]?.state) === BigInt(0)
        }
      />
      <CFooter actions={actions} state={state} />
    </StyledGridContainer>
  )
}
