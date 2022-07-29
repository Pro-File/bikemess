import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { Button } from "@mui/material";
import { Row, Col, TimePicker, Form } from "antd";
import { roles, category, type } from "./constants";
import moment from "moment";
import { CustomSelector } from "../CustomSelector";
import { RedoOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { removeCategoryKeyword } from "../../Redux/Slices/DynamicCategories";
import { removeSearchingKeyword } from "../../Redux/Slices/AllListing";

let res;
const Filter = ({
  searchedKeyword,
  onClear,
  form,
  deatilState,
  removeFilters,
  categoryState,
  onChange,
  regionState,
  handleRegion,
  handleCategory,
  handleDetails,
  selectorForm,
}) => {
  return (
    <Form form={selectorForm} layout='vertical' autoComplete='off'>
      <Row className={style.containerRow} gutter={[12, 0]}>
        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <CustomSelector
            name='region'
            optionName='name'
            optionKey='id'
            options={roles}
            value={regionState}
            placeholder='Region'
            handleChange={handleRegion}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <CustomSelector
            name='category'
            optionName='name'
            optionKey='id'
            options={category}
            value={categoryState}
            placeholder='Category'
            handleChange={handleCategory}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item name='timePicker'>
            <TimePicker.RangePicker
              className={style.timepicker}
              use12Hours
              format='h:mm A'
              onChange={onChange}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
          <CustomSelector
            name='details'
            optionName='name'
            optionKey='id'
            value={deatilState}
            options={type}
            placeholder='Type'
            handleChange={handleDetails}
          />
        </Col>
        <div>
          <Button
            variant='transparent'
            className={style.simple}
            onClick={() => removeFilters()}
          >
            <RedoOutlined /> <u className={style.redo}>remove filters</u>
          </Button>
        </div>
      </Row>
    </Form>
  );
};

export default Filter;
