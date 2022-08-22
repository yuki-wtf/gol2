import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import Skeleton from '../Skeleton/Skeleton'
import T from '../Typography/Typography'

// const Container = styled(motion.div)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   height: 48px;
// `
const StyledStat = styled(motion.div)`
  display: flex;
  flex-direction: row;
  height: 48px;
  align-items: center;
  width: 100%;
  gap: 16px;
  margin-bottom: 1px;
`
const StyledIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.text200};
`
const StyledTitle = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text100};
`
const StyledValueContainer = styled(motion.div)`
  margin-left: auto;
`
const StyledValue = styled(motion.div)`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text50};
`
const fadeInAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

const StatRow = ({ icon, loading, error, title = 'title', value }) => {
  return (
    <StyledStat {...fadeInAnimation}>
      <StyledIcon>{icon}</StyledIcon>
      <StyledTitle>
        <T.BaseRegular>{title}</T.BaseRegular>
      </StyledTitle>
      <StyledValueContainer {...fadeInAnimation}>
        {loading ? (
          <Skeleton size={6} />
        ) : (
          <StyledValue {...fadeInAnimation}>
            <T.BaseExtraBold>{value}</T.BaseExtraBold>
          </StyledValue>
        )}
      </StyledValueContainer>
    </StyledStat>
  )
}

export default StatRow
