import { createSlice } from "@reduxjs/toolkit";

export const pageUsersSlice = createSlice({
  name: "allUsersHolder",
  initialState: {
    usersList: null
  },
  reducers: {
    loadAllUsers: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const { loadAllUsers } = pageUsersSlice.actions;

export default pageUsersSlice.reducer;
