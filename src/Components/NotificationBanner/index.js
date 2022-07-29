import React from "react";
import { SimpleParagraph } from "../common/Paragraph/index";
import style from "./index.module.less";
import { OutlineButton } from "../common/Buttons";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
const NotificationBanner = ({ notificationData }) => {
  return (
    <div
      className={style.banner}
      style={{ background: `${notificationData.bgColor}` }}
    >
      <SimpleParagraph
        paragraph={notificationData.description}
        size='16'
        margin='0px 10px'
      />
      <SimpleParagraph
        paragraph={notificationData.message}
        size='16'
        margin='0px 10px'
      />
      <Link to='/add-new-listing'>
        <OutlineButton
          text='ADD NEW LISTING'
          size='small'
          icon={<ArrowRightOutlined />}
          cssClass={style.addListingBtn}
        />
      </Link>
    </div>
  );
};

export default NotificationBanner;
