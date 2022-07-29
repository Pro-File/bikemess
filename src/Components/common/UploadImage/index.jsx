/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Upload, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import style from "./index.module.less";

const uploadButton = (
  <div>
    <PlusOutlined />
  </div>
);
const UploadImage = ({ imgName, imgUrl, cssClass }) => {
  const [loading, setloading] = useState(false);
  const [image, setimage] = useState(false);
  const [imageCard, setImageCard] = useState(true);
  const [updateImg, setUpdateImg] = useState(true);
  const [list, setList] = useState([]);

  const imageUrl = image;

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const fileSize = file.size / 1024 / 1024 < 2;
    setList([file]);
    if (!fileSize) {
      message.error("Image must smaller than 2MB!");
      setImageCard(false);
    }
    return false;
  };

  const handleRemove = () => {
    setImageCard(true);
    setList([]);
  };
  const handleChange = (info) => {
    setUpdateImg(false);
    if (info.file.status === "uploading") {
      setloading(true);
      setImageCard(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(
        info.file.originFileObj,
        () => setloading(false),
        setimage(imageUrl),
        setImageCard(false)
      );
    }
  };

  return (
    <div>
      <Form.Item
        name={imgName}
        rules={[
          {
            required: true,
            message: "Please upload image",
          },
        ]}
      >
        <Upload
          accept='image/*'
          maxCount={1}
          multiple={false}
          name='avatar'
          listType='picture-card'
          className={`${cssClass} ${style.avatarUploader}`}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onRemove={handleRemove}
          onPreview={() => null}
        >
          {(imageUrl || imgUrl) && updateImg ? (
            <img
              src={imgUrl || imageUrl}
              alt='avatar'
              height={100}
              width={100}
            />
          ) : (
            imageCard && !list.length && uploadButton
          )}
        </Upload>
      </Form.Item>
    </div>
  );
};

export default UploadImage;
