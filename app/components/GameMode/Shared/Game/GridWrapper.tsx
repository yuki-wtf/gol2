import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import Loader from '~/components/Loader'
import Body from './Body'

const StyledLoaderContainer = styled(motion.div)`
  width: 512px;
  height: 512px;
  background-color: black;
`

interface Props {
  readonly children?: React.ReactNode | undefined
  readonly isGameOver?: boolean
}

export default function GridWrapper({ isGameOver, children }: Props) {
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
      {children != null ? (
        children
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
          <Loader variant="dark" centered />
        </StyledLoaderContainer>
      )}
    </Body>
  )
}
