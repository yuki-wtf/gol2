import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import Container from './Layout/Container'
import Main from './Layout/Main'
import { useLocation } from '@remix-run/react'

export default function Layout({ children }) {
  const router = useLocation()

  return (
    <Container>
      {router.pathname !== '/' ? <Navbar /> : null}

      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
