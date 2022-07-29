import React, { useState } from "react";
import { Form, Button, Space, Input, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Selector } from "../common/Forms/Select";
import styles from "./index.module.less";
import { checkURL } from "../../Functions";

export const AddSocialFormList = ({ buttonText, children, name }) => {
  const [userEmailIndex, setUserEmailIndex] = useState(0);

  const socialMedia = [
    {
      key: 1,
      name: "Facebook",
      value: "facebook",
    },
    {
      key: 2,
      name: "Instagram",
      value: "instagram",
    },
    {
      key: 3,
      name: "Twitter",
      value: "twitter",
    },
    {
      key: 3,
      name: "Youtube",
      value: "youtube",
    },
  ];
  const [projectState, setProjectState] = useState("");
  const handleChange = (e) => {
    setProjectState(e);
  };

  return (
    <Form.List name='socialForm' initialValue={[""]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <Space
              key={field.key}
              align='baseline'
              className={styles.listField}
            >
              <Row gutter={[8, 8]}>
                <Col lg={8}>
                  <Selector
                    handleChange={handleChange}
                    name={[field.name, "platform"]}
                    options={socialMedia}
                    placeholder='Select'
                    optionName='name'
                    optionKey='value'
                    validationKey='requiredPlatform'
                  />
                </Col>
                <Col lg={16}>
                  <Form.Item
                    name={[field.name, "url"]}
                    validateTrigger='onBlur'
                    rules={[
                      {
                        validator: (_, value) =>
                          checkURL(value)
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Please enter valid url")
                              ),
                      },
                    ]}
                  >
                    <Input placeholder='Enter URL' type='text' />
                  </Form.Item>
                </Col>
              </Row>

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
                  Add
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
