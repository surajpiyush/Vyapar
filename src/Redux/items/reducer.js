import {
   ITEM_REQUEST,
   ITEM_FAILURE,
   GET_ITEM_SUCCESS,
   POST_ITEM_SUCCESS,
   UNIT_REQUEST,
   UNIT_FAILURE,
 GETTING_UNIT,
 ADDING_UNIT,
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
   GETTING_CATEGORY,
   ADDING_CATEGORY,
} from "./actionTypes";

const initialState = {
   isLoading: false,
   isError: false,
   items: [],
   toggleItems: false,
   allItems: [],
   category: [],

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

   // unit
   unit :[],
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

      // Category

      case GETTING_CATEGORY: {
         return {
            ...state,
            category: payload,
            isLoading: false,
         };
      }
      case ADDING_CATEGORY:
         return {
            ...state,
            isLoading: false,
         };

      // Unit=========================

      case UNIT_REQUEST: {
         return { ...state, isLoading: true, isError: false };
      }
      case GETTING_UNIT: {
         return { ...state, isLoading: false, unit: payload };
      }
      case ADDING_UNIT: {
         return {
            ...state,
            isLoading: false,
            // items: payload,
            toggleItems: !state.toggleItems,
         };
      }
      case UNIT_FAILURE: {
         return { ...state, isLoading: false, isError: true };
      }

      default: {
         return state;
      }
   }
};
