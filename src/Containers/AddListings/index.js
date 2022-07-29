import { Row, Col, Form, Divider, Checkbox, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { SimpleButton } from "../../Components/common/Buttons";
import BreadCrumb from "../../Components/common/BreadCrumb";
import { SimpleHeading } from "../../Components/common/Heading";
import UploadImage from "../../Components/common/UploadImage";
import { TextBox } from "../../Components/common/Forms/TextBox";
import { SimpleParagraph } from "../../Components/common/Paragraph";
import Timepicker from "../../Components/common/TimePicker";
import { FormList } from "../../Components/common/FormList";
import History from "../../Components/History/History";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { categoryOptions, shopOptions, regionOptions } from "./constants";
import { AddSocialFormList } from "../../Components/AddSocialFormList";
import { global } from "../../Functions/index";
import { db } from "../../Services/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import MapModal from "../../Components/GoogleMaps/MapModal";
import moment from "moment";
import { addToList } from "../../Redux/Slices/ListingSlice";
import { addBanner } from "../../Redux/Slices/NotificationBannerSlice";
import { Selector } from "../../Components/common/Forms/Select";
import {
  clearGlobalMapAddress,
  setGlobalMapAddress,
} from "../../Redux/Slices/MapSlice";

const AddListings = ({ id, filteredData, isEdit }) => {
  const mapAddress = useSelector((state) => state.map);
  const allListItem = useSelector((state) => state.allListing.list);
  const [region, setRegion] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [buttonLoading, setbuttonloading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    form.setFieldsValue({
      address: mapAddress?.address || filteredData?.address,
    });
  }, [mapAddress]);
  useEffect(() => {
    return () => {
      dispatch(clearGlobalMapAddress());
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    setRegion(e);
  };
  const goHome = () => {
    filteredData ? history.push("/admin-adminListing") : history.push("/");
  };
  const onChange = (checkedValues) => {};
  const handleClose = () => {
    setOpen(false);
  };
  const onFinishFailed = () => {
    console.log("Error!");
  };

  const addList = async (data) => {
    const res = await db()
      .collection("list")
      .add(data)
      .then(() => {
        const newData = {
          ...data,
          isNew: true,
        };
        message.success("List added Successfully!");
        dispatch(addToList(newData));
        dispatch(
          addBanner({
            description: "Your listing has been published successfuly!",
            message: " Thank you for your contribution!",
            bgColor: "#E9FFCD",
          })
        );
        history.push("/categories");
      });
  };

  const updateList = async (data) => {
    const res = await db()
      .collection("list")
      .doc(id)
      .update(data)
      .then(() => {
        message.success("List updated Successfully!");

        history.push("/admin-adminListing");
      });
  };
  const onFinish = async (values) => {
    console.log("on finish", values);
    setbuttonloading(true);
    let imageUrl = "";
    try {
      if (values.logo.fileList) {
        const imageFile = values.logo.fileList[0].originFileObj;
        imageUrl = await global.uploadImage({
          id: imageFile.uid,
          file: imageFile,
        });
      } else {
        imageUrl = values.logo;
      }

      const data = {
        ...values,
        logo: imageUrl,
        ...mapAddress,
        email: values.email || "",
        phoneNumber: values.phoneNumber || "",
        website: values.website || "",
        startTime: moment(values.startTime).format("HH:mm"),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        endTime: moment(values.endTime).format("HH:mm"),
        isDeleted: false,
        isUpdated: filteredData ? true : false,
        createdAt: new Date().toLocaleDateString(),
      };

      if (filteredData) {
        updateList(data);
      } else {
        console.log("add data");

        addList(data);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setbuttonloading(false);
    }
  };
  return (
    <Form
      scrollToFirstError={true}
      form={form}
      layout='vertical'
      autoComplete='off'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={filteredData}
    >
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
            <BreadCrumb pageName='Add new Listings' />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Divider
              orientation='left'
              orientationMargin='0'
              style={{ borderTopColor: "#000000" }}
            >
              <SimpleHeading
                heading='LISTINGS / SHOP DETAILS '
                size='14'
                cssClass={style.fontFamily}
              />
            </Divider>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <div className={style.checkBoxWrapper}>
              <Form.Item
                name='shops'
                valuePropName='checked'
                rules={[
                  {
                    required: true,
                    message: "Please select atleast one shop details",
                  },
                ]}
              >
                <Checkbox.Group
                  defaultValue={filteredData?.shops}
                  options={shopOptions}
                  onChange={onChange}
                />
              </Form.Item>
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <UploadImage imgName='logo' imgUrl={filteredData?.logo} />
          </Col>
        </Row>
        <Row gutter={[8, 8]} className={style.wrap}>
          <Col lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label='LISTING/SHOP NAME'
              name='shopName'
              validateTrigger='onBlur'
              rules={[
                {
                  type: "text",
                  message: "Please input shop name",
                },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (!value || value === "") {
                      return Promise.reject(
                        new Error("Please input shop name")
                      );
                    }

                    if (value && !isEdit) {
                      const validate = allListItem?.find((listing) => {
                        if (
                          listing.shopName.toLowerCase() === value.toLowerCase()
                        ) {
                          return true;
                        }
                        return false;
                      });
                      if (validate) {
                        return Promise.reject(
                          new Error("This shop name already exists in listing")
                        );
                      }
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input placeholder='ENTER LISTING/SHOP NAME' type='text' />
            </Form.Item>
          </Col>
          <Col lg={4} md={24} sm={24} xs={24}>
            <Selector
              handleChange={handleChange}
              name='region'
              options={regionOptions}
              placeholder='Select'
              optionName='label'
              optionKey='value'
              validationKey='forRegion'
              cssClass={style.seletorWrapper}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <SimpleParagraph
              paragraph='LISTING/SHOP/BUSINESS CATEGORY:'
              size='14'
            />
            <SimpleParagraph
              paragraph='(You may select more than 1)'
              size='14'
            />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <div>
              <div className={style.checkBoxWrap}>
                <Form.Item
                  name='category'
                  valuePropName='checked'
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Please select atleast one category",
                    },
                  ]}
                >
                  <Checkbox.Group
                    options={categoryOptions}
                    onChange={onChange}
                    defaultValue={filteredData?.category}
                  />
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col lg={8} md={12} sm={12} xs={24}>
            <TextBox
              type='text'
              name='shopAddress'
              placeholder='ENTER ADDRESS (BLOCK/STREET/NAME/UNIT/CITY)'
              label='ADDRESS'
              validationKey='shopAddress'
            />
          </Col>
          <Col lg={4} md={12} sm={12} xs={24}>
            <TextBox
              type='text'
              name='postal'
              placeholder='ENTER ZIP CODE'
              label='POSTAL'
              validationKey='postal'
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col lg={8} md={12} sm={12} xs={24}>
            <TextBox
              type='text'
              name='address'
              placeholder='PIN MAP LOCATION'
              disabled={true}
              value={mapAddress?.address}
              label='“MAP PIN” FOR US TO LOCATE YOUR SHOP ON THE MAP'
              validationKey='address'
            />
          </Col>
          <Col lg={4} md={12} sm={12} xs={24} style={{ marginTop: "30px" }}>
            <MapModal
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col lg={4} md={8} sm={8} xs={24}>
            <TextBox
              type='text'
              name='website'
              placeholder='ENTER WEBSITE URL'
              label='WEBSITE'
              validationKey='notCompulsory'
            />
          </Col>
          <Col lg={4} md={8} sm={8} xs={24}>
            <TextBox
              type='text'
              name='phoneNumber'
              placeholder='ENTER PHONE NUMBER'
              label='PHONE NUMBER'
              validationKey='notCompulsory'
            />
          </Col>
          <Col lg={4} md={8} sm={8} xs={24}>
            <TextBox
              type='text'
              name='email'
              placeholder='ENTER EMAIL ADDRESS'
              label='EMAIL ADDRESS'
              validationKey='notCompulsory'
              value=''
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col lg={4} md={8} sm={12} xs={12}>
            <Timepicker
              name='startTime'
              placeholder='Select Start Time'
              label='Start Time'
            />
          </Col>
          <Col lg={4} md={8} sm={12} xs={12}>
            <Timepicker
              name='endTime'
              placeholder='Select End Time'
              label='End Time'
            />
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Divider
              orientation='left'
              orientationMargin='0'
              style={{ borderTopColor: "#000000" }}
            >
              <SimpleHeading
                heading='SOCIAL MEDIA'
                size='14'
                cssClass={style.fontFamily}
              />
            </Divider>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <SimpleParagraph paragraph='PLATFORM' size='14' />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <AddSocialFormList />
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24} xs={24}>
            <Divider
              orientation='left'
              orientationMargin='0'
              style={{ borderTopColor: "#000000" }}
            >
              <SimpleHeading
                heading='BRANDS THAT YOU SELL'
                size='14'
                cssClass={style.fontFamily}
              />
            </Divider>
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <SimpleParagraph paragraph='BRAND NAME' size='14' />
          </Col>
          <Col lg={24} md={24} sm={24} xs={24}>
            <FormList
              name='brands'
              buttonText='ADD'
              children={<Input placeholder='OFFICIAL BRAND' type='text' />}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={6} sm={6} xs={8}>
            <SimpleButton
              type='primary'
              size='small'
              shape='round'
              text={filteredData ? "Save Changes" : "submit"}
              hType='submit'
              loading={buttonLoading}
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default AddListings;
