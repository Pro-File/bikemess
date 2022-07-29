import { Col, Row } from 'antd';
import React from 'react'
import { SimpleParagraph } from '../Paragraph';
import style from "./index.module.less";

const SmartText = ({title, desc ,css}) => {
  return (
    <div className='smartText'>
        <Row className={css}>
        <div>
            <SimpleParagraph paragraph={title} size={12} css={style.customStyle}/>
        </div>
        <div >
        <SimpleParagraph paragraph={desc}  size={12} css={style.customStyle}/>
        </div>
        </Row>
    </div>
  )
}

export default SmartText