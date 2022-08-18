import { Col, Divider, Image, Row } from "antd";
import React, { useState } from "react";
import { RoundButton } from "../Components/common/Buttons";
import { TextBox } from "../Components/common/Forms/TextBox";
import Arrow from "../Assests/arrow.png";
import { SimpleParagraph } from "../Components/common/Paragraph";
import Facebook from "../Assests/Facebook.png";
import Instagram from "../Assests/Instagram.png";
import Twitter from "../Assests/Twitter.png";

import style from "./index.module.less";
import { Link } from "react-router-dom";

const Footer = () => {
  const [search, setSearch] = useState("");
  const searchUser = (value) => {};
  return (
    <div>
      <Row className={style.footerWrapper}>
        <Col lg={12} md={12}>
          <Row>
            <Col lg={24}>
              <div className={style.footerTextWrapper}>
                <div>
                  <Link to="/categories">
                    <SimpleParagraph
                      paragraph="SEARCH BY CATEGORIES"
                      size="14"
                      bold
                      css={style.footerText}
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/categories">
                    <SimpleParagraph
                      paragraph="SEARCH ALPHABETICALLY"
                      size="14"
                      bold
                      css={style.footerText}
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={12}>
          <Row gutter={[8, 8]} className={style.rightSectionWrapper}>
            <Col className={style.rightSection}>
              <div className={style.iconWrapper}>
                <a href={`//www.facebook.com`} target="_blank">
                  <Image
                    src={Facebook}
                    preview={false}
                    width={48}
                    alt="Facebook"
                  />
                </a>
              </div>
            </Col>
          </Row>
          <Row className={style.footerSection}>
            <Col>
              <div className={style.footerTextWrapper}>
                <div>
                  <SimpleParagraph
                    paragraph="TERMS AND CONDITION"
                    size="14"
                    bold
                    css={style.footerText}
                  />
                </div>
                <div>
                  <SimpleParagraph
                    paragraph="PRIVACY AND POLICY"
                    size="14"
                    bold
                    css={style.footerText}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Divider style={{ borderTopColor: "#C4C4C4", width: "100%" }} />

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <SimpleParagraph
            paragraph="COPYRIGHT 2022"
            size="14"
            margin="auto"
            bold
            css={style.flex}
          />
        </div>
      </Row>
    </div>
  );
};

export default Footer;
