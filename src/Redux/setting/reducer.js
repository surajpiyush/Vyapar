// reducer.js
import { UPDATE_CHECKBOX, UPDATE_SELECT_SETTING } from "./actionTypes";

const transactionInitialState = {
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

const itemInitialState = {
   item: {
      // Item settings
      "Enable Barcode": false,
      "What Do You Sell": "",
      "BarCode Scan": false,
      "Stock Maintenance": false,
      Manufacturing: false,
      "Show Low Stock Dialog": false,
      "Items Unit": false,
      "Default Unit": false,
      "Item Category": false,
      "Party Wise Item Rate": false,
      Description: false,
      "Item Wise Tax": false,
      "Item Wise Discount": false,
      "Update Sale Price From Transaction": false,
      Quantity: true,
      WholesalePrice: false,
   },
   additionalItemFiels: {
      // Additional item fields
      mrp: "",
      serialNoTracking: false,
      serialNoValue: "",
      batchTracking: false,
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
      "Additional Cess On Item": false,
      "Reverse Charge": false,
      "Enable Place Of Supply": false,
      "Composite Scheme": false,
      "Enable TCS": false,
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
