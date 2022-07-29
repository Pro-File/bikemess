import { Col, Divider, Empty, Row } from "antd";
import React, { useEffect, useState } from "react";
import { SimpleButton } from "../../Components/common/Buttons";
import BreadCrumb from "../../Components/common/BreadCrumb";
import { useSelector } from "react-redux";
import style from "./index.module.less";
import { SimpleHeading } from "../../Components/common/Heading";
import BrandListComponent from "../../Components/BrandListComponent";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { AlphabetArray } from "./constants";

const Brands = () => {
  let history = useHistory();
  const allListItem = useSelector((state) => state.allListing.list);
  const [brandList, setBrandList] = useState([]);
  const [alphabet, setAlphabet] = useState("a");

  const setListing = async () => {
    let temp = [];
    await allListItem.map((item) => {
      item.brands.some((brand) => {
        temp.push(brand.toLowerCase());
      });
    });
    const counts = {};
    temp.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    var objs = await Object.entries(counts).map((x) => ({
      name: x[0],
      count: x[1],
    }));
    const filteredData = objs.filter((item) => {
      if (alphabet) {
        return item.name.startsWith(alphabet.toLowerCase());
      }
      return true;
    });
    setBrandList([...filteredData]);
  };

  useEffect(() => {
    setListing();
  }, [allListItem, alphabet]);

  const filterList = (val) => {
    setAlphabet(val.toLowerCase());
  };

  const goHome = () => {
    history.push("/");
  };

  return (
    <div className={style.pageWrapper}>
      <Row>
        <Col lg={3} md={6} sm={6} xs={8}>
          <SimpleButton
            type='primary'
            size='small'
            shape='round'
            text='Back'
            icon={<ArrowLeftOutlined />}
            onClick={goHome}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col lg={24} md={24} sm={24} xs={24}>
          <BreadCrumb pageName='Browse by Brands' />
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Divider
            orientation='left'
            orientationMargin='0'
            style={{ borderTopColor: "#000000" }}
          >
            <SimpleHeading
              heading='BROWSE BY ALL BRANDS'
              size='14'
              cssClass={style.fontFamily}
            />
          </Divider>
        </Col>
      </Row>
      <Row>
        {AlphabetArray.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item.key.toLowerCase() === alphabet
                  ? style.bold
                  : style.alphabetWrapper
              }
              onClick={() => filterList(item.value)}
            >
              {item.key}
            </div>
          );
        })}
      </Row>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          {brandList.length > 0 ? (
            brandList?.map((item, index) => (
              <div key={index}>
                <BrandListComponent
                  retailerName={item.name}
                  retailers={item.count}
                />
              </div>
            ))
          ) : (
            <Empty />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Brands;
