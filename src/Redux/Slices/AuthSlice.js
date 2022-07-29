import { createSlice } from "@reduxjs/toolkit";
const initialValue = null;

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    logout: (state, action) => {
      localStorage.clear();
      return null;
    },

    signin: (state, action) => {
      localStorage.setItem("admin", action.payload);
      return action.payload;
    },
  },
});

const { reducer } = AuthSlice;
export default reducer;
export const { signup, signin, logout } = AuthSlice.actions;
