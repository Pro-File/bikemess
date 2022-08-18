import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./Slices/MapSlice";
import listReducer from "./Slices/ListingSlice";
import allListingReducer from "./Slices/AllListing";
import selectedCategoryReducer from "./Slices/DynamicCategories";

import notificationBannerReducer from "./Slices/NotificationBannerSlice";

const reducers = {
  map: mapReducer,
  list: listReducer,
  banner: notificationBannerReducer,
  allListing: allListingReducer,
  selectedCategory: selectedCategoryReducer,
};

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;
