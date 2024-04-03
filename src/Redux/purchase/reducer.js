import {
  ADD_PURCHASE_ERROR,
  ADD_PURCHASE_LOADING,
  ADD_PURCHASE_SUCCESS,
  DELETE_PAYOUTBILL_SUCCESS,
  DELETE_PURCHASEBILL_SUCCESS,
  DELETE_PURCHASEORDER_SUCCESS,
  DELETE_PURCHASERETURN_SUCCESS,
  GET_ALL_PAYMENT_OUT_ERROR,
  GET_ALL_PAYMENT_OUT_LOADING,
  GET_ALL_PAYMENT_OUT_SUCCESS,
  GET_ALL_PURCHASE_BILL_ERROR,
  GET_ALL_PURCHASE_BILL_LOADING,
  GET_ALL_PURCHASE_BILL_SUCCESS,
  GET_PAYOUTBILL_SUCCESS,
  GET_PURCHASEBILL_SUCCESS,
  GET_PURCHASEORDER_SUCCESS,
  GET_PURCHASE_RETURN_ERROR,
  GET_PURCHASE_RETURN_LOADING,
  GET_PURCHASE_RETURN_SUCCESS,
  GET_SINGLE_PURCHASEBILL_SUCCESS,
  POST_PAYOUT_SUCCESS,
  POST_PURCHASEBILL_SUCCESS,
  POST_PURCHASEORDER_SUCCESS,
  POST_PURCHASERETURN_SUCCESS,
  PURCHASE_FAILURE,
  PURCHASE_REQUEST,
  UPDATE_PAYOUTBILL_SUCCESS,
  UPDATE_PURCHASEBILL_SUCCESS,
  UPDATE_PURCHASERETURN_SUCCESS,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  isFailed: false,

  // Add Purchase Bill
  toggleAddPurchaseBill: false,
  addPurchaseLoading: false,
  addPurchaseError: false,

  // Get All Purchase Bill
  PurchaseBillData: [],
  getAllPurchaseLoading: false,
  getAllPurchaseError: false,
  getAllPurchaseBillSuccess: false,

  // Add Payment Out
  toggleAddPaymentOutSuccess: false,

  // Get All Payment Out
  getAllPaymentOutLoading: false,
  getAllPaymentOutError: false,
  paymentOutData: [],

  // Add Payment Return
  toggleAddPaymentReturnSuccess: false,

  // Get All Purchase Return
  purchaseReturnData: [],
  getAllPaymentReturnLoading: false,
  getAllPaymentReturnError: false,
  getAllPurchaseReturnSuccess: false,

  // partiesData: [],
  partyName: "",
  phoneNumber: "",
  purchaseOrderData: [],
  singlePurchseData: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // ----------------------------- Purchase Bill --------------------------
    // Add Purchase Bill
    case ADD_PURCHASE_LOADING: {
      return { ...state, addPurchaseLoading: true, addPurchaseError: false };
    }
    case ADD_PURCHASE_ERROR: {
      return { ...state, addPurchaseLoading: false, addPurchaseError: true };
    }
    case ADD_PURCHASE_SUCCESS: {
      return {
        ...state,
        addPurchaseLoading: false,
        toggleAddPurchaseBill: !state.toggleAddPurchaseBill,
      };
    }
    //  Get All Purchase Bill
    case GET_ALL_PURCHASE_BILL_LOADING: {
      return {
        ...state,
        getAllPurchaseLoading: true,
        getAllPurchaseError: false,
      };
    }
    case GET_ALL_PURCHASE_BILL_ERROR: {
      return {
        ...state,
        getAllPurchaseLoading: false,
        getAllPurchaseError: true,
      };
    }
    case GET_ALL_PURCHASE_BILL_SUCCESS: {
      return {
        ...state,
        PurchaseBillData: payload,
        getAllPurchaseBillSuccess: !state.getAllPurchaseBillSuccess,
        getAllPurchaseLoading: false,
      };
    }

    // ^^^^^^^^^^^^^^^^^^
    case PURCHASE_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }
    case GET_PURCHASEBILL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseBillData: payload.data,
      };
    }

    case GET_SINGLE_PURCHASEBILL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        singlePurchseData: payload.data[0][0],
      };
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

    // --------------------------------- Payment Out -------------------------------------
    // Add Payment Out
    case POST_PAYOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        toggleAddPaymentOutSuccess: !state.toggleAddPaymentOutSuccess,
      };
    }
    // Get All Payment Out
    case GET_ALL_PAYMENT_OUT_LOADING: {
      return {
        ...state,
        getAllPaymentOutLoading: true,
        getAllPaymentOutError: false,
      };
    }
    case GET_ALL_PAYMENT_OUT_ERROR: {
      return {
        ...state,
        getAllPaymentOutLoading: false,
        getAllPaymentOutError: true,
      };
    }
    case GET_ALL_PAYMENT_OUT_SUCCESS: {
      return {
        ...state,
        paymentOutData: payload,
        getAllPaymentOutLoading: false,
      };
    }

    case UPDATE_PAYOUTBILL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        toggleAddPaymentOutSuccess: !state.toggleAddPaymentOutSuccess,
      };
    }
    case DELETE_PAYOUTBILL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toggleAddPaymentOutSuccess: !state.toggleAddPaymentOutSuccess,
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

    // ---------------------------------  Purchae Return -------------------------------------
    // Add Purchae Return
    case POST_PURCHASERETURN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        toggleAddPaymentReturnSuccess: !state.toggleAddPaymentReturnSuccess,
      };
    }
    // Get All Purchase Returns
    case GET_PURCHASE_RETURN_LOADING: {
      return {
        ...state,
        getAllPaymentReturnLoading: true,
        getAllPaymentReturnError: false,
      };
    }
    case GET_PURCHASE_RETURN_ERROR: {
      return {
        ...state,
        getAllPaymentReturnLoading: false,
        getAllPaymentReturnError: true,
      };
    }
    case GET_PURCHASE_RETURN_SUCCESS: {
      return {
        ...state,
        getAllPaymentReturnLoading: false,
        purchaseReturnData: payload,
        getAllPurchaseReturnSuccess: !state.getAllPurchaseReturnSuccess,
      };
    }
    // Update Purchase Return
    case UPDATE_PURCHASERETURN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toggleAddPaymentReturnSuccess: !state.toggleAddPaymentReturnSuccess,
      };
    // Delete Purchase Return
    case DELETE_PURCHASERETURN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        toggleAddPaymentReturnSuccess: !state.toggleAddPaymentReturnSuccess,
      };

    case PURCHASE_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    default: {
      return state;
    }
  }
};
