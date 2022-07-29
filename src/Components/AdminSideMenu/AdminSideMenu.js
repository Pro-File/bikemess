import React, { useEffect, useState } from "react";
import { Menu, Row } from "antd";
import {
  UserOutlined,
  ScheduleOutlined,
  SettingOutlined,
  LockOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Slices/AuthSlice";
import LogoutModal from "../LogoutModal/LogoutModal";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashboard", "dashboard", <DashboardOutlined />),
  getItem("My Account", "profile", <UserOutlined />),
  getItem("My Requests", "requests", <ScheduleOutlined />),
  getItem("All Listing", "adminListing", <SettingOutlined />),
  getItem("Logout", "logout", <LockOutlined />),
];

const AdminSideMenu = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(
    location.pathname.split("-")[1]
  );

  useEffect(() => {
    setSelectedKey(location.pathname.split("-")[1]);
  });

  const onClick = (e) => {
    if (e.key === "logout") {
      showModal();
    } else {
      history.push(`/admin-${e.key}`);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <LogoutModal
        closeModal={closeModal}
        showModal={showModal}
        handleLogout={handleLogout}
        isModalVisible={isModalVisible}
      />
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
        }}
        defaultSelectedKeys={[selectedKey]}
        mode='inline'
        items={items}
      />
    </>
  );
};

export default AdminSideMenu;
