import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { SimpleParagraph } from "../common/Paragraph";
import { Link } from "react-router-dom";
import style from "./index.module.less";
import { useSelector } from "react-redux";

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Inlinenavbar = () => {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);
  const isLoggedIn = useSelector((state) => state.auth);
  const auth = localStorage.getItem("admin");
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const items = [
    {
      label: (
        <SimpleParagraph
          paragraph="BROWSE BY CATEGORIES"
          size="18"
          bold
          //   css={style.letterSpacing}
        />
      ),
      key: "SubMenu",
      children: [
        {
          label: (
            <Link to="/categories/mtb">
              <SimpleParagraph
                paragraph="MTB"
                size="18"
                bold
                //   css={style.letterSpacing}
              />
            </Link>
          ),
          key: "MTB",
        },
        {
          label: (
            <Link to="/categories/road-bike">
              <SimpleParagraph
                paragraph="Road Bike"
                size="18"
                bold
                //   css={style.letterSpacing}
              />
            </Link>
          ),
          key: "Road Bike",
        },
        {
          label: (
            <Link to="/categories/foldies">
              <SimpleParagraph
                paragraph="Folding Bike"
                size="18"
                bold
                //   css={style.letterSpacing}
              />
            </Link>
          ),
          key: "Folding Bike",
        },
        {
          label: (
            <Link to="/categories/e-bike">
              <SimpleParagraph
                paragraph="E-Bike"
                size="18"
                bold
                //   css={style.letterSpacing}
              />
            </Link>
          ),
          key: "E Bike",
        },
      ],
    },
    {
      label: (
        <Link to="/categories-retail">
          <SimpleParagraph
            paragraph="BROWSE ALPHABETICALLY"
            size="18"
            bold
            //   css={style.letterSpacing}
          />
        </Link>
      ),
      key: "lbs",
    },
    {
      label: (
        <Link to="/add-new-listing">
          <SimpleParagraph
            paragraph="ADD NEW LISTINGS"
            size="18"
            bold
            //   css={style.letterSpacing}
          />
        </Link>
      ),
      key: "new listings",
    },
    (isLoggedIn || auth) && {
      label: (
        <Link to="/admin-profile">
          <SimpleParagraph paragraph="PROFILE" size="18" bold />
        </Link>
      ),
      key: "profile",
    },
    (isLoggedIn || auth) && {
      label: (
        <Link to="/admin-requests">
          <SimpleParagraph paragraph="ADMIN REQUESTS" size="18" bold />
        </Link>
      ),
      key: "admin requests",
    },
    (isLoggedIn || auth) && {
      label: (
        <Link to="/admin-adminListing">
          <SimpleParagraph paragraph="All Listing" size="18" bold />
        </Link>
      ),
      key: "admin listing",
    },
  ];

  return (
    <Menu
      selectable={false}
      mode='inline'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: "100%",
        padding: "2rem 0rem",
      }}
      items={items}
    />
  );
};

export default Inlinenavbar;
