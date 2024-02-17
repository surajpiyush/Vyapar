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
  // const { userId, token } = JSON.parse(localStorage.getItem(USER_DETAILS));
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
    // console.log("Parties Fetch Data Response:-", response);
  } catch (error) {
    dispatch({ type: FETCH_PARTIES_ERROR });
    console.error("Error Fetching Parties Data:", error);
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data, setPartyFormToggle) => {
  dispatch({ type: SAVE_PARTY_LOADING });
  // const { userId, token } = JSON.parse(localStorage.getItem(USER_DETAILS));
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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
  // const { userId, token } = JSON.parse(localStorage.getItem(USER_DETAILS));
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // This request needs to be edited

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
    console.log(response.data);
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
  payload,
});
const getPurchaseBillFailed = () => ({ type: PARTIES_PURCHASE_BILL_FAILURE });

export const getPurchaseBill = (data) => async (dispatch) => {
  dispatch(getPurchaseBillReq());
  console.log(data);
  try {
    const response = await axios.get(getAllPurchaseBillUrl, {
      params: data,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwODgyNjIsImV4cCI6MTcwODE3NDY2Mn0.vrVm4-qmI74kgNXo9FmvI9BeWQ5dVFoJvqaqwGrcjJM",
      },
    });

    dispatch(getPurchaseBillSucc(response.data));
    console.log(response.data);
  } catch (err) {
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
  return await axios
    .get(getPurhchaseInvoiceUrl, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwODgyNjIsImV4cCI6MTcwODE3NDY2Mn0.vrVm4-qmI74kgNXo9FmvI9BeWQ5dVFoJvqaqwGrcjJM",
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

const getAllPurchaseOutUrl = `https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchaseOut/getAll`;
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
