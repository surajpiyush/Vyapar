import { USER_DETAILS } from "../business/actionTypes";
import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
  PARTIES_POST_FAILED,
  PARTIES_POST_REQUEST,
  PARTIES_POST_SUCCESS,
  PARTIES_PAYMENT_OUT_FAILURE,
  PARTIES_PAYMENT_OUT_REQUEST,
  PARTIES_PAYMENT_OUT_SUCCESS,
  PARTIES_PURCHASE_BILL_FAILURE,
  PARTIES_PURCHASE_BILL_REQUEST,
  PARTIES_PURCHASE_BILL_SUCCESS,
} from "./actionTypes";

import axios from "axios";

// ----------------------- Fetch All Parties Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchData = async (dispatch) => {
  dispatch({ type: FETCH_PARTIES_LOADING });
  const { userId, token } = JSON.parse(localStorage.getItem(USER_DETAILS));

  try {
    const response = await axios.get(
      `https://ca-backend-api.onrender.com/${userId}/party/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );

    dispatch({ type: FETCH_PARTIES_SUCCESS, payload: response.data.data });
    console.log("Parties Fetch Data Response:-", response);
  } catch (error) {
    dispatch({ type: FETCH_PARTIES_ERROR });
    console.error("Error Fetching Parties Data:", error);
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data, setPartyFormToggle) => {
  dispatch({ type: SAVE_PARTY_LOADING });
  const { userId, token } = JSON.parse(localStorage.getItem(USER_DETAILS));

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/party`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Business Route Response:", response?.data);

    dispatch({ type: SAVE_PARTY_SUCCESS });
    setPartyFormToggle((prev) => !prev);
    alert("Party Saved ✔️");
  } catch (error) {
    dispatch({ type: SAVE_PARTY_ERROR });
    console.log("Saving Party Error Response:", error);
    alert(error?.response?.data || "Something Went Wrong!");
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const GetAllGroups = async (dispatch, data, setPartyFormToggle) => {
  dispatch({ type: SAVE_PARTY_LOADING });
  const { userId, token } = JSON.parse(localStorage.getItem(USER_DETAILS));

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/party`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Business Route Response:", response?.data);

    dispatch({ type: SAVE_PARTY_SUCCESS });
    setPartyFormToggle((prev) => !prev);
    alert("Party Saved ✔️");
  } catch (error) {
    dispatch({ type: SAVE_PARTY_ERROR });
    console.log("Saving Party Error Response:", error);
    alert(error?.response?.data || "Something Went Wrong!");
  }
};

// **************************************//

const baseurlPurchase =
  "https://ca-backend-api.onrender.com/65bbb395b587fda4e5433bd2/";
const purchaseBillReq = () => ({ type: PARTIES_PURCHASE_BILL_REQUEST });
const purchaseBillSucc = (payload) => ({
  type: PARTIES_PURCHASE_BILL_SUCCESS,
  payload,
});
const purchaseBillFailed = () => ({ type: PARTIES_PURCHASE_BILL_FAILURE });

// *******************************

export const postPurchaseBill = () => async (dispatch) => {
  dispatch(purchaseBillReq());
  try {
    const response = await axios.post(baseurlPurchase, null, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDc1NjE4NTYsImV4cCI6MTcwNzY0ODI1Nn0.5KqzfiqNtAtwZSCTc-PnITpvDUJRW5IkwlRVsesLmXQ",
      },
    });
    dispatch(purchaseBillSucc(response.data));
    console.log(response.data);
  } catch (err) {
    dispatch(purchaseBillFailed(err));
  }
};

// *********************************************

const getPurchaseBillReq = () => ({ type: PARTIES_PURCHASE_BILL_REQUEST });
const getPurchaseBillSucc = (payload) => ({
  type: PARTIES_PURCHASE_BILL_SUCCESS,
  payload,
});
const getPurchaseBillFailed = () => ({ type: PARTIES_PURCHASE_BILL_FAILURE });

// *********************************************

export const getPurchaseBill = () => async (dispatch) => {
  dispatch(getPurchaseBillReq());
  return axios
    .get(baseurlPurchase)
    .then((response) => {
      dispatch(getPurchaseBillSucc(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      dispatch(getPurchaseBillFailed(err));
    });
};

// ******************************************************

const getPurchaseInvoiceReq = () => ({ type: PARTIES_POST_REQUEST });
const getPurchaseInvoiceSucc = (payload) => ({
  type: PARTIES_POST_SUCCESS,
  payload,
});
const getPurchaseInvoiceFailed = () => ({ type: PARTIES_POST_FAILED });

// *******************************************
export const getPurchaseInvoice = () => async (dispatch) => {
  dispatch(getPurchaseInvoiceReq());
  return axios
    .get(baseurlPurchase)
    .then((response) => {
      dispatch(getPurchaseInvoiceSucc(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      dispatch(getPurchaseInvoiceFailed(err));
    });
};
// ***********************************************

const baseurlPaymentOut =
  "https://ca-backend-api.onrender.com/65bbb395b587fda4e5433bd2/";
const postPurchaseOutReq = () => ({ type: PARTIES_PAYMENT_OUT_REQUEST });
const postPurchaseOutSucc = (payload) => ({
  type: PARTIES_PAYMENT_OUT_SUCCESS,
  payload,
});
const postPurchaseOutFailed = () => ({ type: PARTIES_PAYMENT_OUT_FAILURE });

// *************************************************

export const postPurchaseOut = () => async (dispatch) => {
  dispatch(postPurchaseOutReq());
  return axios
    .post(baseurlPaymentOut, null, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDc1NjE4NTYsImV4cCI6MTcwNzY0ODI1Nn0.5KqzfiqNtAtwZSCTc-PnITpvDUJRW5IkwlRVsesLmXQ",
      },
    })
    .then((response) => {
      dispatch(postPurchaseOutSucc(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      dispatch(postPurchaseOutFailed(err));
    });
};

// *************************************************

const getAllPurchaseOutReq = () => ({ type: PARTIES_PAYMENT_OUT_REQUEST });
const getAllPurchaseOutSucc = (payload) => ({
  type: PARTIES_PAYMENT_OUT_SUCCESS,
  payload,
});
const getAllPurchaseOutFailed = () => ({ type: PARTIES_PAYMENT_OUT_FAILURE });

// **************************************************

export const getAllPurchaseOut = () => async (dispatch) => {
  dispatch(getAllPurchaseOutReq());
  return axios
    .get(baseurlPaymentOut)
    .then((response) => {
      dispatch(getAllPurchaseOutSucc(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      dispatch(getAllPurchaseOutFailed(err));
    });
};
// ****************************************************

const getAllPurchaseOutInvoiceReq = () => ({
  type: PARTIES_PAYMENT_OUT_REQUEST,
});
const getAllPurchaseOutInvoiceSucc = (payload) => ({
  type: PARTIES_PAYMENT_OUT_SUCCESS,
  payload,
});
const getAllPurchaseOutInvoiceFailed = () => ({
  type: PARTIES_PAYMENT_OUT_FAILURE,
});

// ***********************************************

export const getAllPurchaseOutInvoice = () => async (dispatch) => {
  dispatch(getAllPurchaseOutInvoiceReq());
  return axios
    .get(baseurlPaymentOut)
    .then((response) => {
      dispatch(getAllPurchaseOutInvoiceSucc(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      dispatch(getAllPurchaseOutInvoiceFailed(err));
    });
};

// ***********************************************
