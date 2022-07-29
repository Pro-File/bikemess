import React from "react";
import {RevolvingDot} from "react-loader-spinner";

const Spinner = ({ type, height, width, loader }) => {
  return <RevolvingDot
      // color={theme.palette.primary.main}
      color="#ba3bfa"
      type={type}
      width={width || 100}
      height={height || 100}
    />
};

export default Spinner;
