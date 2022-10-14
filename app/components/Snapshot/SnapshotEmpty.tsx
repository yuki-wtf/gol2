import styled from '@emotion/styled'
import Typography from '../Typography'
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion'

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #57637b;
  background: #1b202b;
  max-width: 916px;
  width: 100%;
  height: 382px;
  border: 1px solid #0a0c10;
  box-sizing: border-box;
  border-radius: 10px;
`
const IconWrapper = styled.div``
const TextWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  text-align: center;
`

interface Props {
  readonly icon?: React.ReactNode
  readonly label?: React.ReactNode
  readonly style?: MotionProps['style']
}

const SnapshotEmpty = ({
  label = 'Connect your wallet to view snapshots from your previous plays',
  icon,
  style,
}: Props) => {
  return (
    <Container style={{ ...style }}>
      <IconWrapper>{icon}</IconWrapper>
      <TextWrapper>
        <Typography.BaseSemiBold>{label}</Typography.BaseSemiBold>
      </TextWrapper>
    </Container>
  )
}

export default SnapshotEmpty
