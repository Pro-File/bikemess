import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import "./CategoriesPage.less";
import Spinner from "../../Components/Spinner/Spinner";
import { useWindowWidth } from "@react-hook/window-size";
import { SimpleButton } from "../../Components/common/Buttons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CustomDrawer from "../../Components/CustomDrawer";
import GoogleMaps from "../../Components/GoogleMaps/GoogleMaps";
import AutoComplete from "../../Components/GoogleMaps/AutoComplete";
import { removeTodoList } from "../../Redux/Slices/ListingSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeBanner } from "../../Redux/Slices/NotificationBannerSlice";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";
import {
  addSearchingKeyword,
  removeBrandKeyword,
  removeSearchingKeyword,
} from "../../Redux/Slices/AllListing";
import {
  addCategoryKeyword,
  removeCategoryKeyword,
} from "../../Redux/Slices/DynamicCategories";
import { Form } from "antd";

export default function CategoriesPage() {
  const isMobile = useWindowWidth() > 768;
  const [address, setAddress] = useState({
    address: "",
    lat: 24.8607,
    lng: 67.0011,
    center: { lat: 24.8607, lng: 67.0011 },
  });
  const drawerWidth = isMobile ? 50 : 100;
  const list = useSelector((state) => state.list);
  const allListItem = useSelector((state) => state.allListing.list);
  const [searchFlag, setSearchFlag] = useState(false);
  const [flag, setFlag] = useState(true);

  const searchedBrandName = useSelector(
    (state) => state.allListing.searchedKeyword
  );
  const selectedBrandName = useSelector(
    (state) => state.allListing.brandKeyword
  );
  const [open, setOpen] = useState(true);
  let { cat } = useParams();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchedBrandName);
  const [data, setData] = useState([]);
  const [deatilState, setDeatilState] = useState(null);
  const [regionState, setRegionState] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setselectedEndTime] = useState(null);
  const [form] = Form.useForm();
  const [selectorForm] = Form.useForm();
  const selectedCategory = useSelector(
    (state) => state.selectedCategory.selectedCategory
  );
  const [categoryState, setCategoryState] = useState(cat || null);
  const loc = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cat) {
      setCategoryState(cat);
    }
  }, [cat]);

  useEffect(() => {
    getData();
  }, [
    list,
    allListItem,
    searchFlag,
    deatilState,
    regionState,
    categoryState,
    selectedStartTime,
    selectedEndTime,
    cat,
  ]);

  useEffect(() => {
    return () => {
      dispatch(removeTodoList());
      dispatch(removeSearchingKeyword());
      dispatch(removeBrandKeyword());

      dispatch(
        removeBanner({
          description:
            "Do you know any LBS that sells this brand but not listed here?",
          message: "Help your friends in your community to discover the LBS!",
          bgColor: "#F9EDFF",
        })
      );
    };
  }, []);

  const handleCategory = (e) => {
    setCategoryState(e);
    dispatch(removeSearchingKeyword());
    dispatch(removeBrandKeyword());

    form.setFieldsValue({
      subscribe: "",
    });
  };

  const handleDetails = (e) => {
    setDeatilState(e);
    dispatch(removeSearchingKeyword());
    dispatch(removeBrandKeyword());

    form.setFieldsValue({
      subscribe: "",
    });
  };
  const handleRegion = (e) => {
    setRegionState(e);
    dispatch(removeSearchingKeyword());
    dispatch(removeBrandKeyword());

    form.setFieldsValue({
      subscribe: "",
    });
  };

  const removeFilters = () => {
    setCategoryState(null);
    setDeatilState(null);
    setRegionState(null);
    setSelectedStartTime(null);
    setselectedEndTime(null);
    selectorForm.resetFields();
  };

  useEffect(() => {
    return () => {
      dispatch(removeCategoryKeyword());
      setFlag(true);
    };
  }, []);

  const checkTimeValidation = (
    startTime,
    endTime,
    selectedStartTime,
    selectedEndTime,
    item
  ) => {
    var format = "HH:mm";
    var initialTime = moment(selectedStartTime, format),
      finalTime = moment(selectedEndTime, format),
      beforeTime = moment(startTime, format),
      afterTime = moment(endTime, format);

    if (beforeTime.isBefore(finalTime) && afterTime.isAfter(initialTime)) {
      return item;
    }
  };

  function onChange(time, timeString) {
    dispatch(removeSearchingKeyword());
    dispatch(removeBrandKeyword());

    if (time) {
      setSelectedStartTime(moment(time[0]).format("HH:mm"));
      setselectedEndTime(moment(time[1]).format("HH:mm"));
    } else {
      setSelectedStartTime(undefined);
      setselectedEndTime(undefined);
    }
  }

  const getData = async () => {
    var filteredList = getFilteredData();
    list?.length > 0 ? setData([...list]) : setData([...filteredList]);
    allListItem.length > 0 &&
      setAddress({
        center: {
          lat: allListItem[Math.floor(Math.random() * (allListItem.length - 1))]
            .lat,
          lng: allListItem[Math.floor(Math.random() * (allListItem.length - 1))]
            .lng,
        },
      });
  };

  const getFilteredData = () => {
    if (searchedBrandName) {
      let brandList = [];
      allListItem.forEach((item) => {
        if (
          item.shopName.toLowerCase().includes(searchedBrandName.toLowerCase())
        ) {
          brandList.push(item);
        } else {
          item.brands.forEach((brand) => {
            if (brand.toLowerCase().includes(searchedBrandName.toLowerCase())) {
              brandList.push(item);
            }
          });
        }
      });
      return brandList;
    }
    if (selectedBrandName) {
      let brandList = [];
      allListItem.forEach((item) => {
        item.brands.forEach((brand) => {
          if (brand.toLowerCase() === selectedBrandName.toLowerCase()) {
            brandList.push(item);
          }
        });
      });
      return brandList;
    }
    if (
      categoryState ||
      deatilState ||
      regionState ||
      (selectedStartTime && selectedEndTime)
    ) {
      const filteredData = allListItem
        .filter((item) => {
          if (categoryState) {
            return item.category.includes(categoryState);
          }
          return true;
        })
        .filter((item) => {
          if (deatilState) {
            return item.shops.includes(deatilState);
          }
          return true;
        })
        .filter((item) => {
          if (regionState) {
            return item.region === regionState;
          }
          return true;
        })
        .filter((item) => {
          if (selectedStartTime && selectedEndTime) {
            return checkTimeValidation(
              item.startTime,
              item.endTime,
              selectedStartTime,
              selectedEndTime,
              item
            );
          }
          return true;
        });
      return filteredData;
    }
    if (loc.pathname === "/categories-retail") {
      const sortedAlphabeticallyList = allListItem
        .slice()
        .sort(function (a, b) {
          return a.shopName.localeCompare(b.shopName);
        });

      setFlag(false);
      return sortedAlphabeticallyList;
    } else {
      return allListItem;
    }
  };

  const onSearch = () => {
    dispatch(addSearchingKeyword(search));
    setSearchFlag(!searchFlag);
  };

  const onClear = (form) => {
    dispatch(removeSearchingKeyword());
    dispatch(removeBrandKeyword());
    form.setFieldsValue({
      subscribe: "",
    });
    setSearchFlag(!searchFlag);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const HandleTypedAddress = (address) => {
    // console.log(address);
  };

  const setLatLang = ({ lat, lng }) => {
    setAddress({
      ...address,
      center: { lat, lng },
      lat,
      lng,
    });
    // this._generateAddress()
  };

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}%`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        ...(!isMobile &&
          open && {
            display: "none",
          }),
        marginLeft: 0,
      }),
    })
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomDrawer
        open={open}
        drawerWidth={drawerWidth}
        data={data}
        isMobile={isMobile}
        search={search}
        // searchedKeyword={searchedKeyword}
        setSearch={setSearch}
        onSearch={onSearch}
        onClear={onClear}
        handleDrawerClose={handleDrawerClose}
        handleRegion={handleRegion}
        regionState={regionState}
        handleCategory={handleCategory}
        categoryState={categoryState}
        handleDetails={handleDetails}
        deatilState={deatilState}
        onChange={onChange}
        removeFilters={removeFilters}
        form={form}
        selectorForm={selectorForm}
      />
      <Main open={open} className='custom-main'>
        <div className='button-overhead'>
          {!open ? (
            <SimpleButton
              type='primary'
              size='small'
              shape='round'
              text='SHOW DIRECTORY LISTING'
              onClick={handleDrawerOpen}
            />
          ) : (
            <SimpleButton
              type='primary'
              size='small'
              shape='round'
              text=' '
              icon={<ArrowLeftOutlined />}
              onClick={handleDrawerClose}
            />
          )}
        </div>
        <div>
          <AutoComplete
            HandleTypedAddress={HandleTypedAddress}
            setLatLang={setLatLang}
          />
        </div>
        <div>
          {loading ? (
            <div
              style={{
                width: "100%",
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner height={100} width={100} type='LineWave' />
            </div>
          ) : (
            <GoogleMaps center={address.center} data={data} />
          )}
        </div>
      </Main>
    </Box>
  );
}
