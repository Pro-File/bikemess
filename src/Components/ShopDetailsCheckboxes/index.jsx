import { Checkbox, Col, Row } from "antd";
import React from "react";

const ShopDetailsCheckboxes = ({ checkboxes, ...props }) => {
  return (
    <Checkbox.Group {...props}>
      <Row gutter={[16, 8]} style={{ display: "flex", flexDirection: "row" }}>
        {checkboxes?.map((info) => {
          return (
            <Col className='checkbox-options'>
              <Checkbox value={info.id} key={info?.id}>
                {info?.name}
              </Checkbox>
            </Col>
          );
        })}
      </Row>
    </Checkbox.Group>
  );
};
export default ShopDetailsCheckboxes;
