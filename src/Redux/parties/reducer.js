import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  CHANGE_CURRENT_PARTY,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
  SAVE_PARTY_INPUT_CHANGE,
  LOADING_GET_CURRENT_PARTY,
  ERROR_GET_CURRENT_PARTY,
  SUCCESS_GET_CURRENT_PARTY,
  LOADING_DELETE_PARTY,
  ERROR_DELETE_PARTY,
  SUCCESS_DELETE_PARTY,
  EDIT_PARTY_LOADING,
  EDIT_PARTY_ERROR,
  SUCCESS_EDIT_PARTY,
} from "./actionTypes";

const initialState = {
  partiesData: [],
  isLoading: false,
  isFailed: false,
  isError: false,
  purchaseBillData: [],
  paymentOutData: [],

  // Current Party
  currentParty: "",
  currentPartyTansection: [],

  postPartyLoading: false,
  savePartyError: false,
  togglePartiesData: false,

  // Get Current Party data states
  currentPartyTansection: [],
  loadingGetCurrentPartyData: false,
  errorGetCurrentPartyData: false,

  // Edit Party states
  loadingEdit: false,
  errorEdit: false,

  //   Delete Party states
  loadingDeleteParty: false,
  errorDeleteParty: false,
  partyName: "",
  gstNo: "",
  phoneNumber: "",
  partyGroup: "",
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
        currentParty: payload[0]?._id || "",
        partiesData: payload,
      };
    case CHANGE_CURRENT_PARTY:
      return { ...state, currentParty: payload };
    case SAVE_PARTY_LOADING:
      return { ...state, postPartyLoading: true, savePartyError: false };
    case SAVE_PARTY_ERROR:
      return { ...state, postPartyLoading: false, savePartyError: true };
    case SAVE_PARTY_SUCCESS:
      return {
        ...state,
        postPartyLoading: false,
        togglePartiesData: !state.togglePartiesData,
      };
    case SAVE_PARTY_INPUT_CHANGE:
      return { ...state, [name]: payload };

    // Get Current Party actions
    case LOADING_GET_CURRENT_PARTY:
      return {
        ...state,
        loadingGetCurrentPartyData: true,
        errorGetCurrentPartyData: false,
      };
    case ERROR_GET_CURRENT_PARTY:
      return {
        ...state,
        loadingGetCurrentPartyData: false,
        errorGetCurrentPartyData: true,
      };
    case SUCCESS_GET_CURRENT_PARTY:
      return {
        ...state,
        loadingGetCurrentPartyData: false,
        currentPartyTansection: payload,
      };

    // Edit Party actions
    case EDIT_PARTY_LOADING: {
      return {
        ...state,
        loadingEdit: true,
        errorEdit: false,
      };
    }
    case EDIT_PARTY_ERROR: {
      return {
        ...state,
        loadingEdit: false,
        errorEdit: true,
      };
    }
    case SUCCESS_EDIT_PARTY: {
      return {
        ...state,
        loadingEdit: false,
        togglePartiesData: !state.togglePartiesData,
      };
    }

    // Delete Party actions
    case LOADING_DELETE_PARTY: {
      return {
        ...state,
        loadingDeleteParty: true,
        errorDeleteParty: false,
      };
    }
    case ERROR_DELETE_PARTY: {
      return {
        ...state,
        loadingDeleteParty: false,
        errorDeleteParty: true,
      };
    }
    case SUCCESS_DELETE_PARTY: {
      return {
        ...state,
        loadingDeleteParty: false,
        togglePartiesData: !state.togglePartiesData,
      };
    }
    default:
      return state;
  }
};
