import React from "react";
import { Layout } from "antd";
import style from "./index.module.less";
import LayoutHeader from "./Header";
import { useWindowWidth } from "@react-hook/window-size";
import LayoutFooter from "./Footer";
const { Header, Sider, Content, Footer } = Layout;

const LayoutWrapper = ({ children }) => {
  const isMobile = useWindowWidth() > 1150;
  const pageName = window.location.pathname.replace(/\//g, "");

  return (
    <div>
      <Layout>
        <Header className={style.header}>
          <LayoutHeader />
        </Header>
        <Content>{children}</Content>
        {(pageName ==="" || pageName === "add-new-listing")&& (
          <Footer className={style.footer}>
            <LayoutFooter />
          </Footer>
        )}
      </Layout>
    </div>
  );
};

export default LayoutWrapper;
