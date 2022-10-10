import { useLottie } from 'lottie-react'
import animation from '../../assets/animations/loader.json'
import styled from '@emotion/styled'

const options = {
  animationData: animation,
  height: 120,
  width: 120,
  loop: true,
  autoplay: true,
}
const StyledCenteredContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyledLoaderContainer = styled.div<Props>`
  height: 120px;
  width: 120px;
  z-index: 0 !important;
  & svg > g > g:first-of-type path {
    stroke: ${(p) => (p.variant === 'light' ? '#2d3038' : '#1D222C')};
  }
  & svg > g > g path {
    stroke: ${(p) => (p.variant === 'light' ? '#f06b97' : '#F3E9E1')};
  }
`

interface Props {
  readonly centered?: boolean
  readonly variant?: 'light' | 'dark'
}

const Loader = ({ centered, variant = 'light' }: Props) => {
  const { View } = useLottie(options)

  if (centered) {
    return (
      <StyledCenteredContainer>
        <StyledLoaderContainer variant={variant}>{View}</StyledLoaderContainer>
      </StyledCenteredContainer>
    )
  }

  return <StyledLoaderContainer variant={variant}>{View}</StyledLoaderContainer>
}

export default Loader
