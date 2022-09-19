import { AnimatePresence, motion } from 'framer-motion'
import styled from '@emotion/styled'

const StyledContainer = styled(motion.div)`
  height: 266px;
  overflow-y: auto;
`
const TxnList = ({ children }) => {
  return (
    <StyledContainer initial={false}>
      <AnimatePresence> {children}</AnimatePresence>
    </StyledContainer>
  )
}

export default TxnList
