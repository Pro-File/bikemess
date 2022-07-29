import { createSlice } from "@reduxjs/toolkit";
const initialValue = [];

const ListingSlice = createSlice({
  name: "list",
  initialState: initialValue,
  reducers: {
    addToList: (state, action) => {
      return [...state, action.payload];
    },
    removeTodoList: (state, action) => {
      return [];
    },
  },
});

const { reducer } = ListingSlice;
export default reducer;
export const { addToList, removeTodoList } = ListingSlice.actions;
