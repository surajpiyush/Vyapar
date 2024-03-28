import {
  GET_ALLTRANSECTION_SUCCESS,
  GET_DAYBOOK_SUCCESS,
  GET_PURCHASEREPORT_SUCCESS,
  GET_SALEREPORT_SUCCESS,
  REPORT_FAILURE,
  REPORT_REQUEST,
} from "./actionTypes";

const initialState = {
  // partiesData: [],
  isLoading: false,
  isFailed: false,
  isError: false,
  saleReportData: [],
  totalSaleTax: 0,
  integratedTax: 0,
  cessTax: 0,
  totalSaleTaxReturn: 0,
  integratedTaxReturn: 0,
  cessTaxReturn: 0,
  purchaseReportData: [],
  dayBookData: [],
  allTransectionsData: [],
  purchasetotalSaleTax: 0,
  purchaseintegratedTax: 0,
  purchasecessTax: 0,
  purchasetotalSaleTaxReturn: 0,
  purchaseintegratedTaxReturn: 0,
  purchasecessTaxReturn: 0,
};

export const reducer = (
  state = initialState,
  { type, payload, tax, integratedTax, cess, Rtax, RintegratedTax, Rcess,purchasetax, purchaseintegratedTax, purchasecess, purchaseRtax, purchaseRintegratedTax, purchaseRcess }
) => {
  switch (type) {
    case REPORT_REQUEST: {
      return { ...state, isLoading: true };
    }

    case GET_SALEREPORT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        saleReportData: payload.data,
        totalSaleTax: tax,
        integratedTax: integratedTax,
        cessTax: cess,
        totalSaleTaxReturn: Rtax,
        integratedTaxReturn: RintegratedTax,
        cessTaxReturn: Rcess,
        
        purchasetotalSaleTax:  purchasetax,
        purchaseintegratedTax:  purchaseintegratedTax,
        purchasecessTax:  purchasecess,
        purchasetotalSaleTaxReturn:  purchaseRtax,
        purchaseintegratedTaxReturn:  purchaseRintegratedTax,
        purchasecessTaxReturn:  purchaseRcess,
      };
    }

    case GET_PURCHASEREPORT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseReportData: payload.data || [],
      };
    }

    case GET_DAYBOOK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        dayBookData: payload.data || [],
      };
    }

    case GET_ALLTRANSECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allTransectionsData: payload.data || [],
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
