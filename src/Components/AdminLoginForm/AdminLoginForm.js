import { ArrowLeftOutlined } from "@ant-design/icons";
import { style } from "@mui/system";
import { Form, Row, Col, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { global } from "../../Functions";
import { signin } from "../../Redux/Slices/AuthSlice";
import { SimpleButton } from "../common/Buttons";
import { TextBox } from "../common/Forms/TextBox";
import { SimpleHeading } from "../common/Heading";
import styles from "./index.module.less";

const AdminLoginForm = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinishFailed = () => {
    console.log("Error!");
  };
  const onFinish = async (values) => {
    const credentials = {
      email: values.email,
      status: "Admin",
    };
    global
      .login(values)
      .then((data) => {
        message.success("Signed in successfully!");
        dispatch(signin(JSON.stringify(credentials)));
        history.push("/admin-dashboard");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div className={styles.adminFormContainer}>
      <div className={styles.adminForm}>
        <SimpleHeading heading={"ADMIN LOGIN"} size={24} weight={"bold"} />
        <Form
          scrollToFirstError={true}
          form={form}
          layout='vertical'
          autoComplete='off'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={[24, 24]} className={styles.formRow}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TextBox
                type='text'
                name='email'
                placeholder='ENTER EMAIL ADDRESS'
                label='EMAIL ADDRESS'
                validationKey='email'
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TextBox
                type='password'
                name='password'
                placeholder='ENTER YOUR PASSWORD'
                label='PASSWORD'
                validationKey='password'
              />
            </Col>
          </Row>
          <Row className={style.formButtonContainer}>
            <SimpleButton
              type='primary'
              size='small'
              shape='round'
              hType={"submit"}
              text='Login'
            />
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
