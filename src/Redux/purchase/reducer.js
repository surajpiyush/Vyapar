import {
  GET_PAYOUTBILL_SUCCESS,
  GET_PURCHASEBILL_SUCCESS,
  GET_PURCHASEORDER_SUCCESS,
  GET_PURCHASERETURN_SUCCESS,
  POST_PAYOUT_SUCCESS,
  POST_PURCHASEBILL_SUCCESS,
  POST_PURCHASEORDER_SUCCESS,
  POST_PURCHASERETURN_SUCCESS,
  PURCHASE_FAILURE,
  PURCHASE_REQUEST,
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

  // gstNo: "",
  // GSTType: "",
  // state: "",
  // email: "",
  // billingAddress: "",
  // shippingAddress: "",
  // openingBalance: "",
  // asOfDate: "",
  // creditLimit: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PURCHASE_REQUEST: {
      return { ...state, isLoading: true };
    }
    case GET_PURCHASEBILL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseBillData: payload.data,
      };
    }
    case GET_PAYOUTBILL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        paymentOutData: payload.data,
      };
    }
    case GET_PURCHASEORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseOrderData: payload.data,
      };
    }
    case GET_PURCHASERETURN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseReturnData: payload.data,
      };
    }

    case POST_PURCHASEBILL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseBillData: [...state.purchaseBillData, payload],
      };
    }
    case POST_PURCHASEORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseOrderData: [...state.purchaseOrderData, payload],
      };
    }

    case POST_PURCHASERETURN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseReturnData: [...state.purchaseReturnData, payload],
      };
    }
    case POST_PAYOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseOutData: [...state.paymentOutData, payload],
      };
    }

    case PURCHASE_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    default: {
      return state;
    }
  }
};
