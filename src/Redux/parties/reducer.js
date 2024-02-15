import {
  PARTIES_POST_FAILED,
  PARTIES_POST_REQUEST,
  PARTIES_POST_SUCCESS,
  PARTIES_PURCHASE_BILL_FAILURE,
  PARTIES_PURCHASE_BILL_REQUEST,
  PARTIES_PURCHASE_BILL_SUCCESS,
  PARTIES_PAYMENT_OUT_FAILURE,
  PARTIES_PAYMENT_OUT_REQUEST,
  PARTIES_PAYMENT_OUT_SUCCESS,
} from "./actionTypes";

const initialState = {
  partiesData: [],
  isLoading: false,
  isFailed: false,
  purchaseBillData: [],
  paymentOutData: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PARTIES_POST_REQUEST:
    case PARTIES_PURCHASE_BILL_REQUEST:
    case PARTIES_PAYMENT_OUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isFailed: false,
      };

    case PARTIES_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        partiesData: payload,
      };

    case PARTIES_PURCHASE_BILL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        purchaseBillData: payload,
      };

    case PARTIES_PAYMENT_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentOutData: payload,
      };

    case PARTIES_POST_FAILED:
    case PARTIES_PURCHASE_BILL_FAILURE:
    case PARTIES_PAYMENT_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isFailed: true,
      };

    default:
      return state;
  }
};
