import {
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_LOADING,
  GET_ALL_CATEGORIES_ERROR,
  GET_ALL_CATEGORIES_SUCCESS,
  ADD_ITEM_LOADING,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ALL_ITEMS_LOADING,
  GET_ALL_ITEMS_ERROR,
  GET_ALL_ITEMS_SUCCESS,
  ADD_EXPENSE_LOADING,
  ADD_EXPENSE_ERROR,
  ADD_EXPENSE_SUCCESS,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,

  // ----------------------------- CATEGORY ----------------------------------
  // Add Category
  loadingAddCategory: false,
  errorAddCategory: false,
  toggleAddCategorySuccess: false,

  // Get All Categories
  categoryData: [],
  toggleGetAllCategoriesSuccess: false,

  // ----------------------------- ITEM -------------------------------------
  // Add Item
  loadingAddItem: false,
  errorAddItem: false,
  toggleAddItemSuccess: false,

  // Get All Items
  itemsData: [],
  toggleGetAllItemsSuccess: false,

  // ----------------------------- EXPENSE -------------------------------------
  // Add Expense
  loadingAddExpense: false,
  errorAddExpense: false,
  toggleAddExpenseSuccess: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // ----------------------------- CATEGORY ----------------------------------
    // Add Category
    case ADD_CATEGORY_LOADING: {
      return { ...state, loadingAddCategory: true, errorAddCategory: false };
    }
    case ADD_CATEGORY_ERROR: {
      return { ...state, loadingAddCategory: false, errorAddCategory: true };
    }
    case ADD_CATEGORY_SUCCESS: {
      return {
        ...state,
        loadingAddCategory: false,
        toggleAddCategorySuccess: !state.toggleAddCategorySuccess,
      };
    }
    // Get All Categories
    case GET_ALL_CATEGORIES_LOADING: {
      return { ...state, isLoading: true, isError: false };
    }
    case GET_ALL_CATEGORIES_ERROR: {
      return { ...state, isLoading: false, isError: true };
    }
    case GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categoryData: payload,
        isLoading: false,
        toggleGetAllCategoriesSuccess: !state.toggleGetAllCategoriesSuccess,
      };
    }

    // ----------------------------- ITEM ----------------------------------
    // Add Item
    case ADD_ITEM_LOADING: {
      return { ...state, loadingAddItem: true, errorAddItem: false };
    }
    case ADD_ITEM_ERROR: {
      return { ...state, loadingAddItem: false, errorAddItem: true };
    }
    case ADD_ITEM_SUCCESS: {
      return {
        ...state,
        loadingAddItem: false,
        toggleAddItemSuccess: !state.toggleAddItemSuccess,
      };
    }
    // Get All Items
    case GET_ALL_ITEMS_LOADING: {
      return { ...state, isLoading: true, isError: false };
    }
    case GET_ALL_ITEMS_ERROR: {
      return { ...state, isLoading: false, isError: true };
    }
    case GET_ALL_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsData: payload,
        isLoading: false,
        toggleGetAllItemsSuccess: !state.toggleGetAllItemsSuccess,
      };
    }

    // ----------------------------- EXPENSE ----------------------------------
    // Add Expense
    case ADD_EXPENSE_LOADING: {
      return { ...state, loadingAddExpense: true, errorAddExpense: false };
    }
    case ADD_EXPENSE_ERROR: {
      return { ...state, loadingAddExpense: false, errorAddExpense: true };
    }
    case ADD_EXPENSE_SUCCESS: {
      return {
        ...state,
        loadingAddExpense: false,
        toggleAddExpenseSuccess: !state.toggleAddExpenseSuccess,
      };
    }

    default:
      return state;
  }
};
