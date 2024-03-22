// reducer.js
import { UPDATE_CHECKBOX, UPDATE_SELECT_SETTING } from "./actionTypes";

const initialState = {
   transactionsBox: {
      "Invoice/Bill Number": false,
      "Add Time on Transactions": false,
      "Print Time on Invoices": false,
      "Cash Sale by default": false,
      "Billing Name of Parties": false,
      "Customers P.O Details on Transaction": false,
   },
   moreTransactionFeatures: {
      "E-way bill no": false,
      "Quik Entry": false,
      "Do not Show Invoice Preview": false,
      "Enable Passcode htmlFor transaction": false,
      "Discount During Payments": false,
      "Link Payments to Invoices": false,
      "Due Dates and Payment Terms": false,
      "Show Profit while making Sale Invoice": false,
   },
   itemTableCheckboxes: {
      "Inclusive/Exclusive Tax on Rate(Price/Unit)": false,
      "Display Purchase Price of Items": false,
      "Show last 5 Sale Price of Items": false,
      "Free Item Quantity": false,
      Count: false,
   },
   taxesDiscountTotalsState: {
      "Transaction wise Tax": false,
      "Transaction wise Discount": false,
      "Round Off Total": false,
      nearestSelectValue: "volvo",
      toSelectValue: "1",
   },
   transactionPrefixesState: {
      firmSelectValue: "hariom",
      saleSelectValue: "None",
      creditNoteSelectValue: "None",
      saleOrderSelectValue: "None",
      purchaseOrderSelectValue: "None",
      estimateSelectValue: "None",
      deliveryChallanSelectValue: "None",
      paymentInSelectValue: "None",
   },
};

export const reducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_CHECKBOX: {
         const { section, name, value } = action.payload;
         return {
            ...state,
            [section]: {
               ...state[section],
               [name]: value,
            },
         };
         break;
      }
      case UPDATE_SELECT_SETTING: {
         const { section, key, value } = action.payload;
         return {
            ...state,
            [section]: {
               ...state[section],
               [key]: value,
            },
         };
         break;
      }
      default:
         return state;
   }
};
