import {
   GET_ALLTRANSECTION_SUCCESS,
   GET_DAYBOOK_SUCCESS,
   GET_PURCHASEREPORT_SUCCESS,
   GET_SALEREPORT_SUCCESS,
   PURCHASE_FAILURE,
   PURCHASE_REQUEST,
   REPORT_FAILURE,
   REPORT_REQUEST,
} from "./actionTypes";

const initialState = {
   // partiesData: [],
   isLoading: false,
   isFailed: false,
   isError: false,
   saleReportData: [],
   totalSaleTax :0,
   integratedTax:0,
   cessTax :0,

   totalSaleTaxReturn :0,
   integratedTaxReturn:0,
   cessTaxReturn :0,
   purchaseReportData: [],
   dayBookData: [],
   allTransectionsData: [],
};

export const reducer = (state = initialState, { type, payload,tax,integratedTax,cess,Rtax,RintegratedTax,Rcess }) => {
   switch (type) {
      case REPORT_REQUEST: {
         return { ...state, isLoading: true };
      }

      case GET_SALEREPORT_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            saleReportData: payload.data,
            totalSaleTax :tax,
            integratedTax:integratedTax,
            cessTax:cess,
            totalSaleTaxReturn :Rtax,
            integratedTaxReturn:RintegratedTax,
            cessTaxReturn:Rcess,
         };
      }

      case GET_PURCHASEREPORT_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseReportData: payload.data,
         };
      }

      case GET_DAYBOOK_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            dayBookData: payload.data,
         };
      }

      case GET_ALLTRANSECTION_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            allTransectionsData: payload.data,
         };
      }

      case REPORT_FAILURE: {
         return { ...state, isLoading: false, isError: true };
      }
      default: {
         return state;
      }
   }
};
