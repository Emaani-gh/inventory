import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userHolder",
  initialState: {
    userActions: null,
    userDetail: null,
    userUrls: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userDetail = action.payload;
    },
    logoutUser: (state, action) => {
      state.userDetail = action.payload;
    },
    loadUserAction: (state, action) => {
      state.userActions = action.payload;
    },
    removeUserAction: (state, action) => {
      state.userActions = action.payload;
    },
    updateUserUrls: (state, action) => {
      state.userUrls = action.payload;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  loadUserAction,
  removeUserAction,
  updateUserUrls,
} = userSlice.actions;

export default userSlice.reducer;
