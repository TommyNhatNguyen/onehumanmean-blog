import { Select, SelectProps } from "antd";
import { CSSProperties, FormEvent } from "react";

type SelectComponentType = {
  defaultValue?: string | number;
  width?: string;
  options: any[];
  styles?: CSSProperties;
  handleChange: (value: string) => void;
} & SelectProps;

const SelectComponent = ({
  defaultValue,
  width,
  options,
  handleChange,
  styles,
  ...props
}: SelectComponentType) => {
  const _onChange = (value: FormEvent<HTMLDivElement> & string) => {
    handleChange(value);
  };
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: width, ...styles }}
      onChange={_onChange}
      {...props}
      options={options}
    />
  );
};

export default SelectComponent;
