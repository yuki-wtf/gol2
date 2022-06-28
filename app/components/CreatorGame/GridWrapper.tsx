import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { dataToGrid } from '../../helpers/dataToGrid'
import Body from '../GolGrid/Body/Body'
import Loader from '../Loader/Loader'
import Grid from './Grid'

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`

const GridWrapper = ({ address, currentGen, gameId }) => {
  const { gameStates } = useSelector((state) => state.creatorGames)
  return (
    <Body>
      {gameStates && gameStates[gameId] ? (
        <Grid data={dataToGrid(gameStates[gameId].data)} />
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

export default GridWrapper
