import { EDIT_EXPENSE_ERROR, EDIT_EXPENSE_LOADING, ERROR_DELETE_EXPENSE, ERROR_GET_CURRENT_EXPENSE, FETCH_EXPENSES_ERROR, FETCH_EXPENSES_LOADING, FETCH_EXPENSES_SUCCESS, LOADING_DELETE_EXPENSE, LOADING_GET_CURRENT_EXPENSE, SUCCESS_DELETE_EXPENSE, SUCCESS_EDIT_EXPENSE, SUCCESS_GET_CURRENT_EXPENSE } from "./actionTypes";


const initialState = {
  expenseData: [],
  isLoading: false,
  isFailed: false,
  isError: false,

  expenseCategory:[],

currentExpense:"",
  // Get Current Party data states
  currentExpenseTansection: [],
  loadingGetCurrentExpenseData: false,
  errorGetCurrentExpenseData: false,

  // Edit Expense states
  loadingEdit: false,
  errorEdit: false,

  //   Delete Expense states
  loadingDeleteExpense: false,
  errorDeleteExpense: false,
};

export const reducer = (state = initialState, { type, payload, name }) => {
  switch (type) {
    case FETCH_EXPENSES_LOADING:
      return { ...state, isLoading: true, isError: false };
    case FETCH_EXPENSES_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_EXPENSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentExpense: payload[0]?._id || "",
        expenseCategory: payload,
      };
    
       
    // Get Current Party actions
    case LOADING_GET_CURRENT_EXPENSE:
      return {
        ...state,
        loadingGetCurrentExpenseData: true,
        errorGetCurrentExpenseData: false,
      };
    case ERROR_GET_CURRENT_EXPENSE:
      return {
        ...state,
        loadingGetCurrentExpenseData: false,
        errorGetCurrentExpenseData: true,
      };
    case SUCCESS_GET_CURRENT_EXPENSE:
      return {
        ...state,
        loadingGetCurrentExpenseData: false,
        currentExpenseTansection: payload,
      };

    // Edit Expense actions
    case EDIT_EXPENSE_LOADING: {
      return {
        ...state,
        loadingEdit: true,
        errorEdit: false,
      };
    }
    case EDIT_EXPENSE_ERROR: {
      return {
        ...state,
        loadingEdit: false,
        errorEdit: true,
      };
    }
    case SUCCESS_EDIT_EXPENSE: {
      return {
        ...state,
        loadingEdit: false,
        // toggleExpensesData: !state.togglePartiesData,
      };
    }

    // Delete Party actions
    case LOADING_DELETE_EXPENSE: {
      return {
        ...state,
        loadingDeleteExpense: true,
        errorDeleteExpense: false,
      };
    }
    case ERROR_DELETE_EXPENSE: {
      return {
        ...state,
        loadingDeleteExpense: false,
        errorDeleteExpense: true,
      };
    }
    case SUCCESS_DELETE_EXPENSE: {
      return {
        ...state,
        loadingDeleteExpense: false,
        // toggleExpensesData: !state.togglePartiesData,
      };
    }
    default:
      return state;
  }
};
