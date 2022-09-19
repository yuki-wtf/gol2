import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { gameStateToGrid } from '~/helpers/gameStateToGrid'
import Body from '../GolGrid/Body/Body'
import Loader from '../Loader/Loader'
import Grid from './Grid'
import { useGameOver } from '~/hooks/GameOver'
import { useEffect } from 'react'

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`

interface Props {
  readonly gameState: string | null
  readonly isGameOver: boolean
}

export default function GridWrapper({ gameState, isGameOver }: Props) {
  const [GameOverMessage, setGameOverMessage] = useGameOver()

  useEffect(() => {
    if (isGameOver) {
      setGameOverMessage(true)
      return
    }
    setGameOverMessage(false)
  }, [isGameOver, setGameOverMessage])

  return (
    <Body>
      {isGameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.3 } }}
          style={{ position: 'absolute', left: -14, right: -14, top: -16, bottom: -16, zIndex: 4 }}
        >
          <img style={{ width: '100%', height: '100%' }} src="/assets/grid/gameover1.png" alt="game over" />
        </motion.div>
      )}
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
