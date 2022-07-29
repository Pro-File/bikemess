import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import style from "./index.module.less";
import NotificationBanner from "../NotificationBanner";
import { Divider, Form } from "antd";
import List from "../List";
import NoResultsFound from "../NoResultsFound/NoResultsFound";
import Filter from "../Filters/Filter";
import { SimpleButton } from "../common/Buttons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Search from "../Search";

const CustomDrawer = ({
  drawerWidth,
  open,
  setData,
  data,
  isMobile,
  handleDrawerClose,
  search,
  onClear,
  setSearch,
  onSearch,
  searchedKeyword,
  deatilState,
  removeFilters,
  categoryState,
  onChange,
  regionState,
  handleRegion,
  handleCategory,
  handleDetails,
  form,
  selectorForm,
}) => {
  const banner = useSelector((state) => state.banner);
  const [notificationContent, setNotificationContent] = useState({
    description:
      " Do you know any LBS that sells this brand but not listed here?",
    message: " Help your friends in your community to discover the LBS!",
    bgColor: "#F9EDFF",
  });

  useEffect(() => {
    banner && setNotificationContent(banner);
  }, [banner]);

  return (
    <Drawer
      sx={{
        width: `${drawerWidth}%`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}%`,
          boxSizing: "border-box",
          zIndex: 0,
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
      PaperProps={{
        style: { height: "88vh", position: "absolute", top: "12%" },
      }}
    >
      {!isMobile && (
        <div className={style.showMapIconContainer}>
          <SimpleButton
            type='primary'
            size='small'
            shape='round'
            text=' '
            icon={<ArrowLeftOutlined />}
            onClick={handleDrawerClose}
          />
        </div>
      )}
      <NotificationBanner notificationData={notificationContent} />
      <div className={style.mainBanner}>
        {!data[0]?.isNew && (
          <Search
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
            onClear={onClear}
            form={form}
          />
        )}

        {!data[0]?.isNew && (
          <Filter
            searchedKeyword={searchedKeyword}
            onClear={onClear}
            deatilState={deatilState}
            removeFilters={removeFilters}
            categoryState={categoryState}
            onChange={onChange}
            regionState={regionState}
            handleRegion={handleRegion}
            handleCategory={handleCategory}
            handleDetails={handleDetails}
            selectorForm={selectorForm}
          />
        )}
        <Divider />
        {data.length > 0 ? <List data={data} /> : <NoResultsFound />}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
