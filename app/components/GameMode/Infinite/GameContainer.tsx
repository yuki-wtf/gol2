import styled from '@emotion/styled'
import GameHeader from './GameHeader'
import { useFetchInfiniteFrames, useGamePlayback } from '~/hooks/useGamePlayback'
import type { ReceivedCell } from '~/db.server'
import type { SerializeFrom } from '@remix-run/node'
import { useSelectedCell } from '~/hooks/SelectedCell'
import DialogGiveLife from '../Shared/Game/DialogGiveLife'
import Footer from '../Shared/Game/Footer'
import TempOverlay from '~/components/TempOverlay'
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
  readonly maxFrame: number
  readonly currentFrame: number
  readonly receivedCells: SerializeFrom<readonly ReceivedCell[]>
}

export default function GameContainer({ currentFrame, maxFrame, receivedCells }: Props) {
  const fetchFrames = useFetchInfiniteFrames()
  const [state, actions] = useGamePlayback({
    maxFrame,
    currentFrame,
    fetchFrames,
    lastFrameRefreshInterval: 5000,
  })
  const [selectedCell] = useSelectedCell()
  const gameState = state.frames[state.currentFrame]?.state ?? null

  return (
    <StyledGridContainer>
      <GameHeader />
      <DialogGiveLife />

      <GridWrapper>
        {gameState != null ? (
          <GameGrid
            isPlaying={state.currentFrame !== state.maxFrame}
            receivedCells={state.currentFrame === state.maxFrame ? receivedCells : []}
            data={gameStateToGrid(gameState)}
          />
        ) : null}
      </GridWrapper>

      <Footer>
        {selectedCell != null && <TempOverlay />}
        <ControlBar actions={actions} state={state} />
      </Footer>
    </StyledGridContainer>
  )
}
