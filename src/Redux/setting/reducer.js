// reducer.js
import { UPDATE_CHECKBOX, UPDATE_SELECT_SETTING } from "./actionTypes";

// General
const generalInitalState = {
  application: {
    "Enable Passcode": false,
    "Business Currency": "Rs",
    Amount: 2,
    "GSTIN Number": false,
  },
  backupAndHistory: {
    "Auto Backup": false,
    "Auto Backup": "",
    "Audit Trail": true,
  },
  moreTransactions: {
    "Estimate/Quotation": true,
    "Sale/Purchase Order": true,
    "Other Income": false,
    "Fixed Assets (FA)": false,
    "Delivery Challan": true,
    "Goods return on Delivery Challan": true,
    "Print amount in Delivery Challan": false,
  },
};

// Transaction
const transactionInitialState = {
  transactionHeader: {
    "Invoice/Bill No.": true,
    "Add Time on Transactions": false,
    "Cash Sale by default": false,
    "Billing Name of Parties": false,
    "Customers P.O Details on Transactions": false,
  },
  itemsTable: {
    "Inclusive/Exclusive Tax on Rate(Price/Unit)": true,
    "Display Purchase Price of Items": true,
    "Show last 5 Sale Price of Items": false,
    "Free Item Quantity": false,
    Count: false,
  },
  taxesDiscountAndTotals: {
    "Transaction wise Tax": false,
    "Transaction wise Discount": false,
    "Round Off Total": true,
    nearestValue: "Nearest",
    toValue: "1",
  },
  moreTransactionFeatures: {
    "E-way bill no": false,
    "Quik Entry": false,
    "Do not Show Invoice Preview": false,
    "Enable Passcode for transaction edit/delete": false,
    "Discount During Payments": false,
    "Link Payments to Invoices": false,
    "Due Dates and Payment Terms": false,
    "Show Profit while making Sale Invoice": false,
  },
};

// Tax & Gst
const taxAndgstInitalState = {
  gstSettings: {
    "Enable GST": true,
    "Enable HSN/SAC Code": true,
    "Additional Cess On Item": false,
    "Reverse Charge": false,
    "Enable Place Of Supply": true,
    "Composite Scheme": false,
    "Enable TCS": false,
  },
};

// Party
const partyInitialState = {
  partySettings: {
    "Party Grouping": false,
    "Shipping Address": false,
    "Enable Payment Reminder": true,
    "Remind me for payment due in": 1,
  },
  enableLoyaltyPoint: {
    "Enable Loyalty Point": false,
  },
};

// Item
const itemInitialState = {
  itemSettings: {
    "Enable Item": true,
    "What Do You Sell": "Product/Service",
    "Barcode Scan": false,
    "Stock Maintenance": true,
    Manufacturing: false,
    "Show Low Stock Dialog": true,
    "Items Unit": true,
    "Default Unit": false,
    "Item Category": true,
    "Party Wise Item Rate": false,
    Description: false,
    "Item Wise Tax": true,
    "Item Wise Discount": true,
    "Update Sale Price from Transaction": false,
    Quantity: 2,
    "Wholesale Price": false,
  },
  additionalItemFiels: {
    MRP: "",
    "Serial No./ IMEI No. etc": false,
    "Serial No Value": "",
    "Batch No.": false,
    "Batch No Value": "",
    "Exp Date": false,
    "Exp Date Value": "",
    "MFG Date": false,
    "MFG Date Value": "",
    "Model No": false,
    "Model No Value": "",
    Size: false,
    "Size Value": "",
  },
};

// Initial State
const initialState = {
  general: generalInitalState,
  transaction: transactionInitialState,
  taxAndgst: taxAndgstInitalState,
  party: partyInitialState,
  item: itemInitialState,
};

// Reducer
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CHECKBOX: {
      // here page is transaction
      const { page, section, name, value } = payload;
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
      const { page, section, key, value } = payload;
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
