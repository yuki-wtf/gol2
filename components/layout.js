import Navbar from "./navbar/navbar";
import Footer from "./Footer/Footer";
import Container from "./Layout/Container";
import Main from "./Layout/Main";

export default function Layout({ children }) {
  return (
    <Container>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
}
