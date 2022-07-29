import React from "react";
import { Select, Form } from "antd";
import style from "./index.module.less";

const validation = {
  requiredIndustry: {
    required: true,
    message: "Please Select Industry",
  },
  requiredField: {
    required: true,
    message: "Please Select a role",
  },
};
export const CustomSelector = ({
  label,
  options,
  placeholder,
  validationKey,
  name,
  size,
  setState,
  cssClass,
  defaultVal,
  value,
  optionName,
  optionKey,
  handleChange,
  ...props
}) => {
  const validator = validation[validationKey];

  return (
    <Form.Item
      label={label}
      rules={[validator]}
      ellipsis={true}
      name={name}
      {...props}
    >
      {console.log("Default: ", defaultVal)}
      <Select
        allowClear
        onChange={(val) => handleChange(val)}
        value={value}
        defaultValue={defaultVal}
        className={`${style.Select} ${cssClass}`}
        dropdownClassName={style.Select}
        placeholder={placeholder}
        size={size}
      >
        {options?.map((option, i) => (
          // TODO dynamic value's key from calling side
          <Select.Option
            key={option?.[optionKey] || option.key}
            value={option?.[optionKey] || option.value}
          >
            {option?.[optionName] || option.values}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
CustomSelector.defaultProps = {
  size: "medium",
};
