// reducer.js
import { UPDATE_CHECKBOX, UPDATE_SELECT_SETTING } from "./actionTypes";

const transactionInitialState = {
   transactionsBox: {
      "Invoice/Bill Number": true,
      "Add Time on Transactions": true,
      "Print Time on Invoices": true,
      "Cash Sale by default": true,
      "Billing Name of Parties": true,
      "Customers P.O Details on Transaction": true,
   },
   moreTransactionFeatures: {
      "E-way bill no": true,
      "Quik Entry": true,
      "Do not Show Invoice Preview": true,
      "Enable Passcode htmlFor transaction": true,
      "Discount During Payments": true,
      "Link Payments to Invoices": true,
      "Due Dates and Payment Terms": true,
      "Show Profit while making Sale Invoice": true,
   },
   itemTableCheckboxes: {
      "Inclusive/Exclusive Tax on Rate(Price/Unit)": true,
      "Display Purchase Price of Items": true,
      "Show last 5 Sale Price of Items": true,
      "Free Item Quantity": true,
      Count: true,
   },
   taxesDiscountTotalsState: {
      "Transaction wise Tax": true,
      "Transaction wise Discount": true,
      "Round Off Total": true,
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

const itemInitialState = {
   item: {
      // Item settings
      "Enable Barcode": true,
      "What Do You Sell": "",
      "BarCode Scan": true,
      "Stock Maintenance": true,
      Manufacturing: true,
      "Show Low Stock Dialog": true,
      "Items Unit": true,
      "Default Unit": true,
      "Item Category": true,
      "Party Wise Item Rate": true,
      Description: true,
      "Item Wise Tax": true,
      "Item Wise Discount": true,
      "Update Sale Price From Transaction": true,
      Quantity: true,
      WholesalePrice: true,
   },
   additionalItemFiels: {
      // Additional item fields
      mrp: "",
      serialNoTracking: true,
      serialNoValue: "",
      batchTracking: true,
      batchNoValue: "",
      expDate: "",
      mfgDate: "",
      modelNo: "",
      size: "",
   },
};

const partyInitialState = {
   // Define initial state for product page here
};

const gstTaxInitialState = {
   gst: {
      "Enable GST": true,
      "Enable HSN/SAC Code": true,
      "Additional Cess On Item": true,
      "Reverse Charge": true,
      "Enable Place Of Supply": true,
      "Composite Scheme": true,
      "Enable TCS": true,
   },
};

const initialState = {
   transaction: transactionInitialState,
   gst: gstTaxInitialState,
   item: itemInitialState,
   party: partyInitialState,
};

export const reducer = (state = initialState, action) => {
   switch (action.type) {
      case UPDATE_CHECKBOX: {
         // here page is transaction
         const { page, section, name, value } = action.payload;
         return {
            ...state,
            [page]: {
               ...state[page],
               [section]: {
                  ...state[page][section],
                  [name]: value,
               },
            },
         };
      }
      case UPDATE_SELECT_SETTING: {
         const { page, section, key, value } = action.payload;
         return {
            ...state,
            [page]: {
               ...state[page],
               [section]: {
                  ...state[page][section],
                  [key]: value,
               },
            },
         };
      }
      default:
         return state;
   }
};
