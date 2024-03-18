import {
   ITEM_REQUEST,
   ITEM_FAILURE,
   GET_ITEM_SUCCESS,
   POST_ITEM_SUCCESS,
   LOADING_SINGLE_ITEM,
   ERROR_SINGLE_ITEM,
   SUCCESS_SINGLE_ITEM,
   LOADING_GET_ALL_ITEMS,
   ERROR_GET_ALL_ITEMS,
   SUCCESS_GET_ALL_ITEMS,
   EDIT_ITEM_SUCCESS,
} from "./actionTypes";

const initialState = {
   isLoading: false,
   isError: false,
   items: [],
   toggleItems: false,
   allItems: [],
   //   Get Single Items Action
   getSingleLoading: false,
   getSingleError: false,
   singleItemData: [],
   toggleGetItemSuccess: false,

   //   Get All Items Action
   getAllItemsLoading: false,
   getAllItemsError: false,
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
         // console.log("payload-", payload);
         return {
            ...state,
            isLoading: false,
            // items: payload  ,
            toggleItems: !state.toggleItems,
         };
      }
      case EDIT_ITEM_SUCCESS: {
         return {
            isLoading: false,
            toggleItems: !state.toggleItems,
         };
      }
      case ITEM_FAILURE: {
         return { ...state, isLoading: false, isError: true };
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
         };
      }

      //  Single Item get actions
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
      default: {
         return state;
      }
   }
};
