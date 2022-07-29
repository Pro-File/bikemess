import React from "react";
import { Form, TimePicker } from "antd";
import moment from "moment";
import style from "./index.module.less";

const Timepicker = ({ name, label, placeholder }) => {
  function onChange(time, timeString) {}
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: true,
          message: "Required Field",
        },
      ]}
    >
      <TimePicker
        className={style.timepicker}
        placeholder={placeholder}
        onChange={onChange}
        use12Hours
        format='h:mm A'
      />
    </Form.Item>
  );
};

export default Timepicker;
