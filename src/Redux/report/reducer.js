import {
  GET_ALL_TRANSACTIONS_SUCCESS,
  GET_DAYBOOK_SUCCESS,
  GET_PURCHASE_REPORT_SUCCESS,
  GET_SALE_REPORT_SUCCESS,
  REPORT_FAILURE,
  REPORT_REQUEST,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isFailed: false,
  isError: false,

  // Get Sale Report
  saleReportData: [],
  saleReturnData: [],
  toggleGetSaleReportSuccess: false,

  // Get Purchase Report
  purchaseReportData: [],
  purchaseReturnData: [],
  toggleGetPurchaseReportSuccess: false,

  // Get DayBooks
  dayBookData: [],
  toggleGetDayBooksSuccess: false,

  // Get All Transactions
  allTransactionsData: [],
  toggleGetAllTransactionsSuccess: false,

  // Cash Flow
  allCashFlowData: [],

  // Sale HSN
  totalSaleTax: 0,
  totalSaleTaxReturn: 0,

  integratedTax: 0,
  cessTax: 0,
  integratedTaxReturn: 0,
  cessTaxReturn: 0,

  purchasetotalSaleTax: 0,
  purchaseintegratedTax: 0,
  purchasecessTax: 0,
  purchasetotalSaleTaxReturn: 0,
  purchaseintegratedTaxReturn: 0,
  purchasecessTaxReturn: 0,
};

export const reducer = (
  state = initialState,
  {
    type,
    payload,
    tax,
    integratedTax,
    cess,
    Rtax,
    RintegratedTax,
    Rcess,
    purchasetax,
    purchaseintegratedTax,
    purchasecess,
    purchaseRtax,
    purchaseRintegratedTax,
    purchaseRcess,
  }
) => {
  switch (type) {
    case REPORT_REQUEST: {
      return { ...state, isLoading: true, isFailed: false, isError: false };
    }
    // Get Sale Report
    case GET_SALE_REPORT_SUCCESS: {
      return {
        ...state,
        saleReportData: payload?.getSale || [],
        saleReturnData: payload?.getSaleReturn || [],
        isLoading: false,
        totalSaleTax: tax,
        totalSaleTaxReturn: Rtax,

        integratedTax: integratedTax,
        cessTax: cess,
        integratedTaxReturn: RintegratedTax,
        cessTaxReturn: Rcess,
        purchasetotalSaleTax: purchasetax,
        purchaseintegratedTax: purchaseintegratedTax,
        purchasecessTax: purchasecess,
        purchasetotalSaleTaxReturn: purchaseRtax,
        purchaseintegratedTaxReturn: purchaseRintegratedTax,
        purchasecessTaxReturn: purchaseRcess,
        toggleGetSaleReportSuccess: !state.toggleGetSaleReportSuccess,
      };
    }
    // Get Purchase Report
    case GET_PURCHASE_REPORT_SUCCESS: {
      return {
        ...state,
        purchaseReportData: payload?.getPurchase || [],
        purchaseReturnData: payload?.getPurchaseReturn || [],
        isLoading: false,
        toggleGetPurchaseReportSuccess: !state.toggleGetPurchaseReportSuccess,
      };
    }
    // Get DayBooks
    case GET_DAYBOOK_SUCCESS: {
      return {
        ...state,
        dayBookData: payload,
        toggleGetDayBooksSuccess: !state.toggleGetDayBooksSuccess,
        isLoading: false,
      };
    }
    // Get All Transactions
    case GET_ALL_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        allTransactionsData: payload,
        isLoading: false,
        toggleGetAllTransactionsSuccess: !state.toggleGetAllTransactionsSuccess,
      };
    }

    case REPORT_FAILURE: {
      return { ...state, isLoading: false, isError: true };
    }
    default: {
      return state;
    }
  }
};
