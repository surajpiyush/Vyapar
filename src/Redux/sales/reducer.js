import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
  name: "Sales",
  initialState: {
    isLoading: false,
    isError: false,

    // INVOICE
    toggleSalesSuccess: false,
    invoicesList: [],

    // ESTIMATES
    toggleEstimates: false,
    estimatesList: [],

    // PAYMENT-IN
    togglePaymentIn: false,
    paymentInList: [],

    // Sale Order
    toggleSaleOrder: false,
    saleOrderList: [],

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

    // INVOICE -------------------------------------------------------
    POST_SALES_INVOICE_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    GET_SALES_INVOICE_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.invoicesList = action.payload;
    },

    // ESTIMATES ------------------------------------------------------
    POST_ESTIMATE_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleEstimates = !state.toggleEstimates;
    },
    GET_ESTIMATE_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.estimatesList = action.payload;
    },

    // PAYMENT-IN ------------------------------------------------------
    POST_PAYMENT_IN_SUCCESS: (state) => {
      state.isLoading = false;
      state.togglePaymentIn = !state.togglePaymentIn;
    },

    // Sale Order ------------------------------------------------------
    POST_SALE_ORDER_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSaleOrder = !state.toggleSaleOrder;
    },
    GET_All_SALE_ORDER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.saleOrderList = action.payload;
    },

    // *******************************************************************
    // *******************************************************************
    // *******************************************************************
    // DELIVERY
    POST_DELIVERY_CHALLAN_SUCCESS: (state) => {
      state.isLoading = false;
      state.toggleSalesSuccess = !state.toggleSalesSuccess;
    },
    GET_DELIVERY_CHALLAN_SUCCESS: (state) => {
      state.isLoading = false;
    },

    POST_SALES_RETURNS_SUCCESS: (state) => {
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

  POST_PAYMENT_IN_SUCCESS,

  POST_SALE_ORDER_SUCCESS,
  GET_All_SALE_ORDER_SUCCESS,

  POST_DELIVERY_CHALLAN_SUCCESS,
  GET_DELIVERY_CHALLAN_SUCCESS,

  POST_SALES_RETURNS_SUCCESS,
} = salesSlice.actions;
export default salesSlice.reducer;
