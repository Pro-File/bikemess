import { Breadcrumb } from "antd";
import React from "react";

const index = ({ link, pageName }) => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={link} style={{ color: "#BA3BFA" }}>
            {pageName}
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default index;
