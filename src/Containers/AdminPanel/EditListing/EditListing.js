import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setGlobalMapAddress } from "../../../Redux/Slices/MapSlice";
import moment from "moment";
import AddListings from "../../AddListings";

const EditListing = () => {
  const { id } = useParams();
  const allListItem = useSelector((state) => state.allListing.list);
  const filteredData = allListItem.find((item) => item.id === id);
  const data = {
    ...filteredData,
    startTime: moment(filteredData?.startTime, "HH:mm"),
    endTime: moment(filteredData?.endTime, "HH:mm"),
  };

  return (
    <div>
      <AddListings id={id} filteredData={data} isEdit={true} />
    </div>
  );
};

export default EditListing;
