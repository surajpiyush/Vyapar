import { ISERROR, ISLOADING, SUCCESS, INPUTCHANGE } from "./actionTypes";

// Initial States
const initState = {
  isLoading: false,
  isError: false,
  data: {},
  companyName: "",
  email: "",
  password: "",
};

// Reducer Function
export const reducer = (state = initState, { type, payload, name }) => {
  switch (type) {
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
        data: payload,
        // companyName: "",
        // email: "",
        // password: "",
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
