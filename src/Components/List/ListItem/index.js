import React, { useState } from "react";
import { Col, Divider, Form, Image, message, Row, Tag } from "antd";
import style from "./index.module.less";
import { Link, useHistory } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { SimpleParagraph } from "../../common/Paragraph";
import { SimpleHeading } from "../../common/Heading";
import moment from "moment";
import SmartText from "../../common/SmartText";
import Modal from "../../common/Modal";
import { TextBox } from "../../common/Forms/TextBox";
import { Selector } from "../../common/Forms/Select";
import { reqType } from "./constant";
import { Textarea } from "../../common/Forms/TextArea";
import { db } from "../../../Services/firebaseConfig";
import { useSelector } from "react-redux";

const ListItem = ({ item }) => {
  const searchedBrandName = useSelector(
    (state) => state.allListing?.searchedKeyword
  );
  const selectedRetailer = useSelector(
    (state) => state.allListing?.brandKeyword
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonLoader, setIsButtonLoader] = useState(false);

  const socialIcons = {
    facebook: <FacebookOutlined />,
    instagram: <InstagramOutlined />,
    youtube: <YoutubeOutlined />,
    twitter: <TwitterOutlined />,
  };

  const [form] = Form.useForm();
  const history = useHistory();

  const onFinishFailed = () => {
    console.log("Error!");
  };
  const onFinish = async (values) => {
    setIsButtonLoader(true);
    const data = {
      ...values,
      requestCreatedAt: Date.now(),
    };
    try {
      const res = await db()
        .collection("request")
        .add(data)
        .then(() => {
          message.success("Successfully request sent to admin!");
        });
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsButtonLoader(false);
      setIsModalVisible(false);
      form.resetFields();
    }
  };

  const handleChange = (e) => {};

  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={style.card}>
      <Form
        scrollToFirstError={true}
        form={form}
        layout='vertical'
        autoComplete='off'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Modal
          form={form}
          cssClass={style.modal}
          closable='false'
          body={
            <div>
              <Row gutter={[8, 8]}>
                <Col lg={24}>
                  <SimpleParagraph
                    paragraph='Please fill in the fields and we will send a request to the admin for the update.'
                    size='14'
                  />
                </Col>
                <Col lg={10}>
                  <Selector
                    label='REQUEST'
                    handleChange={handleChange}
                    name='requestType'
                    options={reqType}
                    placeholder='Select'
                    optionName='name'
                    optionKey='value'
                    validationKey='requestType'
                    className={style.textBoxWrapper}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 16]}>
                <Col lg={10}>
                  <TextBox
                    type='text'
                    name='listingName'
                    placeholder='ENTER LISTING NAME'
                    label='LISTING NAME'
                    validationKey='listingName'
                    value={item.shopName}
                  />
                </Col>
                <Col lg={24}>
                  <Textarea
                    name='description'
                    label='REQUEST DESCRIPTION'
                    placeholder='Add description here'
                    type='text'
                    maxLength={600}
                    className={style.notesBoxWrapper}
                  />
                </Col>
              </Row>
            </div>
          }
          width={600}
          visible={isModalVisible}
          handleOk={closeModal}
          handleCancel={closeModal}
          title={
            <SimpleHeading
              heading='REQESTING AN UPDATE'
              size='24'
              margin='0px 0px'
            />
          }
        />
      </Form>
      <Row>
        <Col lg={6}>
          <div className={style.imageSection}>
            <Image width={100} height={100} src={item.logo} />
          </div>
          <Link to={"/"}>
            <SimpleParagraph
              paragraph=' Missing or wrong information?'
              size={14}
              css={style.paraLink}
            />
          </Link>
        </Col>
        <Col lg={18}>
          <Row>
            <Col lg={12} md={24}>
              <SimpleHeading
                heading={item.shopName}
                size={18}
                weight={"bold"}
              />
              <SmartText
                title={"Tel:"}
                desc={item.phoneNumber}
                css={style.smartRow}
              />
              <SmartText
                title={"Email:"}
                desc={item.email}
                css={style.smartRow}
              />
              <SmartText
                title={"Web:"}
                desc={item.website}
                css={style.smartRow}
              />
              <SimpleParagraph
                paragraph={item.shopAddress}
                size={16}
                weight={"semi-bold"}
                css={style.address}
              />
            </Col>
            <Col lg={12} md={24}>
              <SmartText
                title={"Operating Hours:"}
                desc={`${moment(item.startTime, "HH:mm").format(
                  "hh:mm a"
                )} - ${moment(item.endTime, "HH:mm").format("hh:mm a")}`}
                css={style.smartRow1}
              />
              <div className={style.tagContainer}>
                {item.category.map((cat) => {
                  return (
                    <Tag className={style.customTag} color='#F9EDFF'>
                      {cat}
                    </Tag>
                  );
                })}
              </div>
              <div className={style.icons}>
                {item?.socialForm.map((social) => {
                  if (social.url && social.platform) {
                    return (
                      <a href={`//${social.url}`} target='_blank'>
                        <div className={style.iconContainer}>
                          {socialIcons[social.platform]}
                        </div>
                      </a>
                    );
                  }
                })}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={6}></Col>
        <Col lg={18}>
          <Divider className={style.divider} />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={8}>
          {/* If User then Show it Otherwise not */}

          <div onClick={showModal}>
            <SimpleParagraph
              paragraph='Update information?'
              size={14}
              css={style.updateInfo}
            />
          </div>
        </Col>
        <Col lg={18} md={16}>
          <SimpleHeading heading={"Brands:"} size={14} weight={"bold"} />
          {item.brands.map((brand) => {
            if (
              (searchedBrandName &&
                brand
                  .toLowerCase()
                  .includes(searchedBrandName.toLowerCase())) ||
              (selectedRetailer &&
                brand.toLowerCase().includes(selectedRetailer.toLowerCase()))
            ) {
              return (
                <span
                  className={`${style.brand} ${style.matchedBrand}`}
                >{`${brand}, `}</span>
              );
            }
            return <span className={style.brand}>{`${brand}, `}</span>;
          })}
        </Col>
      </Row>
      <Row className={style.extraDetailsContainer}>
        <Col lg={6}></Col>
        <Col lg={18}>
          {item.shops.map((info) => {
            return <span>{`${info} | `}</span>;
          })}
        </Col>
      </Row>
      <Divider className={style.divider} />
    </div>
  );
};

export default ListItem;
