import {
  ISERROR,
  ISLOADING,
  SUCCESS,
  INPUTCHANGE,
  SET_CURRENT_COMPANY,
  UPDATE_PROFILE_SUCCESS,
  FETCH_COMPANIES_SUCCESS,
} from "./actionTypes";

// Initial States
const initState = {
  isLoading: false,
  isError: false,
  allCompaniesData: [],
  newFetched: false,

  // Register Company
  companyName: "",
  email: "",
  password: "",
  toggleUpdate: false,

  // Current Company States
  currentCompId: "",
  currentCompanyName: "",
  currentEmail: "",
  phoneNumber: "",
};

// Reducer Function
export const reducer = (state = initState, { type, payload, name }) => {
  switch (type) {
    // Register Company Action
    case ISLOADING: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case ISERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        isLoading: false,
        toggleUpdate: !state.toggleUpdate,
        companyName: "",
        email: "",
        password: "",
      };
    }
    // Update Company Profile Actions
    case SET_CURRENT_COMPANY: {
      return {
        ...state,
        ...payload,
        toggleUpdate: !state.toggleUpdate,
      };
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        toggleUpdate: !state.toggleUpdate,
      };
    }
    // Get all companies data
    case FETCH_COMPANIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        newFetched: !state.newFetched,
        allCompaniesData: payload,
      };
    }
    case INPUTCHANGE: {
      return {
        ...state,
        [name]: payload,
      };
    }
    default: {
      return state;
    }
  }
};
