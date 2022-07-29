import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import mapReducer from "./Slices/MapSlice";
import listReducer from "./Slices/ListingSlice";
import allListingReducer from "./Slices/AllListing";
import allRequestReducer from "./Slices/AllRequest";
import selectedCategoryReducer from "./Slices/DynamicCategories";

import notificationBannerReducer from "./Slices/NotificationBannerSlice";

const reducers = {
  auth: authReducer,
  map: mapReducer,
  list: listReducer,
  banner: notificationBannerReducer,
  allListing: allListingReducer,
  allRequest: allRequestReducer,
  selectedCategory: selectedCategoryReducer,
};

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
