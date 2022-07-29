import React from 'react'
import Modal from "../common/Modal/index";
import styles from "./index.module.less";
import { SimpleHeading } from "../common/Heading";
import {SimpleParagraph} from "../common/Paragraph/index"
import { Row } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const LogoutModal = ({handleLogout, closeModal, showModal, isModalVisible}) => {
  return (
    <div>
             <Modal
        cssClass={styles.modal}
        closable="false"
        body={
          <div>
            <Row className={styles.logoutModalRow}>
            <SimpleParagraph paragraph="Do you really want to Log Out ?" size="16" margin="0px 0px" />
            </Row>
           <Row>
           <SimpleHeading heading="NOTE :" size="16" margin="0px 0px" />
            <SimpleParagraph paragraph="Clicking “Continue” will logout and you must sign in again to ensure security!" size="14" margin="0px 0px" />
           </Row>
          </div>
        }
        width={600}
        visible={isModalVisible}
        okText={"Continue"}
        handleOkSubmit={handleLogout}
        handleCancel={closeModal}
        title={
          <div className={styles.modalTitle}>
            <SimpleHeading heading="Confirmation" size="18" margin="0px 0px" />
            <WarningOutlined className={styles.warningIcon}/>
          </div>
        }
      />
    </div>
  )
}

export default LogoutModal