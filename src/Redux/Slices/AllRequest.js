import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  requestList: [],
};

const AllRequestListing = createSlice({
  name: "allRequest",
  initialState: initialValue,
  reducers: {
    setAllRequest: (state, action) => {
      return {
        ...state,
        requestList: [...action.payload],
      };
    },
  },
});

const { reducer } = AllRequestListing;
export default reducer;
export const { setAllRequest } = AllRequestListing.actions;
