import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import Container from './Layout/Container'
import Main from './Layout/Main'
import { useRouter } from 'next/router'
export default function Layout({ children }) {
  const router = useRouter()
  return (
    <Container>
      {router.pathname !== '/' ? <Navbar /> : null}

      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
