import React from "react";
import Inlinenavbar from "../../Inlinenavbar";
import AntDrawer from "../AntDrawer";

const Sidebar = ({ visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <AntDrawer
        visible={visible}
        onClose={onClose}
        children={<Inlinenavbar />}
      />
    </div>
  );
};

export default Sidebar;
