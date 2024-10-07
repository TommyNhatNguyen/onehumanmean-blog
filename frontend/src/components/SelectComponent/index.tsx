import { Select, SelectProps } from "antd";
import { CSSProperties } from "react";

type SelectComponentType = SelectProps & {
  defaultValue?: any;
  width?: string | number;
  options: { label: string | number; value: string | number }[];
  styles?: CSSProperties;
};

const SelectComponent = ({
  defaultValue,
  width,
  options,
  styles,
  ...props
}: SelectComponentType) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: width, ...styles }}
      options={options}
      {...props}
    />
  );
};

export default SelectComponent;
