import clsx from "clsx";
import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  HTMLInputTypeAttribute,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

type InputPropsType = {
  children?: ReactNode;
  inputType?: HTMLInputTypeAttribute;
  label?: string;
  error?: string;
  wrapperTailClass?: string;
} & ComponentPropsWithoutRef<"input">;
const Input = (
  { label, inputType, error, wrapperTailClass, ...props }: InputPropsType,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const _onShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };
  return (
    <div className="flex w-full flex-col">
      {label && (
        <label
          htmlFor="password"
          className="mb-[4px] font-medium text-caption capitalize text-black-100 dark:text-white"
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          clsx(
            "relative h-[36px] rounded-[4px] border-2 px-[4px] duration-300",
            !!error
              ? "border-red-200"
              : "border-[rgba(2,106,162,0.5)] focus-within:border-sky-200 hover:border-sky-200",
          ),
          wrapperTailClass,
        )}
      >
        {inputType === "password" ? (
          <>
            <input
              className="h-full w-full border-none bg-[initial] font-regular text-black-100 outline-none placeholder:font-regular placeholder:capitalize placeholder:text-gray-100 dark:text-white dark:placeholder:text-white"
              type={isShowPassword ? "text" : "password"}
              {...props}
              ref={ref}
            />
            <button
              className="absolute right-[6px] top-[50%] translate-y-[-50%]"
              type="button"
              onClick={_onShowPassword}
            >
              {isShowPassword ? <LuEye /> : <LuEyeOff />}
            </button>
          </>
        ) : (
          <input
            className="h-full w-full border-none bg-[initial] font-regular text-black-100 outline-none placeholder:font-regular placeholder:capitalize placeholder:text-gray-100 dark:text-white dark:placeholder:text-white"
            {...props}
            ref={ref}
          />
        )}
      </div>
      {error && <p className="text-tag text-red-200">{error}</p>}
    </div>
  );
};

export default forwardRef(Input);
