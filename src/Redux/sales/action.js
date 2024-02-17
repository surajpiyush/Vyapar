import {
  IS_LOADING,
  IS_ERROR,
  POST_DELIVERY_CHALLAN_SUCCESS,
  GET_DELIVERY_CHALLAN_SUCCESS,
  POST_SALES_ESTIMATE_SUCCESS,
  POST_SALES_INVOICE_SUCCESS,
  POST_SALES_ORDER_SUCCESS,
  POST_SALES_RETURNS_SUCCESS,
  POST_SALES_PAYMENT_SUCCESS,
} from "./reducer";

import axios from "axios";

// Post Delivery Challan Request
export const PostDeliveryChallan = async (dispatch, data) => {
  dispatch(IS_LOADING());
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/sale/deliveryChallan`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Save Delivery Challan Response:", response?.data);

    dispatch(POST_DELIVERY_CHALLAN_SUCCESS());
    alert("Dellivery Challan Added ✔️");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Save Delivery Challan Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

// Post Delivery Challan Request
export const GetAllDeliveryChallans = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const data = { startDate, endDate };

  try {
    const response = await axios.get(
      `https://ca-backend-api.onrender.com/${userId}/sale/deliveryChallan/getAll`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Getting All Delivery Challans Response:", response?.data);

    dispatch(GET_DELIVERY_CHALLAN_SUCCESS());
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Getting All Delivery Challans Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

// Post Sales Estimate Request
export const PostSalesEstimates = async (dispatch, data) => {
  dispatch(IS_LOADING());
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/sale/saleEstimate`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    //  console.log("Post Sales Estimate Response:", response?.data);

    dispatch(POST_SALES_ESTIMATE_SUCCESS());
    alert("Sales Estimate Added ✔️");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Post Sales Estimate Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

// Post Sales Invoice Request
export const PostSalesInvoice = async (dispatch, data) => {
  dispatch(IS_LOADING());
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/sale/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    //  console.log("Post Sales Estimate Response:", response?.data);

    dispatch(POST_SALES_INVOICE_SUCCESS());
    alert("Sales Invoice Added ✔️");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Post Sales Invoice Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

// Post Sales Order Request
export const PostSalesOrder = async (dispatch, data) => {
  dispatch(IS_LOADING());
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/sale/saleOrder`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    //  console.log("Post Sales Estimate Response:", response?.data);

    dispatch(POST_SALES_ORDER_SUCCESS());
    alert("Sales Order Added ✔️");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Post Sales Order Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

// Post Sales Return Request
export const PostSalesReturn = async (dispatch, data) => {
  dispatch(IS_LOADING());
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/sale/saleReturnCredit`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //  console.log("Post Sales Returns Response:", response?.data);

    dispatch(POST_SALES_RETURNS_SUCCESS());
    alert("Sales Returns Added ✔️");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Post Sales Returns Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};

// Post Sales Return Request
export const PostSalesPayment = async (dispatch, data) => {
  dispatch(IS_LOADING());
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/sale/salePaymentIn`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //  console.log("Post Sales Returns Response:", response?.data);

    dispatch(POST_SALES_PAYMENT_SUCCESS());
    alert("Sales Payment Successfull ✔️");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Post Sales Payment Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};
