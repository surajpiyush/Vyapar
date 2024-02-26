import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
  name: "Sales",
  initialState: {
    // INVOICE
    isLoading: false,
    isError: false,
    invoicesList: [],
    toggleSalesSuccess: false,

    // ESTIMATES
    toggleEstimates: false,
    estimatesList: [],

    paymentOutData: [],
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
    // INVOICE
    POST_SALES_INVOICE_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    GET_SALES_INVOICE_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.invoicesList = action.payload;
    },
    // ESTIMATES
    POST_ESTIMATE_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleEstimates = !state.toggleEstimates;
    },
    GET_ESTIMATE_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.estimatesList = action.payload;
    },

    // DELIVERY
    POST_DELIVERY_CHALLAN_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    GET_DELIVERY_CHALLAN_SUCCESS: (state) => {
      state.isLoading = false;
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

  POST_SALES_INVOICE_SUCCESS,
  GET_SALES_INVOICE_SUCCESS,

  POST_ESTIMATE_SUCCESS,
  GET_ESTIMATE_SUCCESS,

  POST_DELIVERY_CHALLAN_SUCCESS,
  GET_DELIVERY_CHALLAN_SUCCESS,

  POST_SALES_ORDER_SUCCESS,
  POST_SALES_RETURNS_SUCCESS,
  POST_SALES_PAYMENT_SUCCESS,
} = salesSlice.actions;
export default salesSlice.reducer;
