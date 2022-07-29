import React from "react";
import { Row, Col } from "antd";
import styles from "./index.module.less";
import { SimpleParagraph } from "../../../Components/common/Paragraph";
import AdminLoginForm from "../../../Components/AdminLoginForm/AdminLoginForm";

const AdminLogin = () => {
  return (
    <div className={styles.adminContainer}>
      <Row className={styles.authNotification}>
        <SimpleParagraph
        css={styles.notificationText}
          paragraph={
            "We’ll take care of all the mess so you don’t have to.  Just search what you need and we’ll show you all the possibilities"
          }
          size="14"
          margin="0px 10px"
        />
      </Row>
      <Row className={styles.authMainContainer}>
        <Col xs={0} sm={0} md={6} lg={8} xl={8}></Col>

        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <AdminLoginForm />
        </Col>

        <Col xs={0} sm={0} md={6} lg={8} xl={8}></Col>
      </Row>
    </div>
  );
};

export default AdminLogin;
