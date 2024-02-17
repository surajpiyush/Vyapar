import { createSlice } from "@reduxjs/toolkit";

const paymentOutSlice = createSlice({
  name: "paymentOut",
  initialState: {
    paymentOutData: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    paymentOutRequest: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    paymentOutSuccess: (state, action) => {
      state.isLoading = false;
      state.paymentOutData = action.payload;
    },
    paymentOutFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { paymentOutRequest, paymentOutSuccess, paymentOutFailure } =
  paymentOutSlice.actions;
export default paymentOutSlice.reducer;
