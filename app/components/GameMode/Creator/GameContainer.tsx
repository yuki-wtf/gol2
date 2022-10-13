import styled from '@emotion/styled'
import GameHeader from './GameHeader'
import { useFetchCreatorFrames, useGamePlayback } from '~/hooks/useGamePlayback'
import type { CreatorGame } from '~/db.server'
import type { SerializeFrom } from '@remix-run/node'
import Footer from '../Shared/Game/Footer'
import ControlBar from '../Shared/Game/ControlBar/ControlBar'
import GridWrapper from '../Shared/Game/GridWrapper'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import GameGrid from './GameGrid'

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
  const gameState = state.frames[state.currentFrame]?.state ?? null
  return (
    <StyledGridContainer>
      <GameHeader gameId={game.gameId} isGameOver={game.gameState != null && BigInt(game.gameState) === BigInt(0)} />

      <GridWrapper
        isGameOver={
          state.frames[state.currentFrame]?.state != null &&
          BigInt(state.frames[state.currentFrame]?.state) === BigInt(0)
        }
      >
        {gameState != null ? <GameGrid data={gameStateToGrid(gameState)} /> : null}
      </GridWrapper>
      <Footer>
        <ControlBar actions={actions} state={state} />
      </Footer>
    </StyledGridContainer>
  )
}
