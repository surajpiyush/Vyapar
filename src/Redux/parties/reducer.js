import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
  SAVE_PARTY_INPUT_CHANGE,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  partiesData: [],

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

export const reducer = (state = initialState, { type, payload, name }) => {
  switch (type) {
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
    default:
      return state;
  }
};
