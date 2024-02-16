import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
  SAVE_PARTY_INPUT_CHANGE,
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
  isError: false,
  purchaseBillData: [],
  paymentOutData: [],

  savePartyLoading: false,
  savePartyError: false,
  togglePartiesData: false,

  partyName: "",
  gstNo: "",
  phoneNumber: "",
  GSTType: "",
  state: "",
  email: "",
  billingAddress: "",
  shippingAddress: "",
  openingBalance: "",
  asOfDate: "",
  creditLimit: "",
};
console.log("test1");

export const reducer = (state = initialState, { type, payload, name }) => {
  switch (type) {
    // Fetch Parties Data Actions
    case FETCH_PARTIES_LOADING:
      return { ...state, isLoading: true, isError: false };
    case FETCH_PARTIES_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_PARTIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        partiesData: payload,
      };

    // Save Party Actions
    case SAVE_PARTY_LOADING:
      return { ...state, savePartyLoading: true, savePartyError: false };
    case SAVE_PARTY_ERROR:
      return { ...state, savePartyLoading: false, savePartyError: true };
    case SAVE_PARTY_SUCCESS:
      return {
        ...state,
        savePartyLoading: true,
        togglePartiesData: !state.togglePartiesData,
      };
    case SAVE_PARTY_INPUT_CHANGE:
      return { ...state, [name]: payload };

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
