import clsx from "clsx";
import { FC, ReactNode } from "react";

type ContainerPropsType = {
  children: ReactNode;
  tailStyles?: string;
};

const Container: FC<ContainerPropsType> = ({ children, tailStyles }) => {
  return (
    <div className={clsx("container relative", tailStyles)}>{children}</div>
  );
};

export default Container;
