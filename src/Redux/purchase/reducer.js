import {
   DELETE_PAYOUTBILL_SUCCESS,
   DELETE_PURCHASEBILL_SUCCESS,
   DELETE_PURCHASEORDER_SUCCESS,
   DELETE_PURCHASERETURN_SUCCESS,
   GET_PAYOUTBILL_SUCCESS,
   GET_PURCHASEBILL_SUCCESS,
   GET_PURCHASEORDER_SUCCESS,
   GET_PURCHASERETURN_SUCCESS,
   GET_SINGLE_PURCHASEBILL_SUCCESS,
   POST_PAYOUT_SUCCESS,
   POST_PURCHASEBILL_SUCCESS,
   POST_PURCHASEORDER_SUCCESS,
   POST_PURCHASERETURN_SUCCESS,
   PURCHASE_FAILURE,
   PURCHASE_REQUEST,
   UPDATE_PURCHASEBILL_SUCCESS,
} from "./actionTypes";

const initialState = {
   // partiesData: [],
   isLoading: false,
   isFailed: false,
   isError: false,
   purchaseBillData: [],
   partyName: "",
   phoneNumber: "",
   paymentOutData: [],
   purchaseOrderData: [],
   purchaseReturnData: [],
   singlePurchseData :{},
   
};

export const reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case PURCHASE_REQUEST: {
         return { ...state, isLoading: true };
      }

      //  Purchase Bill
      case GET_PURCHASEBILL_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseBillData: payload.data,
         };
      }
      case GET_SINGLE_PURCHASEBILL_SUCCESS :{
         return {
            ...state,
            isLoading:false,
            singlePurchseData:payload.data[0][0]
         }
      }
      case POST_PURCHASEBILL_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseBillData: [...state.purchaseBillData, payload],
         };
      }
      case DELETE_PURCHASEBILL_SUCCESS:
         // Remove the deleted purchase bill from the state
         const updatedPurchaseBills = state.purchaseBillData.filter(
            (bill) => bill._id !== payload
         );
         return {
            ...state,
            purchaseBillData: updatedPurchaseBills,
            isLoading: false,
         };
      case UPDATE_PURCHASEBILL_SUCCESS: {
         
         return {
            ...state,
            isLoading: false,
         };
      }

      // Purchase PaymentOut Bill
      case GET_PAYOUTBILL_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            paymentOutData: payload.data,
         };
      }
      case POST_PAYOUT_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseOutData: [...state.paymentOutData, payload],
         };
      }
      case DELETE_PAYOUTBILL_SUCCESS:
         // Remove the deleted purchase bill from the state
         const updatedPayOutBills = state.paymentOutData.filter(
            (bill) => bill._id !== payload
         );
         //  console.log(payload)
         return {
            ...state,
            paymentOutData: updatedPayOutBills,
            isLoading: false,
         };


      // Purchase OrderBill
      case GET_PURCHASEORDER_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseOrderData: payload.data,
         };
      }
      case POST_PURCHASEORDER_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseOrderData: [...state.purchaseOrderData, payload],
         };
      }
      case DELETE_PURCHASEORDER_SUCCESS:
         // Remove the deleted purchase bill from the state
         const updatedPurchaseOrderData = state.purchaseOrderData.filter(
            (bill) => bill._id !== payload
         );
         //  console.log(payload)
         return {
            ...state,
            purchaseOrderData: updatedPurchaseOrderData,
            isLoading: false,
         };

      // PurchaeReturn Bills
      case GET_PURCHASERETURN_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseReturnData: payload.data,
         };
      }
      case POST_PURCHASERETURN_SUCCESS: {
         return {
            ...state,
            isLoading: false,
            purchaseReturnData: [...state.purchaseReturnData, payload],
         };
      }
      case DELETE_PURCHASERETURN_SUCCESS:
         // Remove the deleted purchase bill from the state
         const updatedPurchaseReturnData = state.purchaseReturnData.filter(
            (bill) => bill._id !== payload
         );
         //  console.log(payload)
         return {
            ...state,
            purchaseReturnData: updatedPurchaseReturnData,
            isLoading: false,
         };


      case PURCHASE_FAILURE: {
         return { ...state, isLoading: false, isError: true };
      }
      default: {
         return state;
      }
   }
};
