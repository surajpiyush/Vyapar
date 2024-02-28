import {

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
saleReportData:[],
purchaseReportData:[],

};

export const reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case REPORT_REQUEST: {
         return { ...state, isLoading: true };
      }
      
      case GET_SALEREPORT_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            saleReportData: payload.data,
         };
      }

      case GET_PURCHASEREPORT_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseReportData: payload.data,
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
