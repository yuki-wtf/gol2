import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import Body from '../GolGrid/Body/Body'
import Loader from '../Loader/Loader'
import Grid from './Grid'

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`

interface Props {
  readonly gameState: string | null
}

export default function GridWrapper({ gameState }: Props) {
  return (
    <Body>
      {gameState != null ? (
        <Grid data={gameStateToGrid(gameState)} />
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
