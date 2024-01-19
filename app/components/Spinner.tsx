import styled from '@emotion/styled'

interface Props {
  readonly color?: string
  readonly width?: string
  readonly height?: string
}

const Spinner = ({ color, ...rest }: Props) => (
  <StyledSpinner color={color} viewBox="0 0 50 50" {...rest}>
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
  </StyledSpinner>
)

const StyledSpinner = styled.svg<Props>`
  animation: rotate 2s linear infinite;
  width: ${({ width }) => (width ? width : '18px')};
  height: ${({ height }) => (height ? height : '18px')};
  & .path {
    stroke: ${(props) => (props.color ? props.color : 'currentColor')};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  margin-inline: auto;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
export default Spinner
