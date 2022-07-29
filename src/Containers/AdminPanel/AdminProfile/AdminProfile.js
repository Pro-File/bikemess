import { Col, Form, Row, message } from "antd";
import React, { useState } from "react";
import styles from "./index.module.less";
import { TextBox } from "../../../Components/common/Forms/TextBox";
import { SimpleButton } from "../../../Components/common/Buttons";
import { Button } from "@mui/material";
import { global } from "../../../Functions";

const AdminProfile = () => {
  const [form] = Form.useForm();
  const auth = JSON.parse(localStorage.getItem("admin"));
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [initialValues, setInitialValues] = useState(auth);

  const onFinishFailed = () => {
    console.log("Error!");
  };
  const onCancel = () => {
    form.resetFields();
    setInitialValues(auth);
  };
  const onFinish = async (values) => {
    try {
      const { oldPassword, newPassword } = values;
      setLoadingPassword(true);
      await global
        .confirmOldPassword(oldPassword)
        .then(async () => {
          await global
            .setNewPassword(newPassword)
            .then(() => {
              message.success("Password updated");
            })
            .catch((error) => {
              message.error("Password could not be updated");
            });
        })
        .catch((error) => {
          message.error("Current password entered is incorrect");
        });
    } catch (error) {
      message.error("Password could not be updateds");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className={styles.updateProfileContainer}>
      <Form
        scrollToFirstError={true}
        form={form}
        initialValues={initialValues}
        layout='vertical'
        autoComplete='off'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Row gutter={[24, 24]} className={styles.formRow}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <TextBox
                  type='text'
                  name='email'
                  placeholder='ENTER EMAIL ADDRESS'
                  label='EMAIL ADDRESS:'
                  validationKey='email'
                  disabled={true}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <TextBox
                  type='password'
                  name='oldPassword'
                  placeholder='ENTER CURRENT PASSWORD'
                  label='CURRENT PASSWORD:'
                  validationKey='password'
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <TextBox
                  type='password'
                  name='newPassword'
                  placeholder='ENTER New PASSWORD'
                  label='NEW PASSWORD:'
                  validationKey='password'
                />
              </Col>
            </Row>
            <Row className={styles.formButtonContainer}>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Button
                  variant='transparent'
                  className={styles.simple}
                  onClick={() => onCancel()}
                >
                  <u>Cancel</u>
                </Button>
              </Col>
              <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                <SimpleButton
                  type='primary'
                  size='small'
                  shape='round'
                  className={styles.submitProfileBtn}
                  hType={"submit"}
                  text='SAVE CHANGES'
                  loading={loadingPassword}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={12} lg={16} xl={16}></Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminProfile;
