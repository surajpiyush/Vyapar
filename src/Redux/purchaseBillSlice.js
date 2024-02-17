import { createSlice } from "@reduxjs/toolkit";

const purchaseBillSlice = createSlice({
  name: "purchaseBill",
  initialState: {
    purchaseBillData: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    purchaseBillRequest: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    purchaseBillSuccess: (state, action) => {
      state.isLoading = false;
      state.purchaseBillData = action.payload;
    },
    purchaseBillFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { purchaseBillRequest, purchaseBillSuccess, purchaseBillFailure } =
  purchaseBillSlice.actions;
export default purchaseBillSlice.reducer;
