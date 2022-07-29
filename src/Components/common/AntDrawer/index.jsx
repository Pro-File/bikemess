import React, { useEffect } from "react";
import { Drawer, Form } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import style from "./index.module.less";

const AntDrawer = ({
  visible,
  onClose,
  children,
  heading,
  button,
  onFinish,
  onFinishFailed,
  form,
  initialValues,
}) => {
  return (
    <div className={style.DrawerWrapper}>
      <Drawer
        destroyOnClose
        size='large'
        closeIcon={<CloseCircleFilled />}
        title={heading}
        placement='right'
        onClose={onClose}
        visible={visible}
        closable
        className={style.mainDrawer}
        width='100%'
      >
        <Form
          requiredMark={false}
          form={form}
          layout='vertical'
          autoComplete='off'
          className={style.formBody}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={initialValues}
        >
          {children}

          {button}
        </Form>
      </Drawer>
    </div>
  );
};
export default AntDrawer;
