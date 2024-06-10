import { createSlice } from "@reduxjs/toolkit";

export const pageInventorySlice = createSlice({
  name: "inventoryHolder",
  initialState: {
    inventoryList: null,
    inventoryCategoryList: null,
    nameFilterValueExpense: null,
  },
  reducers: {
    loadInventory: (state, action) => {
      state.inventoryList = action.payload;
    },
    loadInventoryCategory: (state, action) => {
      state.inventoryCategoryList = action.payload;
    },
    updateNameFilterValueExpense: (state, action) => {
      if (action.payload === "") {
        state.nameFilterValueExpense = null;
      } else {
        state.nameFilterValueExpense = action.payload;
      }
    },
  },
});

export const {
  loadInventory,
  loadInventoryCategory,
  updateNameFilterValueExpense,
} = pageInventorySlice.actions;

export default pageInventorySlice.reducer;
