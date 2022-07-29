import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import Logo from "../Assests/logo.png";
import { OutlineButton } from "../Components/common/Buttons";
import { useWindowWidth } from "@react-hook/window-size";
import { LogoutOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { SimpleParagraph } from "../Components/common/Paragraph";
import AntDrawer from "../Components/common/AntDrawer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import style from "./index.module.less";
import MenuItem from "../Components/common/MenuItem";
import Sidebar from "../Components/common/Sidebar";
import LogoutModal from "../Components/LogoutModal/LogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

const Header = () => {
  const isMobile = useWindowWidth() > 1150;
  const isSmallScreen = useWindowWidth() < 600;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth);
  const auth = localStorage.getItem("admin")
  const dispatch = useDispatch();
  let history = useHistory();
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    closeModal()
    dispatch(logout());
    history.push("/");
  }

  const showDrawer = () => {
    setVisible(true);
  };
  const redirectToAddListing = () => {
    history.push("/add-new-listing");
  };
  return (
    <div>
       <LogoutModal closeModal={closeModal} showModal={showModal} handleLogout={handleLogout} isModalVisible={isModalVisible}/>
      <Row>
        <Col lg={6} md={6} sm={6} xs={6}>
          <Link to='/'>
            <Image
              src={Logo}
              preview={false}
              width={isSmallScreen ? 180 : 220}
              alt='Bikemess'
            />
          </Link>
        </Col>
        {isMobile ? (
          <Col lg={18}>
            <div
              style={{
                display: "flex",
                margin: "0rem 1rem",
                justifyContent: "space-between",
              }}
            >
              <MenuItem />

              <div>
                <OutlineButton
                  text='ADD NEW RETAIL LISTINGS'
                  size='large'
                  cssClass={style.addListingBtn}
                  onClick={redirectToAddListing}
                />
              </div>
            </div>
          </Col>
        ) : (
          <Col md={18} lg={18} sm={18} xs={18} style={{ textAlign: "right" }}>
           {isLoggedIn || auth ? <LogoutOutlined className={style.logoutIcon} onClick={() => showModal()}/> : null}
            <UnorderedListOutlined onClick={showDrawer} />
            <Sidebar visible={visible} setVisible={setVisible} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Header;
