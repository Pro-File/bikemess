import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  searchedKeyword: undefined,
  loading: true,
  brandKeyword: undefined,
  list: [],
};

const AllListing = createSlice({
  name: "allListing",
  initialState: initialValue,
  reducers: {
    setAllListing: (state, action) => {
      return {
        ...state,
        list: [...action.payload],
        loading: false,
      };
    },
    addSearchingKeyword: (state, action) => {
      return { ...state, searchedKeyword: action.payload };
    },
    removeSearchingKeyword: (state, action) => {
      return { ...state, searchedKeyword: undefined };
    },
    addBrandKeyword: (state, action) => {
      return { ...state, brandKeyword: action.payload };
    },
    removeBrandKeyword: (state, action) => {
      return { ...state, brandKeyword: undefined };
    },
  },
});

const { reducer } = AllListing;
export default reducer;
export const {
  setAllListing,
  addSearchingKeyword,
  removeSearchingKeyword,
  addBrandKeyword,
  removeBrandKeyword,
} = AllListing.actions;
