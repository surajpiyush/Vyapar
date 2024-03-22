import { GENERAL } from "./actionTypes";

const initialState = {
   application: [],
   itemTable: Array(12).fill(false), // Initialize with 12 checkboxes unchecked
   taxesDiscount: Array(12).fill(false),
   moreTransaction: Array(12).fill(false),
   transactionPrefixes: Array(12).fill(false),
};

export const reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case GENERAL:
         {
            return {
               ...state,
               application: payload,
            };
        }

      case 'SET_CHECKBOX':
         {
            const { section, index, isChecked } = payload;
            return {
               ...state,
               [section]: [
                  ...state[section].slice(0, index), // Keep the previous checkboxes
                  isChecked, // Update the checkbox value at index
                  ...state[section].slice(index + 1), // Keep the following checkboxes
               ],
            };
         }

      default:
         return state;
   }
};
