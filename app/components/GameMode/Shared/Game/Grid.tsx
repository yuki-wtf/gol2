import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import type { PropsWithChildren } from 'react'

const StyledGridWithoutMotion = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);
  grid-gap: 0;
  gap: 0;
  border: 0;
  height: 100%;
  width: 100%;
  position: relative;
`

const StyledGrid = StyledGridWithoutMotion.withComponent(motion.div)

type Props = PropsWithChildren<{
  readonly isWithoutMotion?: boolean
}>

export default function Grid({ children, isWithoutMotion }: Props) {
  if (isWithoutMotion) {
    return <StyledGridWithoutMotion>{children}</StyledGridWithoutMotion>
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
