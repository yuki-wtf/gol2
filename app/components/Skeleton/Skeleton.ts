import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

// const sizes = {
//   sm: 16,
//   md: 19,
//   lg: 36,
// } as const
const animate = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
`
// type Props = {
//   size?: keyof typeof sizes
// }
const Skeleton = styled.div`
  display: inline-flex;
  width: 100%;
  position: relative;
  overflow: hidden;
  height: ${(p) => (!p.size ? '100%' : `${p.size}px`)};
  border-radius: 2px;
  min-width: 24px;
  background-color: ${(p) => p.theme.colors.text200};
  /* Figure out more performant way to animate skeletons */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: -webkit-radial-gradient(white, black);
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(38, 45, 60, 0.520859),
      rgba(255, 255, 255, 0)
    );
    background-repeat: repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    animation: ${animate} 1600ms cubic-bezier(0.65, 0, 0.35, 1);
    animation-iteration-count: infinite;
  }
`
export default Skeleton
