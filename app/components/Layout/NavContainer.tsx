import styled from '@emotion/styled'

const Container = styled.div`
  padding-top: 10vh;
  @media (max-height: 1100px) {
    padding-top: 4vh;
  }
`

const NavContainer = ({ children }) => {
  return <Container>{children}</Container>
}

export default NavContainer
