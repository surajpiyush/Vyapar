import {
   FETCH_PARTIES_LOADING,
   FETCH_PARTIES_ERROR,
   FETCH_PARTIES_SUCCESS,
   CHANGE_CURRENT_PARTY,
   SAVE_PARTY_LOADING,
   SAVE_PARTY_ERROR,
   SAVE_PARTY_SUCCESS,
   SAVE_PARTY_INPUT_CHANGE,
   CURRENT_PARTIES_TRANSECATIONS_SUCCESS,
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
      // Fetch Parties Data Actions
      case FETCH_PARTIES_LOADING:
         return { ...state, isLoading: true, isError: false };
      case FETCH_PARTIES_ERROR:
         return { ...state, isLoading: false, isError: true };
      case FETCH_PARTIES_SUCCESS:
         return {
            ...state,
            isLoading: false,
            currentParty: payload[0]._id || "",
            partiesData: payload,
         };

      // Change Current Party
      case CHANGE_CURRENT_PARTY:
         return { ...state, currentParty: payload };

      // Save Party Actions
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

      case CURRENT_PARTIES_TRANSECATIONS_SUCCESS: {
         return {
            ...state,
            currentPartyTansection: payload,
         };
      }
      default:
         return state;
   }
};
