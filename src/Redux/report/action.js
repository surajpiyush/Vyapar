import { API_URL, USER_DETAILS } from "../store";
import {
  GET_ALL_TRANSACTIONS_SUCCESS,
  GET_DAYBOOK_SUCCESS,
  GET_PURCHASE_REPORT_SUCCESS,
  GET_SALE_REPORT_SUCCESS,
  REPORT_FAILURE,
  REPORT_REQUEST,
} from "./actionTypes";

import axios from "axios";

// Get Sale Report
export const GetSaleReport = async (dispatch, startDate, endDate) => {
  dispatch({ type: REPORT_REQUEST });
  const token = localStorage.getItem("token");
  const firmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/transctionReport/saleReport?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Getting Sale Report Response:", response?.data?.data);
    const { getSale, getSaleReturn } = response?.data?.data;
    const { totalTax, integratedTax, cessTax } = calculateTax(getSale);
    const {
      totalTax: RtotalTax,
      integratedTax: RintegratedTax,
      cessTax: RcessTax,
    } = calculateTax(getSaleReturn);
    dispatch({
      type: GET_SALE_REPORT_SUCCESS,
      payload: response?.data?.data || {},
      tax: totalTax,
      integratedTax,
      cess: cessTax,
      Rtax: RtotalTax,
      RintegratedTax,
      Rcess: RcessTax,
    });
  } catch (error) {
    dispatch({ type: REPORT_FAILURE });
    console.log("Getting Sale Report Error:", error);
  }
};

// Get Purchase Report
export const GetPurchaseReport = async (dispatch, startDate, endDate) => {
  dispatch({ type: REPORT_REQUEST });
  const token = localStorage.getItem("token");
  const firmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/transctionReport/purchaseReport?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    //console.log("Getting Purchase Report Response:", response?.data?.data);
    dispatch({
      type: GET_PURCHASE_REPORT_SUCCESS,
      payload: response?.data?.data || {},
    });
  } catch (error) {
    dispatch({ type: REPORT_FAILURE });
    console.log("Getting Purchase Report Error:", error);
  }
};

// Get All DayBooks
export const GetDayBooks = async (dispatch, date) => {
  dispatch({ type: REPORT_REQUEST });
  const token = localStorage.getItem("token");
  const firmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/transctionReport/dayBookReport?date=${date}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    console.log("Getting All DayBooks Response:", response?.data?.data);
    dispatch({
      type: GET_DAYBOOK_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: REPORT_FAILURE });
    console.log("Getting All DayBooks Error:", error);
  }
};

// Get All Transactions
export const GetAllTransactions = async (dispatch, startDate, endDate) => {
  dispatch({ type: REPORT_REQUEST });
  const token = localStorage.getItem("token");
  const firmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/transctionReport/allTractionReport?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Getting All Transactions Response:", response?.data?.data);
    dispatch({
      type: GET_ALL_TRANSACTIONS_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: REPORT_FAILURE });
    console.log("Getting All Transactions Error:", error);
  }
};

// Calculate Tax
const calculateTax = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return { totalTax: 0, integratedTax: 0, cessTax: 0 };
  }

  const totalTax = data.reduce(
    (acc, item) => acc + (item.taxableValue || 0),
    0
  );
  const integratedTax = data.reduce(
    (acc, item) => acc + (Number(item.integratedTax) || 0),
    0
  );
  const cessTax = data.reduce((acc, item) => acc + (Number(item.cess) || 0), 0);

  return { totalTax, integratedTax, cessTax };
};
