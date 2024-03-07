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

      // Delivery Challan
      toggleDeliveryChallan: false,
      deliveryChallanList: [],

      // Sale Return /  Credit Note
      toggleCreditNote: false,
      creditNotesList: [],
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
      DELETE_SALES_INVOICE_SUCCESS: (state, action) => {
         const updatedinvoicesList = state.invoicesList.filter(
            (bill) => bill._id !== action.payload
         );
         //  console.log(payload)
         state.invoicesList = updatedinvoicesList;
         state.isLoading = false;
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
      DELETE_ESTIMATE_SUCCESS: (state, action) => {
         const updatedestimatesList = state.estimatesList.filter(
            (bill) => bill._id !== action.payload
         );
         //  console.log(payload)
         state.estimatesList = updatedestimatesList;
         state.isLoading = false;
      },

      // PAYMENT-IN ------------------------------------------------------
      POST_PAYMENT_IN_SUCCESS: (state) => {
         state.isLoading = false;
         state.togglePaymentIn = !state.togglePaymentIn;
      },
      GET_PAYMENT_IN_SUCCESS: (state, action) => {
         state.isLoading = false;
         state.paymentInList = action.payload;
      },
      DELETE_PAYMENT_IN_SUCCESS: (state, action) => {
         const updatedpaymentInList = state.paymentInList.filter(
            (bill) => bill._id !== action.payload
         );
         //  console.log(payload)
         state.paymentInList = updatedpaymentInList;
         state.isLoading = false;
      },

      // SALE ORDER ------------------------------------------------------
      POST_SALE_ORDER_SUCCESS: (state) => {
         state.isLoading = false;
         state.toggleSaleOrder = !state.toggleSaleOrder;
      },
      GET_All_SALE_ORDER_SUCCESS: (state, action) => {
         state.isLoading = false;
         state.saleOrderList = action.payload;
      },
      DELETE_ALL_SALE_ORDER_SUCCESS: (state, action) => {
         const updatedsaleOrderList = state.saleOrderList.filter(
            (bill) => bill._id !== action.payload
         );
         //  console.log(payload)
         state.saleOrderList = updatedsaleOrderList;
         state.isLoading = false;
      },

      // DELIVERY CHALLAN ------------------------------------------------------
      POST_DELIVERY_CHALLAN_SUCCESS: (state) => {
         state.isLoading = false;
         state.toggleDeliveryChallan = !state.toggleDeliveryChallan;
      },
      GET_ALL_DELIVERY_CHALLAN_SUCCESS: (state, action) => {
         state.isLoading = false;
         state.deliveryChallanList = action.payload;
      },
      DELETE_ALL_DELIVERY_CHALLAN_SUCCESS: (state, action) => {
         const updateddeliveryChallanList = state.deliveryChallanList.filter(
            (bill) => bill._id !== action.payload
         );
         //  console.log(payload)
         state.deliveryChallanList = updateddeliveryChallanList;
         state.isLoading = false;
      },

      // SALE RETURN / CREDIT NOTE ------------------------------------------------------
      POST_CREDIT_NOTE_SUCCESS: (state) => {
         state.isLoading = false;
         state.toggleCreditNote = !state.toggleCreditNote;
      },
      GET_ALL_CREDIT_NOTES_SUCCESS: (state, action) => {
         state.isLoading = false;
         state.creditNotesList = action.payload;
      },
      DELETE_ALL_CREDIT_NOTES_SUCCESS: (state, action) => {
         const updatedcreditNotesList = state.creditNotesList.filter(
            (bill) => bill._id !== action.payload
         );
         //  console.log(payload)
         state.creditNotesList = updatedcreditNotesList;
         state.isLoading = false;
      },
   },
});

export const {
   IS_LOADING,
   IS_ERROR,

   POST_SALES_INVOICE_SUCCESS,
   GET_SALES_INVOICE_SUCCESS,
   DELETE_SALES_INVOICE_SUCCESS,

   POST_ESTIMATE_SUCCESS,
   GET_ESTIMATE_SUCCESS,
   DELETE_ESTIMATE_SUCCESS,

   POST_PAYMENT_IN_SUCCESS,
   GET_PAYMENT_IN_SUCCESS,
   DELETE_PAYMENT_IN_SUCCESS,

   POST_SALE_ORDER_SUCCESS,
   GET_All_SALE_ORDER_SUCCESS,
   DELETE_ALL_SALE_ORDER_SUCCESS,

   POST_DELIVERY_CHALLAN_SUCCESS,
   GET_ALL_DELIVERY_CHALLAN_SUCCESS,
   DELETE_ALL_DELIVERY_CHALLAN_SUCCESS,

   POST_CREDIT_NOTE_SUCCESS,
   GET_ALL_CREDIT_NOTES_SUCCESS,
   DELETE_ALL_CREDIT_NOTES_SUCCESS,
} = salesSlice.actions;
export default salesSlice.reducer;
