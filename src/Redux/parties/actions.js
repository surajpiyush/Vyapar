import { USER_DETAILS } from "../business/actionTypes";
import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
  PARTIES_PAYMENT_OUT_FAILURE,
  PARTIES_PAYMENT_OUT_REQUEST,
  PARTIES_PAYMENT_OUT_SUCCESS,
  PARTIES_PURCHASE_BILL_FAILURE,
  PARTIES_PURCHASE_BILL_REQUEST,
  PARTIES_PURCHASE_BILL_SUCCESS,
} from "./actionTypes";

import axios from "axios";

const API_URL = "https://ca-backend-api.onrender.com";
const token = localStorage.getItem("token");
const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

// ----------------------- Fetch All Parties Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchAllParties = async (dispatch) => {
  dispatch({ type: FETCH_PARTIES_LOADING });

  try {
    const response = await axios.get(`${API_URL}/${FirmId}/party/getAll`, {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });

    // console.log("Parties Data:", response?.data);
    dispatch({ type: FETCH_PARTIES_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    console.error("Error Fetching Parties Data:", error);
    dispatch({ type: FETCH_PARTIES_ERROR });
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data, setPartyFormToggle, toast) => {
  toast.closeAll();
  dispatch({ type: SAVE_PARTY_LOADING });

  try {
    // prettier-ignore
    const response = await axios.post(`${API_URL}/${FirmId}/party`, data, { // eslint-disable-line no-unused-vars
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    // console.log("Save Party Response:", response?.data);
    dispatch({ type: SAVE_PARTY_SUCCESS });
    toast({ title: "Party Added", status: "success", position: "top" });
    setPartyFormToggle((prev) => !prev);
  } catch (error) {
    console.log("Saving Party Error Response:", error);
    toast({
      title: "Something Went Wrong",
      description: error?.response?.data,
      status: "error",
      position: "top",
    });
    dispatch({ type: SAVE_PARTY_ERROR });
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const GetCurrentPartyData = async (
  dispatch,
  data,
  setPartyFormToggle
) => {
  dispatch({ type: SAVE_PARTY_LOADING });

  try {
    // prettier-ignore
    const response = await axios.post(`${API_URL}/${FirmId}/party`, data, { // eslint-disable-line no-unused-vars
      headers: {
        Authorization: `Bearer ${token} `,
      },
    });
    // console.log("Save Party Response:", response?.data);

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

  // This request needs to be edited

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${FirmId}/party`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Getting All Groups Response:", response?.data);

    dispatch({ type: SAVE_PARTY_SUCCESS });
    setPartyFormToggle((prev) => !prev);
    // alert("Party Saved ✔️");
  } catch (error) {
    dispatch({ type: SAVE_PARTY_ERROR });
    console.log("Getting All Groups Response:", error);
    alert(error?.response?.data || "Something Went Wrong!");
  }
};

// **************************************//

const postPurchaseBillUrl =
  "https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchase/create";
const purchaseBillReq = () => ({ type: PARTIES_PURCHASE_BILL_REQUEST });
const purchaseBillSucc = (payload) => ({
  type: PARTIES_PURCHASE_BILL_SUCCESS,
  payload,
});
const purchaseBillFailed = () => ({ type: PARTIES_PURCHASE_BILL_FAILURE });

// *******************************

export const postPurchaseBill = (data) => async (dispatch) => {
  dispatch(purchaseBillReq());
  try {
    const response = await axios.post(postPurchaseBillUrl, data, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwODgyNjIsImV4cCI6MTcwODE3NDY2Mn0.vrVm4-qmI74kgNXo9FmvI9BeWQ5dVFoJvqaqwGrcjJM",
      },
    });
    dispatch(purchaseBillSucc(response.data));
    // console.log(response.data);
  } catch (err) {
    dispatch(purchaseBillFailed(err));
  }
};

// *********************************************
const getAllPurchaseBillUrl =
  "https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchase/getAll";

const getPurchaseBillReq = () => ({ type: PARTIES_PURCHASE_BILL_REQUEST });
const getPurchaseBillSucc = (payload) => ({
  type: PARTIES_PURCHASE_BILL_SUCCESS,
  payload: payload,
});
const getPurchaseBillFailed = () => ({ type: PARTIES_PURCHASE_BILL_FAILURE });

export const getPurchaseBill = () => async (dispatch) => {
  console.log("data");
  dispatch(getPurchaseBillReq());
  try {
    const response = await axios.get(getAllPurchaseBillUrl, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgxNjExOTksImV4cCI6MTcwODI0NzU5OX0.WuS20yytZs1_7Hg67CeTYTctHNU4tqkbemGGmqYY8Kg",
      },
    });

    console.log(response);
    dispatch(getPurchaseBillSucc(response));
  } catch (err) {
    console.log("ERROOR");
    dispatch(getPurchaseBillFailed(err));
  }
};

// ******************************************************
const getPurhchaseInvoiceUrl =
  "https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchase/getInvoice/65c9d463d8d06ffd61e50eb8";
const getPurchaseInvoiceReq = () => ({ type: PARTIES_PURCHASE_BILL_REQUEST });
const getPurchaseInvoiceSucc = (payload) => ({
  type: PARTIES_PURCHASE_BILL_SUCCESS,
  payload,
});
const getPurchaseInvoiceFailed = () => ({
  type: PARTIES_PURCHASE_BILL_FAILURE,
});

// *******************************************
export const getPurchaseInvoice = () => async (dispatch) => {
  dispatch(getPurchaseInvoiceReq());
  const token = localStorage.getItem("token");
  return await axios
    .get(getPurhchaseInvoiceUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      dispatch(getPurchaseInvoiceSucc(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      dispatch(getPurchaseInvoiceFailed(err));
    });
};
// ***********************************************

const postPurchaseOutUrl =
  "https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchaseOut/create";
const postPurchaseOutReq = () => ({ type: PARTIES_PAYMENT_OUT_REQUEST });
const postPurchaseOutSucc = (payload) => ({
  type: PARTIES_PAYMENT_OUT_SUCCESS,
  payload,
});
const postPurchaseOutFailed = () => ({ type: PARTIES_PAYMENT_OUT_FAILURE });

// *************************************************

export const postPurchaseOut = (postData) => async (dispatch) => {
  dispatch(postPurchaseOutReq());
  return await axios
    .post(postPurchaseOutUrl, postData, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwODgyNjIsImV4cCI6MTcwODE3NDY2Mn0.vrVm4-qmI74kgNXo9FmvI9BeWQ5dVFoJvqaqwGrcjJM",
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

export const getAllPurchaseOut = (startDate, endDate) => async (dispatch) => {
  dispatch(getAllPurchaseOutReq());

  const getAllPurchaseOutUrl = `https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchaseOut/getAll?startDate=${startDate}&endDate=${endDate}`;

  try {
    const response = await axios.get(getAllPurchaseOutUrl, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwODgyNjIsImV4cCI6MTcwODE3NDY2Mn0.vrVm4-qmI74kgNXo9FmvI9BeWQ5dVFoJvqaqwGrcjJM`,
      },
    });
    dispatch(getAllPurchaseOutSucc(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(getAllPurchaseOutFailed(error));
  }
};

// ****************************************************
const getPurchaseOutInvoiceBillUrl =
  "https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchaseOut/getInvoice/65cafba19fb84738a529c1c9";
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
  return await axios
    .get(getPurchaseOutInvoiceBillUrl, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwODgyNjIsImV4cCI6MTcwODE3NDY2Mn0.vrVm4-qmI74kgNXo9FmvI9BeWQ5dVFoJvqaqwGrcjJM`,
      },
    })
    .then((response) => {
      dispatch(getAllPurchaseOutInvoiceSucc(response.data));
      console.log(response.data);
    })
    .catch((err) => {
      dispatch(getAllPurchaseOutInvoiceFailed(err));
    });
};

// ***********************************************
