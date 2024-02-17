   import {
      ITEM_REQUEST,
      ITEM_FAILURE,
      GET_ITEM_SUCCESS,
      POST_ITEM_SUCCESS,
   } from "./actionTypes";

   const initialState = {
      isLoading: false,
      isError: false,
      items: [],  
   };

   export const reducer = (state = initialState, { type, payload }) => {
      switch (type) {
         case ITEM_REQUEST: {
            return { ...state, isLoading: true };
         }
         case GET_ITEM_SUCCESS: {
            return { ...state, isLoading: false, items: payload };  
         }
         case POST_ITEM_SUCCESS: {
            return {
               ...state,
               isLoading: false,
               items: [...state.items, payload],  
            }; 
         }
         case ITEM_FAILURE: {
            return { ...state, isLoading: false, isError: true };
         }
         default: {
            return state;
         }
      }
   };
