import { useRef } from "react";
import { useMainContext } from "../../contexts/MainContext";
import clsx from "clsx";
import { PATH } from "../../constant/path";
import { Link, NavLink } from "react-router-dom";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";

const MobileNav = () => {
  const toggleDarkModeRef = useRef<any>();
  const { toggleNav, handleDarkMode, isDarkMode } = useMainContext();
  const _onSetDarkMode = () => {
    handleDarkMode();
  };
  return (
    <div
      className={clsx(
        "pointer-events-none fixed left-0 top-0 flex h-lvh w-full flex-col items-center justify-center gap-[54px] opacity-0 duration-500",
        toggleNav &&
          isDarkMode &&
          "pointer-events-auto bg-black-200 opacity-100",
        toggleNav && !isDarkMode && "pointer-events-auto bg-white opacity-100",
      )}
    >
      <Link
        className={clsx(
          "flex-shrink-0 font-semibold text-lg duration-500",
          isDarkMode ? "text-white" : "text-black-200",
        )}
        to={PATH.HOME}
      >
        Tommy Nguyen
      </Link>
      <ul className={clsx("flex flex-col items-center gap-[24px]")}>
        <li className="relative">
          <NavLink
            className={clsx(
              "group relative flex items-center justify-center",
              isDarkMode ? "text-white" : "text-black-200",
            )}
            to={PATH.BLOG.INDEX}
          >
            Blog
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            className={clsx(
              "group relative flex items-center justify-center",
              isDarkMode ? "text-white" : "text-black-200",
            )}
            to={PATH.PROJECT.INDEX}
          >
            Projects
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            className={clsx(
              "group relative flex items-center justify-center",
              isDarkMode ? "text-white" : "text-black-200",
            )}
            to={PATH.ABOUT}
          >
            About
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            className={clsx(
              "group relative flex items-center justify-center",
              isDarkMode ? "text-white" : "text-black-200",
            )}
            to={PATH.CONTACT}
          >
            Newsletter
            <div className="absolute bottom-0 h-[1px] w-full scale-x-0 bg-black-100 duration-300 group-hover:scale-x-100 group-[.active]:scale-x-100 dark:bg-white"></div>
          </NavLink>
        </li>
        <li
          className={clsx(
            "relative flex h-[40px] flex-shrink-0 items-center gap-[16px] rounded-[30px] px-[16px] duration-300",
            isDarkMode ? "bg-white" : "bg-black-200",
          )}
          ref={toggleDarkModeRef}
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
            className="h-[24px] w-[24px] cursor-pointer"
            onClick={_onSetDarkMode}
          />
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
