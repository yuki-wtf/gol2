import styled from '@emotion/styled'

interface Props {
  readonly color?: string
}

const Spinner = ({ color }: Props) => (
  <StyledSpinner color={color} viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
  </StyledSpinner>
)

const StyledSpinner = styled.svg<Props>`
  animation: rotate 2s linear infinite;
  width: 18px;
  height: 18px;
  & .path {
    stroke: ${(props) => (props.color ? props.color : 'currentColor')};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
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
