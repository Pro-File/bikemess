import { createSlice } from "@reduxjs/toolkit";
const initialValue = null;

const NotificationBannerSlice = createSlice({
  name: "banner",
  initialState: initialValue,
  reducers: {
    addBanner: (state, action) => {
      return action.payload;
    },
    removeBanner: (state, action) => {
      return action.payload;
    }
  },
});

const { reducer } = NotificationBannerSlice;
export default reducer;
export const { addBanner, removeBanner } = NotificationBannerSlice.actions;
