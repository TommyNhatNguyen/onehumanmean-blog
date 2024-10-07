import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type ButtonPropsType = {
  children?: ReactNode;
  type?: "submit" | "button";
  link?: string;
  tailClasses?: string;
} & ComponentPropsWithoutRef<"button">;

const Button = ({
  children,
  type = "button",
  tailClasses,
  link,
  ...props
}: ButtonPropsType) => {
  return (
    <>
      {link ? (
        <Link
          className={twMerge(
            clsx(
              "flex h-[32px] w-fit items-center justify-center rounded-[24px] bg-[rgba(2,106,162,0.8)] px-[16px] font-regular text-tag capitalize text-white duration-300 hover:bg-sky-200",
              tailClasses,
            ),
          )}
          to={link}
        >
          {children}
        </Link>
      ) : (
        <button
          className={twMerge(
            "h-[32px] rounded-[24px] bg-[rgba(2,106,162,0.8)] px-[16px] font-regular text-tag capitalize text-white duration-300 hover:bg-sky-200",
            tailClasses,
          )}
          type={type}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
