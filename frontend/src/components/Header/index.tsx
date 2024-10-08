import { Link, NavLink } from "react-router-dom";
import { PATH } from "../../constant/path";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import clsx from "clsx";
import { useMainContext } from "../../contexts/MainContext";

const Header = () => {
  const { handleToggleNav, handleDarkMode, isDarkMode, toggleNav } =
    useMainContext();
  const _onToggleNav = () => {
    handleToggleNav();
  };
  const _onSetDarkMode = () => {
    handleDarkMode();
  };

  return (
    <div className="relative z-[100] flex h-header items-center justify-between py-[20px]">
      <Link
        className={clsx(
          "flex-shrink-0 font-semibold text-lg text-black-100 duration-500",
          toggleNav && "opacity-0",
          "dark:text-white",
        )}
        to={PATH.HOME}
      >
        Tommy Nguyen
      </Link>
      <ul
        className={clsx(
          "hidden h-full items-center gap-9",
          "mobile:flex",
          "dark:text-white",
        )}
      >
        <li className="relative h-full">
          <NavLink
            className="group relative flex h-full items-center justify-center text-black-100 dark:text-white"
            to={PATH.BLOG.INDEX}
          >
            Blog
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li className="relative h-full">
          <NavLink
            className="group relative flex h-full items-center justify-center text-black-100 dark:text-white"
            to={PATH.PROJECT.INDEX}
          >
            Projects
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li className="relative h-full">
          <NavLink
            className="group relative flex h-full items-center justify-center text-black-100 dark:text-white"
            target="_blank"
            to={PATH.ABOUT}
          >
            About
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li className="relative h-full">
          <NavLink
            className="group relative flex h-full items-center justify-center text-black-100 dark:text-white"
            to={PATH.CONTACT}
          >
            Contact
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li
          className={clsx(
            "relative flex h-[40px] flex-shrink-0 items-center gap-[16px] rounded-[30px] px-[16px] duration-300",
            isDarkMode ? "bg-white" : "bg-black-200",
          )}
        >
          <span
            className={clsx(
              "absolute h-[24px] w-[24px] rounded-full duration-300",
              isDarkMode ? "translate-x-[0]" : "translate-x-[40px]",
              isDarkMode ? "bg-black-300" : "bg-white",
            )}
          ></span>
          <GoSun
            fill="white"
            className="h-[24px] w-[24px] cursor-pointer"
            onClick={_onSetDarkMode}
          />
          <IoMoonOutline
            className="h-[24px] w-[24px] cursor-pointer dark:stroke-black-100"
            onClick={_onSetDarkMode}
          />
        </li>
      </ul>
      <div
        className="group relative flex h-[24px] w-[24px] cursor-pointer flex-col items-center justify-center mobile:hidden"
        onClick={_onToggleNav}
      >
        <div
          className={clsx(
            "absolute top-0 h-[3px] w-full rounded-full bg-black-100 dark:bg-white",
            toggleNav && isDarkMode ? "animate-rotateDown" : "",
            toggleNav && !isDarkMode ? "animate-rotateDownLight" : "",
          )}
        ></div>
        <div
          className={clsx(
            "absolute top-[50%] h-[3px] w-full translate-y-[-50%] rounded-full bg-black-100 duration-150 dark:bg-white",
            toggleNav ? "opacity-0" : "",
          )}
        ></div>
        <div
          className={clsx(
            "absolute bottom-[1px] h-[3px] w-full rounded-full bg-black-100 duration-150 ease-in-out dark:bg-white",
            toggleNav && isDarkMode ? "animate-rotateUp" : "",
            toggleNav && !isDarkMode ? "animate-rotateUpLight" : "",
          )}
        ></div>
      </div>
    </div>
  );
};

export default Header;
