import { USER_DETAILS } from "../business/actionTypes";
import {
  IS_LOADING,
  IS_ERROR,
  POST_SALES_INVOICE_SUCCESS,
  GET_SALES_INVOICE_SUCCESS,
  POST_ESTIMATE_SUCCESS,
  GET_ESTIMATE_SUCCESS,
  POST_PAYMENT_IN_SUCCESS,
  GET_PAYMENT_IN_SUCCESS,
  POST_SALE_ORDER_SUCCESS,
  GET_All_SALE_ORDER_SUCCESS,
  POST_DELIVERY_CHALLAN_SUCCESS,
  GET_ALL_DELIVERY_CHALLAN_SUCCESS,
  POST_SALES_RETURNS_SUCCESS,
} from "./reducer";

import axios from "axios";

const API_URL = `https://ca-backend-api.onrender.com`;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const firmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

// --------------------------------------- INVOICE ------------------------------------
// Post Sales Invoice Request
export const PostSalesInvoice = async (dispatch, toast, data, setOpenForm) => {
  toast.closeAll();
  dispatch(IS_LOADING());

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/sale/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    //  console.log("Post Sales Estimate Response:", response?.data);
    dispatch(POST_SALES_INVOICE_SUCCESS());
    setOpenForm(false);
    toast({ title: "Sales Invoice Added", status: "success", position: "top" });
    // alert("Sales Invoice Added ✔️");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Post Sales Invoice Response:", error);
    toast({
      title: "Something Went Wrong!",
      description: error?.response?.data?.message || "",
      status: "error",
      position: "top",
    });
  }
};

// Get All Sales Invoice Request
export const GetAllSalesInvoice = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/getAll?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );

    // console.log("Getting All Invoices Response:", response?.data);
    dispatch(GET_SALES_INVOICE_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Invoices Response:", error);
  }
};

// --------------------------------------- ESTIMATES ------------------------------------
// Post Sales Estimate Request
export const PostEstimates = async (dispatch, data, setOpenForm, toast) => {
  dispatch(IS_LOADING());
  toast.closeAll();

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/sale/saleEstimate`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    //  console.log("Post Estimates Response:", response?.data);
    dispatch(POST_ESTIMATE_SUCCESS());
    toast({
      title: "Sales Estimate Added ✔️",
      status: "success",
      position: "top",
    });
    setOpenForm(false);
  } catch (error) {
    dispatch(IS_ERROR());
    toast({
      title: "Something Went Wrong!",
      description: error?.response?.data?.message || "",
      status: "error",
      position: "top",
    });
    console.log("Error Posting Estimates:", error);
  }
};

// Get All Estimates Request
export const GetAllEstimates = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/saleEstimate/getAll?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Getting All Estimates Response:", response?.data);
    dispatch(GET_ESTIMATE_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Estimates:", error);
  }
};

// --------------------------------------- PAYMENT IN ------------------------------------
// Post Payment-In Request
export const PostPaymentIn = async (dispatch, data, closeForm, toast) => {
  dispatch(IS_LOADING());
  toast.closeAll();

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/sale/salePaymentIn`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Post Payment-In Response:", response?.data);
    dispatch(POST_PAYMENT_IN_SUCCESS());
    toast({
      title: "Payment-In Successfull ✔️",
      status: "success",
      position: "top",
    });
    closeForm(false);
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Post Payment-In:", error);
    toast({
      title: "Something Went Wrong!",
      description: error?.response?.data?.message || "",
      status: "error",
      position: "top",
    });
  }
};

// Get All Payment-In Data Request
export const GetAllPaymentIn = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/salePaymentIn/getAll?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    // console.log("Get All Payment-In Response:", response?.data);
    dispatch(GET_PAYMENT_IN_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Payment-In Orders:", error);
  }
};

// --------------------------------------- SALE ORDER ------------------------------------
// Post Sale Order Request
export const PostSaleOrder = async (dispatch, data, setOpenForm, toast) => {
  dispatch(IS_LOADING());
  toast.closeAll();

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/sale/saleOrder`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    // console.log("Post Sale Order Response:", response?.data);
    dispatch(POST_SALE_ORDER_SUCCESS());
    setOpenForm(false);
    toast({
      title: "Sales Order Added ✔️",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch(IS_ERROR());
    toast({
      title: "Something Went Wrong!",
      description: error?.response?.data?.message || "",
      status: "error",
      position: "top",
    });
    console.log("Error Post Sale Order:", error);
  }
};

// Post Sale Order Request
export const GetAllSaleOrders = async (dispatch) => {
  dispatch(IS_LOADING());
  const startDate = "2024-02-01";
  const endDate = new Date().toISOString().split("T")[0];
  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/saleOrder/getAll?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    // console.log("Get All Sale Orders Response:", response?.data);
    dispatch(GET_All_SALE_ORDER_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Sale Orders:", error);
  }
};

// --------------------------------------- DELIVERY CHALLAN ------------------------------------
// Post Delivery Challan Request
export const PostDeliveryChallan = async (
  dispatch,
  data,
  setOpenForm,
  toast
) => {
  dispatch(IS_LOADING());
  toast.closeAll();

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/sale/deliveryChallan`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Post Delivery Challan Response:", response?.data);
    dispatch(POST_DELIVERY_CHALLAN_SUCCESS());
    setOpenForm(false);
    toast({
      title: "Dellivery Challan Added ✔️",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch(IS_ERROR());
    toast({
      title: "Something Went Wrong!",
      description: error?.response?.data?.message || "",
      status: "error",
      position: "top",
    });
    console.log("Error Post Delivery Challan:", error);
  }
};

// Get All Delivery Challans Request
export const GetAllDeliveryChallans = async (dispatch) => {
  dispatch(IS_LOADING());
  const startDate = "2024-02-01";
  const endDate = new Date().toISOString().split("T")[0];

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/deliveryChallan/getAll?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Getting All Delivery Challans Response:", response?.data);
    dispatch(GET_ALL_DELIVERY_CHALLAN_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Delivery Challans:", error);
  }
};

// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************
// ********************************************************************************************

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
