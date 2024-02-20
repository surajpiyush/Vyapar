import {
  GET_PURCHASEBILL_SUCCESS,
  POST_PURCHASEBILL_SUCCESS,
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

  // paymentOutData: [],
  // savePartyLoading: false,
  // savePartyError: false,
  // togglePartiesData: false,

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
        purchaseBillData: [1, 2, 3, 4, 5, 6],
      };
    }
    case POST_PURCHASEBILL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        items: [...state.purchaseBillData, payload],
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
