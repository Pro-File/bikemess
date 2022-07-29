import React, { useState } from "react";
import style from "./index.module.less";
import { SimpleParagraph } from "../common/Paragraph/index";
import { Button } from "@mui/material";
import { Col, Row, Input, Form } from "antd";
import { TextBox } from "../common/Forms/TextBox";
import Arrow from "../../Assests/arrow.png";
import Close from "../../Assests/icon-close.svg";
import { RoundButton } from "../common/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { addSearchingKeyword } from "../../Redux/Slices/AllListing";
import { useHistory } from "react-router-dom";
import { ClearOutlined } from "@ant-design/icons";

const SearchComponent = ({ search, setSearch, onSearch, onClear, form }) => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <div>
      {searchVisible ? (
        <div className={style.searchOverHead}>
          <div className={style.gap}>
            <SimpleParagraph paragraph='You are searching for ?' size='14' />
            <Row gutter={[8, 8]}>
              <Col lg={18}>
                <Form form={form} layout='vertical' autoComplete='off'>
                  <TextBox
                    name='subscribe'
                    placeholder='Enter Your Keywords here'
                    type='search'
                    change={(value) => {
                      setSearch(value.target.value);
                    }}
                    value={search}
                  />
                </Form>
              </Col>
              <Col lg={6}>
                <Row gutter={[8, 0]}>
                  <Col>
                    <RoundButton
                      type='primary'
                      icon={Arrow}
                      onClick={() => onSearch()}
                    />
                  </Col>
                  {search && (
                    <Col>
                      <RoundButton
                        type='secondary'
                        icon={Close}
                        onClick={() => onClear(form)}
                      />
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
          <Button
            variant='transparent'
            className={style.simple}
            onClick={() => setSearchVisible(false)}
          >
            <u>Cancel</u>
          </Button>
        </div>
      ) : (
        <div className={style.searchOverHead}>
          {search && (
            <SimpleParagraph
              paragraph={`SEARCH RESULTS FOR “${search}”`}
              size='18'
              bold={false}
              css={style.searchOverHeadMain}
            />
          )}
          <Button
            variant='transparent'
            className={style.simple}
            onClick={() => setSearchVisible(true)}
          >
            <u>Change search</u>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
