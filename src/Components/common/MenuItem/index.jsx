import React from "react";
import { Menu } from "antd";
import { SimpleParagraph } from "../Paragraph";
import style from "./index.module.less";
import { Link } from "react-router-dom";

const items = [
  {
    label: (
      <Link to='/categories'>
        <SimpleParagraph
          paragraph='BROWSE BY CATEGORIES'
          size='14'
          bold
          css={style.letterSpacing}
        />
      </Link>
    ),
    key: "SubMenu",
    children: [
      {
        label: <Link to='/categories/mtb'>MTB</Link>,
        key: "MTB",
      },
      {
        label: <Link to='/categories/road-bike'>Road Bike</Link>,
        key: "Road Bike",
      },
      {
        label: <Link to='/categories/foldies'>Folding Bike</Link>,
        key: "Folding Bike",
      },
      {
        label: <Link to='/categories/e-bike'>E Bike</Link>,
        key: "E Bike",
      },
    ],
  },
  {
    label: (
      <Link to='/brands'>
        <SimpleParagraph
          paragraph='BROWSE BY BRANDS'
          size='14'
          bold
          css={style.letterSpacing}
        />
      </Link>
    ),
    key: "mail",
  },
  {
    label: (
      <Link to='/categories-retail'>
        <SimpleParagraph
          paragraph='BROWSE BY LBS'
          size='14'
          bold
          css={style.letterSpacing}
        />
      </Link>
    ),
    key: "app",
  },
];

const MenuItem = () => {
  const [current, setCurrent] = React.useState();

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
      className={style.MenuItemWrapper}
    />
  );
};

export default MenuItem;
