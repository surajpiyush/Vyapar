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

// ##############################
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
// ##############################

const initialState = {
  general: generalInitalState,
  transaction: transactionInitialState,
  taxAndgst: taxAndgstInitalState,
  item: itemInitialState,
  party: partyInitialState,
};

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
