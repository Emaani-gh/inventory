import { createSlice } from "@reduxjs/toolkit";

export const stateProviderSlice = createSlice({
  name: "stateProviderHolder",
  initialState: {
    toggleSidebar: "",
    toggleCheckoutDarkBackground: null,
    masterPageLoading: false,
    loginPageLoading: true,

    // Notifications to be handle
    systemNotification: {
      show: "",
      title: "",
      body: "",
      color: "",
    },
  },
  reducers: {
    setToggleSidebar: (state, action) => {
      if (state.toggleSidebar) {
        state.toggleSidebar = "";
      } else {
        state.toggleSidebar = action.payload;
      }
    },
    setToggleCheckoutDarkBackground: (state, action) => {
      state.toggleCheckoutDarkBackground = action.payload;
    },
    setToggleRootPageLoading: (state, action) => {
      state.masterPageLoading = action.payload;
    },
    setToggleLoginPageLoading: (state, action) => {
      state.loginPageLoading = action.payload;
    },
    setToggleSystemNotification: (state, action) => {
      state.systemNotification = action.payload;
    },
  },
});

export const {
  setToggleSidebar,
  setToggleCheckoutDarkBackground,
  setToggleRootPageLoading,
  setToggleLoginPageLoading,

  //
  setToggleSystemNotification,
} = stateProviderSlice.actions;

export default stateProviderSlice.reducer;
