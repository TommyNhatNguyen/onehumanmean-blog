import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";
import Container from "../components/Container";
import { createPortal } from "react-dom";
import Button from "../components/Button";
import { BsArrowUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useScrollTop } from "../utils/useScrollTop";

const MainLayout = () => {
  const [isShowBtnBtt, setIsShowBtnBtt] = useState(false);
  const _onScrollTop = () => {
    useScrollTop();
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const documentHeight = document.body.offsetHeight;
      if (scrollY + window.innerHeight > (documentHeight * 2) / 3) {
        setIsShowBtnBtt(true);
      } else {
        setIsShowBtnBtt(false);
      }
    });
  }, []);
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
      <Button
        onClick={_onScrollTop}
        style={{
          right: `max(var(--pd-container), calc((100vw - var(--max-width-page))/2 + var(--pd-container)))`,
        }}
        tailClasses={clsx(
          "fixed bottom-[16px] w-[42px] h-[42px] rounded-lg flex items-center justify-center p-0 duration-300 translate-y-[100vh]",
          isShowBtnBtt && "translate-y-0",
        )}
      >
        <BsArrowUp />
      </Button>
    </Container>
  );
};

export default MainLayout;
