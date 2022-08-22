import type { ForwardRefComponent, HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

// cell count
const GRID_SIZE = 15

// size in pixels
const SMALL_GRID_SIZE = 244
const LARGE_GRID_SIZE = 512

interface Props {
  readonly small?: boolean
}

const StyledGrid = styled<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'> & Props>>(motion.div)`
  display: grid;
  grid-template-columns: ${(p) =>
    `repeat(${GRID_SIZE}, ${(p.small ? SMALL_GRID_SIZE : LARGE_GRID_SIZE) / GRID_SIZE}px)`};
  grid-template-rows: ${(p) => `repeat(${GRID_SIZE}, ${(p.small ? SMALL_GRID_SIZE : LARGE_GRID_SIZE) / GRID_SIZE}px)`};
  grid-gap: 0;
  gap: 0;
  background-size: ${(p) => (p.small ? `${SMALL_GRID_SIZE}px` : `${LARGE_GRID_SIZE}px`)};
  border: 0;
  height: ${(p) => (p.small ? `${SMALL_GRID_SIZE}px` : `${LARGE_GRID_SIZE}px`)};
  width: ${(p) => (p.small ? `${SMALL_GRID_SIZE}px` : `${LARGE_GRID_SIZE}px`)};
  position: relative;
  overflow: ${(p) => (p.small ? 'hidden' : 'visible')};
`
const StyledGridNoMotion = styled.div<Props>`
  display: grid;
  grid-template-columns: ${(p) =>
    `repeat(${GRID_SIZE}, ${(p.small ? SMALL_GRID_SIZE : LARGE_GRID_SIZE) / GRID_SIZE}px)`};
  grid-template-rows: ${(p) => `repeat(${GRID_SIZE}, ${(p.small ? SMALL_GRID_SIZE : LARGE_GRID_SIZE) / GRID_SIZE}px)`};
  grid-gap: 0;
  gap: 0;

  background-size: ${(p) => (p.small ? `${SMALL_GRID_SIZE}px` : `${LARGE_GRID_SIZE}px`)};
  border: 0;
  height: ${(p) => (p.small ? `${SMALL_GRID_SIZE}px` : `${LARGE_GRID_SIZE}px`)};
  width: ${(p) => (p.small ? `${SMALL_GRID_SIZE}px` : `${LARGE_GRID_SIZE}px`)};
  position: relative;
  overflow: ${(p) => (p.small ? 'hidden' : 'visible')};
`
const StyledGridCreatorNoMotion = styled.div<Props>`
  display: grid;
  grid-template-columns: ${(p) =>
    `repeat(${GRID_SIZE}, ${(p.small ? SMALL_GRID_SIZE : LARGE_GRID_SIZE) / GRID_SIZE}px)`};
  grid-template-rows: ${(p) => `repeat(${GRID_SIZE}, ${(p.small ? SMALL_GRID_SIZE : LARGE_GRID_SIZE) / GRID_SIZE}px)`};
  grid-gap: 0;
  gap: 0;

  background-size: ${(p) => (p.small ? '212px' : `${LARGE_GRID_SIZE}px`)};
  border: 0;
  height: ${(p) => (p.small ? '212px' : `${LARGE_GRID_SIZE}px`)};
  width: ${(p) => (p.small ? '212px' : `${LARGE_GRID_SIZE}px`)};
  position: relative;
  overflow: ${(p) => (p.small ? 'hidden' : 'visible')};
`

const GameGrid = ({ children, small, isSnapshot, isSnapshotCreator }) => {
  if (isSnapshot) return <StyledGridNoMotion small={small}>{children}</StyledGridNoMotion>

  if (isSnapshotCreator) {
    return <StyledGridCreatorNoMotion small={small}>{children}</StyledGridCreatorNoMotion>
  }

  return (
    <StyledGrid
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
      {children}
    </StyledGrid>
  )
}

export default GameGrid
