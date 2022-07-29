import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Col, Form, Image, Row } from "antd";
import React, { useState } from "react";
import { SimpleHeading } from "../../Components/common/Heading";
import coverImage from "../../Assests/coverImage.png";
import Arrow from "../../Assests/arrow.png";
import style from "./index.module.less";
import { SimpleParagraph } from "../../Components/common/Paragraph";
import { TextBox } from "../../Components/common/Forms/TextBox";
import { OutlineButton, RoundButton } from "../../Components/common/Buttons";
import BrandsImage from "../../Assests/brands.png";
import CommunityImage from "../../Assests/community.png";
import ContentImage from "../../Assests/content.png";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import { addSearchingKeyword } from "../../Redux/Slices/AllListing";
import { useDispatch } from "react-redux";

const LandingPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const onSearch = () => {
    dispatch(addSearchingKeyword(search));
    history.push("/categories");
  };
  const redirectTolisting = () => {
    history.push("/add-new-listing");
  };

  return (
    <div className={style.pageWrapper}>
      <Row className={style.sectionOneWrapper}>
        <Col lg={10} md={24} className={style.sectionOneContent}>
          <div>
            <SimpleHeading
              heading='WE’LL SHOW YOU WHERE TO START LOOKING'
              size='24'
              margin='15px 0px'
            />
            <SimpleHeading
              heading='SEARCH BY THE BRANDS YOU’RE LOOKING FOR AND WE’LL SHOW WHO SELLS THEM.'
              size='16'
              margin='15px 0px'
              cssClass={style.fontFamily}
            />
          </div>
          <div className={style.gap}>
            <SimpleParagraph paragraph='What are you looking for ?' size='14' />
            <Row gutter={[8, 8]}>
              <Col lg={20} md={20} sm={20} xs={20}>
                <TextBox
                  name='subscribe'
                  id='subscribe'
                  placeholder='Search for brand, name etc'
                  type='search'
                  change={(value) => {
                    setSearch(value.target.value);
                  }}
                  value={search}
                />
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}>
                <RoundButton
                  type='primary'
                  icon={Arrow}
                  onClick={() => onSearch()}
                />
              </Col>
            </Row>
          </div>
          <div className={style.gap}>
            <SimpleParagraph
              paragraph='SCROLL DOWN TO LEARN'
              size='14'
              bold
              css={style.textColor}
            />
            <SimpleParagraph
              paragraph='MORE ABOUT BIKEMESS'
              size='14'
              bold
              css={style.textColor}
            />
          </div>
        </Col>
        <Col lg={14} md={24} className={style.imageWrapper}>
          <Image src={coverImage} preview={false} alt='Bikemess' />
        </Col>
      </Row>

      <Row className={style.sectionTwoWrapper}>
        <Col lg={24} md={24} sm={24} className={style.flex}>
          <SimpleHeading
            heading='WHAT IS BIKEMESS ALL ABOUT?'
            size='24'
            margin='15px 0px 35px 0px'
          />
        </Col>
        <Col
          sm={24}
          md={24}
          lg={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={BrandsImage} preview={false} alt='Bikemess' />
        </Col>

        <Col lg={12} md={24}>
          <SimpleHeading
            heading='FIND THE SHOP THAT SELLS THE BRANDS THAT YOU ARE LOOKING FOR.'
            size='24'
            margin='25px 0px'
          />
          <SimpleParagraph
            paragraph='Search by brands, region, keywords or your favourite bike shop. we’re making it easy for you to know where to start looking'
            size='14'
            bold
            margin='25px 0px'
          />

          <OutlineButton
            text='START YOUR SEARCH'
            size='large'
            icon={<ArrowRightOutlined />}
            cssClass={style.addListingBtn}
            onClick={() => document.getElementById("subscribe").focus()}
          />
        </Col>
      </Row>

      <Row className={style.sectionTwoWrapper}>
        <Col
          lg={{ span: 12, order: 1 }}
          md={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
        >
          <SimpleHeading
            heading='ACTIVE COMMUNITY INVOLVEMENT TO HELP YOU FIND THE SHOP YOU’RE LOOKING FOR.'
            size='24'
            margin='25px 0px'
          />
          <SimpleParagraph
            paragraph='Help others as how they’ve helped you. Add new directory listing to aide others or even add your own service listings to make your services or shop known to the community.
            '
            size='14'
            bold
            margin='25px 0px'
          />

          <OutlineButton
            text='ADD NEW LISTING'
            size='large'
            icon={<ArrowRightOutlined />}
            cssClass={style.addListingBtn}
            onClick={redirectTolisting}
          />
        </Col>
        <Col
          lg={{ span: 12, order: 2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          md={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
        >
          <Image src={CommunityImage} preview={false} alt='Bikemess' />
        </Col>
      </Row>

      <Row className={style.sectionTwoWrapper}>
        <Col
          sm={24}
          md={24}
          lg={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={ContentImage} preview={false} alt='Bikemess' />
        </Col>

        <Col lg={12} md={24}>
          <SimpleHeading
            heading='WE’LL SHOW YOU WHERE AND YOU’LL JUST SHOP TO YOUR HEART’S CONTENT.'
            size='24'
            margin='25px 0px'
          />
          <SimpleParagraph
            paragraph='Be informed of the items that the shop sells and shop with a peace of mind. Connect with shop through FB, Insta and Twitter.'
            size='14'
            bold
            margin='25px 0px'
          />

          <OutlineButton
            text='SEARCH BY RETAIL'
            size='large'
            icon={<ArrowRightOutlined />}
            cssClass={style.addListingBtn}
            onClick={() => history.push("/categories")}
          />
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
