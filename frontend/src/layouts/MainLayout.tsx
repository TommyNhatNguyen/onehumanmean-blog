import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";
import Container from "../components/Container";
import { createPortal } from "react-dom";

const MainLayout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      {createPortal(
        <>
          <Footer />
          <MobileNav />
        </>,
        document.body,
      )}
    </Container>
  );
};

export default MainLayout;
