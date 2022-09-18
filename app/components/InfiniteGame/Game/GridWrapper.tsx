import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import Body from '../../GolGrid/Body/Body'
import Loader from '../../Loader/Loader'
import Grid from './Grid'
import type { SerializeFrom } from '@remix-run/node'
import type { ReceivedCell } from '~/db.server'

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`

interface Props {
  readonly gameState: string | null
  readonly isPlaying: boolean
  readonly receivedCells: SerializeFrom<readonly ReceivedCell[]>
}

export default function GridWrapper({ gameState, receivedCells, isPlaying }: Props) {
  return (
    <Body>
      {gameState != null ? (
        <Grid isPlaying={isPlaying} receivedCells={receivedCells} data={gameStateToGrid(gameState)} />
      ) : (
        <StyledLoaderContainer
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        >
          <Loader theme="dark" centered />
        </StyledLoaderContainer>
      )}
    </Body>
  )
}
