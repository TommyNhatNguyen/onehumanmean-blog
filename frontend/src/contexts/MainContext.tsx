import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../store";
import { getAllBlogs } from "../store/reducers/blogSlices";
import { getAllProjects } from "../store/reducers/projectSlices";
import { useScrollTop } from "../utils/useScrollTop";

type MainContextPropsType = {
  handleToggleNav: () => void;
  handleDarkMode: () => void;
  handleHideNav: () => void;
  toggleNav: boolean;
  isDarkMode: boolean;
};

const MainContext = createContext<MainContextPropsType>(
  {} as MainContextPropsType,
);

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [toggleNav, setToggleNav] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggleNav = () => {
    setToggleNav((prev) => !prev);
    document.body.classList.toggle("--disable-scroll");
  };
  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.querySelector("html")?.classList.toggle("dark");
  };
  const handleHideNav = () => {
    setToggleNav(false);
    document.body.classList.remove("--disable-scroll");
  };
  useEffect(() => {
    useScrollTop();
    handleHideNav();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      handleHideNav();
    });
    dispatch(getAllBlogs());
    dispatch(getAllProjects());
  }, []);
  return (
    <MainContext.Provider
      value={{
        handleToggleNav,
        handleDarkMode,
        isDarkMode,
        toggleNav,
        handleHideNav,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
