import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBrandKeyword } from "../../Redux/Slices/AllListing";
import { SimpleHeading } from "../common/Heading";
import { SimpleParagraph } from "../common/Paragraph";
import style from "./index.module.less";

const BrandListComponent = ({ retailerName, retailers }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const redirectCategoriesPae = () => {
    dispatch(addBrandKeyword(retailerName.toLowerCase()));
    history.push("/categories");
  };

  return (
    <div className={style.ListCard}>
      <div>
        <SimpleHeading
          heading={retailerName}
          size='14'
          cssClass={style.fontFamily}
        />
      </div>
      <div onClick={redirectCategoriesPae}>
        <SimpleParagraph
          paragraph={`${retailers} RETAILERS SELLING THIS BRAND`}
          size='14'
          bold
          css={style.rightContent}
        />
      </div>
    </div>
  );
};

export default BrandListComponent;
