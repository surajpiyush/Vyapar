import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
  name: "Sales",
  initialState: {
    isLoading: false,
    isError: false,
    toggleSalesSuccess: false,
    paymentOutData: [],

    invoicesList: [],
  },
  reducers: {
    IS_LOADING: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    IS_ERROR: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    POST_DELIVERY_CHALLAN_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    GET_DELIVERY_CHALLAN_SUCCESS: (state) => {
      state.isLoading = false;
    },
    POST_SALES_ESTIMATE_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },

    POST_SALES_INVOICE_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    GET_SALES_INVOICE_SUCCESS: (state, action) => {
      // console.log("action", action);
      state.isLoading = false;
      state.invoicesList = action.payload;
    },

    POST_SALES_ORDER_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    POST_SALES_RETURNS_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    POST_SALES_PAYMENT_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
  },
});

export const {
  IS_LOADING,
  IS_ERROR,
  POST_DELIVERY_CHALLAN_SUCCESS,
  GET_DELIVERY_CHALLAN_SUCCESS,
  POST_SALES_ESTIMATE_SUCCESS,
  POST_SALES_INVOICE_SUCCESS,
  GET_SALES_INVOICE_SUCCESS,
  POST_SALES_ORDER_SUCCESS,
  POST_SALES_RETURNS_SUCCESS,
  POST_SALES_PAYMENT_SUCCESS,
} = salesSlice.actions;
export default salesSlice.reducer;
