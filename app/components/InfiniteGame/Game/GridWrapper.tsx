import { motion } from 'framer-motion'
import styled from 'styled-components'
import Body from '../../GolGrid/Body/Body'
import Loader from '../../Loader/Loader'
import Grid from './Grid'

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`

interface Props {
  readonly grid: ReadonlyArray<ReadonlyArray<number>> | null
}

export default function GridWrapper({ grid }: Props) {
  return (
    <Body>
      {grid != null ? (
        <Grid data={grid} />
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
