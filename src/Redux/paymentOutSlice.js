import { createSlice } from "@reduxjs/toolkit";

const paymentOutSlice = createSlice({
  name: "paymentOut",
  initialState: {
    data: [],
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
      state.data = action.payload;
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
