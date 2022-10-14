import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { useLocation } from '@remix-run/react'
import styled from '@emotion/styled'

const Main = styled.div`
  flex: 1;
  position: relative;
`

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.body};
  background: linear-gradient(89.98deg, #1d222c 7.97%, #1d222d 70.62%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const router = useLocation()

  return (
    <Container>
      {router.pathname !== '/' ? <Navbar /> : null}

      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
