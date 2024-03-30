import {
  ITEM_REQUEST,
  ITEM_FAILURE,
  GET_ITEM_SUCCESS,
  POST_ITEM_SUCCESS,
  GET_ALL_UNITS_LOADING,
  GET_ALL_UNITS_SUCCESS,
  ADDING_UNIT_SUCCESS,
  LOADING_SINGLE_ITEM,
  ERROR_SINGLE_ITEM,
  SUCCESS_SINGLE_ITEM,
  LOADING_GET_ALL_ITEMS,
  ERROR_GET_ALL_ITEMS,
  SUCCESS_GET_ALL_ITEMS,
  LOADING_UPDATE_ITEM,
  ERROR_UPDATE_ITEM,
  SUCCESS_UPDATE_ITEM,
  LOADING_DELETE_ITEM,
  ERROR_DELETE_ITEM,
  SUCCESS_DELETE_ITEM,
  LOADING_GET_SELECTED_ITEM,
  ERROR_GET_SELECTED_ITEM,
  SUCCESS_GET_SELECTED_ITEM,
  GET_All_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  ADDING_UNIT_ERROR,
  ADDING_UNIT_LOADING,
  GET_ALL_UNITS_ERROR,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_LOADING,
  GET_All_CATEGORIES_LOADING,
  GET_All_CATEGORIES_ERROR,
  LOADING_UPDATE_CATEGORY,
  ERROR_UPDATE_CATEGORY,
  SUCCESS_UPDATE_CATEGORY,
  LOADING_DELETE_CATEGORY,
  ERROR_DELETE_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
  LOADING_UPDATE_UNIT,
  ERROR_UPDATE_UNIT,
  SUCCESS_UPDATE_UNIT,
  LOADING_DELETE_UNIT,
  ERROR_DELETE_UNIT,
  SUCCESS_DELETE_UNIT,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  items: [],
  toggleItems: false,
  allItems: [],

  //   Get Single Items States
  getSingleLoading: false,
  getSingleError: false,
  singleItemData: [],
  toggleGetItemSuccess: false,

  //   Get All Items states
  getAllItemsLoading: false,
  getAllItemsError: false,
  fetchAllItemsSuccessToggle: false,

  // Get Selected Item Data states
  loadingGetSelectedItemData: false,
  errorGetSelectedItemData: false,
  selectedItemData: {},
  selectedItemTransactionData: {},

  // Update Item states
  loadingUpdate: false,
  errorUpdate: false,

  // Delete states
  loadingDelete: false,
  errorDelete: false,

  // Add New Category
  loadingAddCategory: false,
  errorAddCategory: false,
  newCategoryAddedToggle: false,

  //   Get All Categories
  category: [],
  loadingGetAllCategories: false,
  errorGetAllCategories: false,

  // Add Unit
  loadingAddUnit: false,
  errorAddUnit: false,
  newUnitAddedToggle: false,

  // Get All Units
  unit: [],
  loadingGetAllUnits: false,
  errorGetAllUnits: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ITEM_REQUEST: {
      return { ...state, isLoading: true, isError: false };
    }
    case GET_ITEM_SUCCESS: {
      return { ...state, isLoading: false, items: payload };
    }
    case POST_ITEM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        // items: payload,
        toggleItems: !state.toggleItems,
      };
    }
    case ITEM_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }

    // Get Selected Item Data actions
    case LOADING_GET_SELECTED_ITEM: {
      return {
        ...state,
        loadingGetSelectedItemData: true,
        errorGetSelectedItemData: false,
      };
    }
    case ERROR_GET_SELECTED_ITEM: {
      return {
        ...state,
        loadingGetSelectedItemData: false,
        errorGetSelectedItemData: true,
      };
    }
    case SUCCESS_GET_SELECTED_ITEM: {
      return {
        ...state,
        loadingGetSelectedItemData: false,
        selectedItemData: payload?.selectedItemData,
        selectedItemTransactionData: payload?.selectedItemTransactionData,
      };
    }

    //  Get All Items
    case LOADING_GET_ALL_ITEMS: {
      return { ...state, getAllItemsLoading: true, getAllItemsError: false };
    }
    case ERROR_GET_ALL_ITEMS: {
      return { ...state, getAllItemsLoading: false, getAllItemsError: true };
    }
    case SUCCESS_GET_ALL_ITEMS: {
      return {
        ...state,
        getAllItemsLoading: false,
        items: payload,
        allItems: payload,
        fetchAllItemsSuccessToggle: !state.fetchAllItemsSuccessToggle,
      };
    }

    //  Single Item get
    case LOADING_SINGLE_ITEM: {
      return { ...state, getSingleLoading: true, getSingleError: false };
    }
    case ERROR_SINGLE_ITEM: {
      return { ...state, getSingleLoading: false, getSingleError: true };
    }
    case SUCCESS_SINGLE_ITEM: {
      return {
        ...state,
        getSingleLoading: false,
        singleItemData: payload,
        toggleGetItemSuccess: !state.toggleGetItemSuccess,
      };
    }

    // Update Item
    case LOADING_UPDATE_ITEM: {
      return { ...state, loadingUpdate: true, errorUpdate: false };
    }
    case ERROR_UPDATE_ITEM: {
      return { ...state, loadingUpdate: false, errorUpdate: true };
    }
    case SUCCESS_UPDATE_ITEM: {
      return {
        ...state,
        isLoading: false,
        loadingUpdate: false,
        toggleItems: !state.toggleItems,
      };
    }

    // Delete Item
    case LOADING_DELETE_ITEM: {
      return { ...state, loadingDelete: true, errorDelete: false };
    }
    case ERROR_DELETE_ITEM: {
      return { ...state, loadingDelete: false, errorDelete: true };
    }
    case SUCCESS_DELETE_ITEM: {
      return {
        ...state,
        loadingDelete: false,
        toggleItems: !state.toggleItems,
      };
    }

    // ========================= Category =========================
    //  Add New Category
    case ADD_CATEGORY_LOADING: {
      return {
        ...state,
        isLoading: true,
        loadingAddCategory: true,
        errorAddCategory: false,
      };
    }
    case ADD_CATEGORY_ERROR: {
      return {
        ...state,
        isLoading: false,
        loadingAddCategory: false,
        errorAddCategory: true,
      };
    }
    case ADD_CATEGORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        loadingAddCategory: false,
        newCategoryAddedToggle: !state.newCategoryAddedToggle,
      };
    }
    //  Get All Categories
    case GET_All_CATEGORIES_LOADING: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        loadingGetAllCategories: true,
        errorGetAllCategories: false,
      };
    }
    case GET_All_CATEGORIES_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        loadingGetAllCategories: false,
        errorGetAllCategories: true,
      };
    }
    case GET_All_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        loadingGetAllCategories: false,
        category: payload,
      };
    }
    // Update Category
    case LOADING_UPDATE_CATEGORY: {
      return { ...state, loadingUpdate: true, errorUpdate: false };
    }
    case ERROR_UPDATE_CATEGORY: {
      return { ...state, loadingUpdate: false, errorUpdate: true };
    }
    case SUCCESS_UPDATE_CATEGORY: {
      return {
        ...state,
        isLoading: false,
        loadingUpdate: false,
        toggleItems: !state.toggleItems,
      };
    }
    // Delete Category
    case LOADING_DELETE_CATEGORY: {
      return { ...state, loadingDelete: true, errorDelete: false };
    }
    case ERROR_DELETE_CATEGORY: {
      return { ...state, loadingDelete: false, errorDelete: true };
    }
    case SUCCESS_DELETE_CATEGORY: {
      return {
        ...state,
        loadingDelete: false,
        toggleItems: !state.toggleItems,
      };
    }

    // ========================= Unit =========================
    // Get all Units
    case GET_ALL_UNITS_LOADING: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        loadingGetAllUnits: true,
        errorGetAllUnits: false,
      };
    }
    case GET_ALL_UNITS_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        loadingGetAllUnits: false,
        errorGetAllUnits: true,
      };
    }
    case GET_ALL_UNITS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        loadingGetAllUnits: false,
        unit: payload,
      };
    }
    //  Adding New Unit
    case ADDING_UNIT_LOADING: {
      return {
        ...state,
        // isLoading: true,
        // isError: false,
        loadingAddUnit: true,
        errorAddUnit: false,
      };
    }
    case ADDING_UNIT_ERROR: {
      return {
        ...state,
        // isLoading: false,
        // isError: true,
        loadingAddUnit: false,
        errorAddUnit: true,
      };
    }
    case ADDING_UNIT_SUCCESS: {
      return {
        ...state,
        // isLoading: false,
        loadingAddUnit: false,
        toggleItems: !state.toggleItems,
        newUnitAddedToggle: !state.newUnitAddedToggle,
      };
    }
    // Update Unit
    case LOADING_UPDATE_UNIT: {
      return { ...state, loadingUpdate: true, errorUpdate: false };
    }
    case ERROR_UPDATE_UNIT: {
      return { ...state, loadingUpdate: false, errorUpdate: true };
    }
    case SUCCESS_UPDATE_UNIT: {
      return {
        ...state,
        // isLoading: false,
        loadingUpdate: false,
        toggleItems: !state.toggleItems,
      };
    }
    // Delete Unit
    case LOADING_DELETE_UNIT: {
      return { ...state, loadingDelete: true, errorDelete: false };
    }
    case ERROR_DELETE_UNIT: {
      return { ...state, loadingDelete: false, errorDelete: true };
    }
    case SUCCESS_DELETE_UNIT: {
      return {
        ...state,
        loadingDelete: false,
        toggleItems: !state.toggleItems,
      };
    }

    default: {
      return state;
    }
  }
};
