import { Form, Image, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { OutlineButton, SimpleButton } from "../common/Buttons";
import { SimpleHeading } from "../common/Heading";
import { SimpleParagraph } from "../common/Paragraph";
import closeImage from "../../Assests/closeImage.png";
import Modal from "../common/Modal";
import style from "./index.module.less";
import { db } from "../../Services/firebaseConfig";

const DeleteModal = ({ isModalVisible, closeModal, rowData }) => {
  const [buttonLoading, setbuttonloading] = useState(false);
  const Delete = async () => {
    setbuttonloading(true);
    await db()
      .collection("list")
      .doc(rowData.id)
      .update({
        isDeleted: true,
      })
      .then(() => {
        message.success("Listing Deleted Successfully");
      })
      .catch(() => {
        message.error("Something went wrong");
      })
      .finally(() => {
        setbuttonloading(false);

        closeModal();
      });
  };
  return (
    <div>
      <Modal
        cssClass={style.modal}
        footer='null'
        closable='false'
        body={
          <Form.Item className='DeleteModalFormWrapper'>
            <div className={style.modalWrapper}>
              <Image src={closeImage} preview={false} alt='close Image' />
              <SimpleHeading
                heading='Are you sure ?'
                size='30'
                margin='15px 0px'
              />
              <SimpleParagraph
                paragraph='Do you really want to delete this listing ?'
                size='14'
              />
              <SimpleParagraph
                paragraph='this process cannot be undone'
                size='14'
              />
              <div className={style.buttonWrapper}>
                <OutlineButton
                  text='Cancel'
                  size='large'
                  onClick={closeModal}
                />
                <SimpleButton
                  type='primary'
                  size='large'
                  shape='round'
                  text='Confirm'
                  onClick={Delete}
                  loading={buttonLoading}
                />
              </div>
            </div>
          </Form.Item>
        }
        width={400}
        visible={isModalVisible}
        handleOk={closeModal}
        handleCancel={closeModal}
      />
    </div>
  );
};
export default DeleteModal;
