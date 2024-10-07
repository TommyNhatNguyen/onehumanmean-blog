import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import styled from "styled-components";

type tabsComponentsItemType = {
  link: string;
  name: string;
  icon?: ReactNode;
  props?: ComponentPropsWithoutRef<"a">;
};

type tabsComponentType = {
  children: ReactNode;
  tabTitle: string;
  icon?: ReactNode;
};

const TabsComponent = ({ tabTitle, icon, children }: tabsComponentType) => {
  const [isActiveTab, setIsActiveTab] = useState<boolean>(false);
  const _onActiveTab = () => {
    setIsActiveTab((prev) => !prev);
  };
  return (
    <div className={clsx("flex flex-col gap-[8px]")}>
      <button
        type="button"
        className="flex items-center gap-[8px] duration-150 hover:opacity-70"
        onClick={_onActiveTab}
      >
        <div className="flex items-center gap-[4px]">
          <div className="h-[20px] w-[20px] flex-shrink-0">
            {!!icon ? icon : <CiViewList className="h-full w-full" />}
          </div>
          <h3 className="font-medium text-h2-sm text-black-100">{tabTitle}</h3>
        </div>
        <div
          className={clsx(
            "h-[20px] w-[20px] flex-shrink-0 duration-150",
            isActiveTab && "rotate-90",
          )}
        >
          <MdKeyboardArrowRight className="h-full w-full" />
        </div>
      </button>
      <div
        className={clsx(
          "flex flex-col gap-[8px]",
          isActiveTab ? "h-full" : "h-0 overflow-hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
};

TabsComponent.Item = ({
  link,
  name,
  icon,
  ...props
}: tabsComponentsItemType) => {
  return (
    <StyledTabsComponent
      to={link}
      className="flex w-full items-center justify-start gap-[8px] rounded-[8px] px-[8px] py-[4px] duration-150 hover:bg-gray-200 hover:text-black-100"
      {...props}
    >
      <div className="h-[24px] w-[24px]">
        {!!icon ? icon : <HiOutlineDocumentPlus className="h-full w-full" />}
      </div>
      <p>{name}</p>
    </StyledTabsComponent>
  );
};

export default TabsComponent;

const StyledTabsComponent = styled(NavLink)`
  &.active {
    background-color: var(--gray-cl-200);
  }
`;
