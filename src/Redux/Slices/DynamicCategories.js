import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  selectedCategory: undefined,
};

const DynamicCategories = createSlice({
  name: "dynamicCategory",
  initialState: initialValue,
  reducers: {
    addCategoryKeyword: (state, action) => {
      return { ...state, selectedCategory: action.payload };
    },
    removeCategoryKeyword: (state, action) => {
      return { ...state, selectedCategory: undefined };
    },
  },
});

const { reducer } = DynamicCategories;
export default reducer;
export const { addCategoryKeyword, removeCategoryKeyword } =
  DynamicCategories.actions;
