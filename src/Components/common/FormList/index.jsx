import React, { useState } from "react";
import { Form, Button, Space, Input, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Selector } from "../Forms/Select";
import styles from "./index.module.less";

export const FormList = ({ buttonText, children, name }) => {
  const [userEmailIndex, setUserEmailIndex] = useState(0);

  return (
    <Form.List name={name} initialValue={[""]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Space
              key={field.key}
              align='baseline'
              className={styles.listField}
            >
              <div style={{ width: "100%" }}>
                <Form.Item
                  name={field.name}
                  validateTrigger='onBlur'
                  rules={[
                    {
                      required: true,
                      message: "Please enter brand name",
                    },
                  ]}
                >
                  {children}
                </Form.Item>
              </div>

              {index > 0 && (
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              )}
            </Space>
          ))}

          <Form.Item>
            <Row>
              <Col lg={3} md={6} sm={6} xs={8}>
                <Button
                  size='large'
                  type='primary'
                  onClick={() => {
                    add();
                    setUserEmailIndex(userEmailIndex + 1);
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  {buttonText}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
