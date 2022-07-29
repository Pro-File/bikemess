import React, { useState } from "react";
import { Col, Row } from "antd";
import { Selector } from "../Forms/Select";
import { TextBox } from "../Forms/TextBox";

const AddBrands = () => {
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col lg={24} md={24} sm={24} xs={24}>
          <TextBox
            type='text'
            name='brand'
            placeholder='OFFICIAL BRAND'
            validationKey='brand'
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddBrands;
