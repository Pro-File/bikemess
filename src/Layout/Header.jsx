import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import Logo from "../Assests/logo.png";
import { useWindowWidth } from "@react-hook/window-size";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import style from "./index.module.less";
import MenuItem from "../Components/common/MenuItem";
import Sidebar from "../Components/common/Sidebar";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const isMobile = useWindowWidth() > 1150;
  const isSmallScreen = useWindowWidth() < 600;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth);
  const auth = localStorage.getItem("admin");
  const dispatch = useDispatch();
  let history = useHistory();

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    closeModal();
    // dispatch(logout());
    history.push("/");
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const redirectToAddListing = () => {
    history.push("/add-new-listing");
  };
  return (
    <div>
      <Row>
        <Col lg={6} md={6} sm={6} xs={6}>
          <Link to="/">
            <Image
              src={Logo}
              preview={false}
              width={isSmallScreen ? 150 : 180}
              alt="Bikemess"
            />
          </Link>
        </Col>
        {isMobile ? (
          <Col lg={18}>
            <div
              style={{
                display: "flex",
                margin: "0rem 1rem",
                justifyContent: "flex-end",
              }}
            >
              <MenuItem />
            </div>
          </Col>
        ) : (
          <Col md={18} lg={18} sm={18} xs={18} style={{ textAlign: "right" }}>
            {isLoggedIn || auth ? (
              <LogoutOutlined
                className={style.logoutIcon}
                onClick={() => showModal()}
              />
            ) : null}
            <UnorderedListOutlined onClick={showDrawer} />
            <Sidebar visible={visible} setVisible={setVisible} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Header;
