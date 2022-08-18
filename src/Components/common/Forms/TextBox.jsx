import React from "react";
import { Form, Input, InputNumber } from "antd";
import style from "./index.module.less";
import { checkPostalCode, checkURL } from "../../../Functions";

const validation = {
  email: {
    required: true,
    type: "email",
    message: "Please enter valid email",
  },
  password: {
    required: true,
    type: "password",
    message: "Please enter valid password",
  },
  shopName: {
    required: true,
    message: "Please enter shop name",
  },
  address: {
    required: true,
    message: "Please select address using PIN location with map",
  },
  url: {
    required: true,
    message: "Please enter url",
  },
  brand: {
    required: true,
    message: "Please enter brand",
  },
  postal: {
    required: true,
    validator: (_, value) =>
      checkPostalCode(value)
        ? Promise.resolve()
        : Promise.reject(new Error("Please enter valid code")),
  },
  notCompulsory: {
    required: false,
  },
  listingName: {
    required: true,
    message: "Please enter listing name",
  },
  shopAddress: {
    required: true,
    message: "Please enter shop address",
  },
};
export const TextBox = ({
  label,
  placeholder,
  type,
  validationKey,
  name,
  id,
  hasFeedback,
  dependencies,
  className,
  change,
  value,
  disabled,
}) => {
  let validator;
  if (validationKey) {
    validator = validation[validationKey];
  }
  return (
    <Form.Item
      label={label}
      rules={[validator]}
      name={name}
      hasFeedback={hasFeedback}
      dependencies={[dependencies]}
      validateTrigger="onBlur"
      className={style.textBoxWrapper}
      initialValue={value}
    >
      {type !== "password" ? (
        <Input
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          onChange={change || null}
          type={type}
        />
      ) : (
        <Input.Password placeholder={placeholder} />
      )}
    </Form.Item>
  );
};
export const AccordianTextBox = ({ placeholder, disabled, change, icon }) => (
  <Input
    disabled={disabled}
    suffix={icon}
    onChange={change}
    placeholder={placeholder}
    className={style.accordianTextField}
  />
);
export const NumberField = ({
  name,
  validationKey,
  label,
  placeholder,
  value,
  addOnAfter,
}) => {
  const validator = validationKey && validation[validationKey];

  return (
    <Form.Item
      name={name}
      rules={[validator]}
      validateTrigger='onBlur'
      initialValue={value}
      label={label}
    >
      <InputNumber
        max={100000}
        addonAfter={addOnAfter}
        controls={false}
        placeholder={placeholder}
        className={style.inputNumberField}
      />
    </Form.Item>
  );
};
TextBox.defaultProps = {
  type: "text",
  placeholder: "PlaceHolder",
  hasFeedback: false,
  dependencies: "",
  change: "",
  customRule: undefined,
};
