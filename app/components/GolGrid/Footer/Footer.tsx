import styled from 'styled-components'

const StyledFooter = styled.footer`
  background-color: ${(props) => (props.empty ? '#1D222D' : props.theme.colors.neutral100)};
  border: 1px solid ${(props) => props.theme.colors.neutral400};
  height: 68px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
  position: relative;
`

const Footer = ({ children }) => {
  return (
    <StyledFooter>
      <>{children}</>
    </StyledFooter>
  )
}

export default Footer
