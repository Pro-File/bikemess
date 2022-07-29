import { createSlice } from "@reduxjs/toolkit";
const initialValue = null;

const MapSlice = createSlice({
  name: "map",
  initialState: initialValue,
  reducers: {
    setGlobalMapAddress: (state, action) => {
      return action.payload;
    },
    clearGlobalMapAddress: (state, action) => {
      return null;
    }
  },
});

const { reducer } = MapSlice;
export default reducer;
export const { setGlobalMapAddress, clearGlobalMapAddress } = MapSlice.actions;
