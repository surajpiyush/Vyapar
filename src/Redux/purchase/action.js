import { API_URL, USER_DETAILS } from "../store";
import {
  ADD_PURCHASE_ERROR,
  ADD_PURCHASE_LOADING,
  ADD_PURCHASE_SUCCESS,
  DELETE_PAYOUTBILL_SUCCESS,
  DELETE_PURCHASEBILL_SUCCESS,
  DELETE_PURCHASEORDER_SUCCESS,
  DELETE_PURCHASERETURN_SUCCESS,
  GET_ALL_PAYMENT_OUT_ERROR,
  GET_ALL_PAYMENT_OUT_LOADING,
  GET_ALL_PAYMENT_OUT_SUCCESS,
  GET_ALL_PURCHASE_BILL_ERROR,
  GET_ALL_PURCHASE_BILL_LOADING,
  GET_ALL_PURCHASE_BILL_SUCCESS,
  GET_ALL_PURCHASE_ORDER_ERROR,
  GET_ALL_PURCHASE_ORDER_LOADING,
  GET_ALL_PURCHASE_ORDER_SUCCESS,
  GET_PAYOUTBILL_SUCCESS,
  GET_PURCHASEBILL_SUCCESS,
  GET_PURCHASEORDER_SUCCESS,
  GET_PURCHASE_RETURN_ERROR,
  GET_PURCHASE_RETURN_LOADING,
  GET_PURCHASE_RETURN_SUCCESS,
  GET_SINGLE_PURCHASEBILL_SUCCESS,
  POST_PAYOUT_SUCCESS,
  POST_PURCHASEBILL_SUCCESS,
  POST_PURCHASEORDER_SUCCESS,
  POST_PURCHASERETURN_SUCCESS,
  PURCHASE_FAILURE,
  PURCHASE_REQUEST,
  UPDATE_PAYOUTBILL_SUCCESS,
  UPDATE_PURCHASEBILL_SUCCESS,
  UPDATE_PURCHASEORDER_SUCCESS,
  UPDATE_PURCHASERETURN_SUCCESS,
} from "./actionTypes";

import axios from "axios";

// -------------------------------- PURCHASE BILL ----------------------------
// Add Purchase Bill Request
export const AddPurchaseBill = async (
  dispatch,
  newItem,
  setOpenForm,
  toast
) => {
  dispatch({ type: ADD_PURCHASE_LOADING });
  toast.closeAll();
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/purchase/create`,
      newItem,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Add Purchase Response:", response);
    dispatch({
      type: ADD_PURCHASE_SUCCESS,
      payload: response.data.data,
    });
    toast({
      title: "Purchase Bill Added!",
      status: "success",
      position: "top",
    });
    setOpenForm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: ADD_PURCHASE_ERROR });
    console.log("Adding Purchase Bill Error:", error);
  }
};

// Get All Purchase Bill
export const GetAllPurchaseBill = async (dispatch, startDate, endDate) => {
  dispatch({ type: GET_ALL_PURCHASE_BILL_LOADING });
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem("USER_DETAILS"))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/purchase/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Getting All Purchase Bill Response:", response);
    dispatch({
      type: GET_ALL_PURCHASE_BILL_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PURCHASE_BILL_ERROR });
    console.error("Getting All Purchase Bill Error:", error);
  }
};

// Get Single Purchase Bill Data
export const GetSinglePurchaseBillData = async (
  dispatch,
  itemId,
  toast,
  setIsEditing
) => {
  dispatch({ type: PURCHASE_REQUEST });

  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/purchase/getInvoice/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Get Single Purchase bill Data:", response?.data);
    setIsEditing(true);
    dispatch({
      type: GET_SINGLE_PURCHASEBILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast.closeAll();
    toast({
      title: "Encountered an issue while Editing the Invoice.",
      description: "Please try again later!",
      status: "error",
      position: "top",
    });
    console.log("Error Getting Single Invoice:", error);
  }
};

// Update Purchase Bill
export const UpdatePurchaseBill = async (
  dispatch,
  itemId,
  data,
  toast,
  setIsEditing
) => {
  dispatch({ type: PURCHASE_REQUEST });
  toast.closeAll();
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/${firmId}/purchase/update/${itemId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Update Purchase Bill Response:", res);
    dispatch({ type: UPDATE_PURCHASEBILL_SUCCESS });
    toast({ title: "Bill Updated", status: "success" });
    setIsEditing(false);
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast({ title: "Something Went Wrong", status: "error" });
    console.error("Update Purchase Bill Error:", error);
  }
};

// Delete Purchase Bill
export const deletePurchaseBill = (_id, toast) => (dispatch) => {
  dispatch({ type: PURCHASE_REQUEST });
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  axios
    .delete(`${API_URL}/${firmId}/purchase/delete/${_id}`, {
      headers: { Authorization: `Bearer ${token} ` },
    })
    .then((res) => {
      dispatch({ type: DELETE_PURCHASEBILL_SUCCESS, payload: _id });
      toast({
        title: `${res.data.msg}`,
        status: "success",
        position: "top",
      });
    })
    .catch((err) => {
      dispatch({ type: PURCHASE_FAILURE });
      console.error("Deleting Purchase Bill Error:", err);
    });
};

// ------------------------------------------------- Purchase Order -------------------------------------------------
// Add Purchase Order
export const addPurchaseOrder = async (
  dispatch,
  newItem,
  setOpenForm,
  toast
) => {
  toast.closeAll();
  dispatch({ type: PURCHASE_REQUEST });
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/purchaseOrder/create`,
      newItem,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Add Purchase order Response:",response)
    dispatch({ type: POST_PURCHASEORDER_SUCCESS });
    toast({
      title: "Purchase Order Added!",
      status: "success",
      position: "top",
    });
    setOpenForm(false);
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Add Purchase Order Error:", error);
  }
};

// Get All Purchase Order
export const GetAllPurchaseOrder = async (dispatch, startDate, endDate) => {
  dispatch({ type: GET_ALL_PURCHASE_ORDER_LOADING });
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/purchaseOrder/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Get All Purchase-Out Response:", response);
    dispatch({
      type: GET_ALL_PURCHASE_ORDER_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PURCHASE_ORDER_ERROR });
    console.error("Get All Purchase-Out Error:", error);
  }
};

// Update Purchase Order
export const UpdatePurchaseOrder = async (
  dispatch,
  itemid,
  data,
  toast,
  setIsEditing,
  setEditedData
) => {
  dispatch({ type: PURCHASE_REQUEST });
  toast.closeAll();
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/${firmId}/purchaseOrder/update/${itemid}`,
      data,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Update Purchase Order Response:",response);
    dispatch({ type: UPDATE_PURCHASEORDER_SUCCESS });
    toast({
      title: "Purchase Order Updated",
      status: "success",
      position: "top",
    });
    setIsEditing(false);
    setEditedData({});
  } catch (error) {
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: PURCHASE_FAILURE });
    console.log("Update Purchase Order Error:", error);
  }
};

// Delete Purchase Order
export const DeletePurchaseOrder = async (dispatch, itemId, toast) => {
  dispatch({ type: PURCHASE_REQUEST });
  toast.closeAll();
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/purchaseOrder/delete/${itemId}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Delete Purchase Order Response:",response);
    dispatch({ type: DELETE_PURCHASEORDER_SUCCESS });
    toast({
      title: "Purchase Order Deleted",
      status: "success",
      position: "top",
    });
  } catch (error) {
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: PURCHASE_FAILURE });
    console.log("Delete Purchase Order Error:", error);
  }
};

// -------------------------------- PAYMENT OUT ----------------------------
// Add Payment Out
export const addPayOut = async (dispatch, newItem, setOpenForm, toast) => {
  toast.closeAll();
  dispatch({ type: PURCHASE_REQUEST });
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/purchaseOut/create`,
      newItem,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Add Payment Out Response", response);
    dispatch({ type: POST_PAYOUT_SUCCESS });
    toast({
      title: "Purchase Out Added!",
      status: "success",
      position: "top",
    });
    setOpenForm(false);
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Add Payment Out Error", error);
  }
};

// Get All Payment Out
export const GetAllPaymentOut = async (dispatch, startDate, endDate) => {
  dispatch({ type: GET_ALL_PAYMENT_OUT_LOADING });
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/purchaseOut/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Get All Payment Out Response:", response);
    dispatch({
      type: GET_ALL_PAYMENT_OUT_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PAYMENT_OUT_ERROR });
    console.error("Get All Payment Out Error:", error);
  }
};

// Update Payment-Out
export const updatePayoutBill = async (
  dispatch,
  dataId,
  data,
  toast,
  setIsEditing,
  setEditedData
) => {
  toast.closeAll();
  dispatch({ type: PURCHASE_REQUEST });
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/${firmId}/purchaseOut/update/${dataId}`,
      data,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Update Payment-Out Response:",response);
    dispatch({ type: UPDATE_PAYOUTBILL_SUCCESS });
    toast({
      title: "Payment-Out Updated",
      status: "success",
      position: "top",
    });
    setIsEditing(false);
    setEditedData({});
  } catch (error) {
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: PURCHASE_FAILURE });
    console.log("Update Payment-Out Error:", error);
  }
};

// Delete Payment-Out
export const deletePayoutBill = async (
  dispatch,
  dataId,
  toast,
  setIsEditing,
  setEditedData
) => {
  toast.closeAll();
  dispatch({ type: PURCHASE_REQUEST });
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/purchaseOut/delete/${dataId}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Delete Payment-Out Response:",response);
    dispatch({ type: DELETE_PAYOUTBILL_SUCCESS });
    toast({
      title: "Payment-Out Deleted",
      status: "success",
      position: "top",
    });
    setIsEditing(false);
    setEditedData({});
  } catch (error) {
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: PURCHASE_FAILURE });
    console.log("Delete Payment-Out Error:", error);
  }
};

// ------------------------------------------------- Purchase Return -------------------------------------------------
// Add Purchase Return
export const addPurchaseReturn = async (
  dispatch,
  newItem,
  setOpenForm,
  toast
) => {
  dispatch({ type: PURCHASE_REQUEST });
  toast.closeAll();
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${firmId}/purchaseReturn/create`,
      newItem,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Add Payment Return Response:", response);
    dispatch({ type: POST_PURCHASERETURN_SUCCESS });
    toast({
      title: "Purchase Return Added!",
      status: "success",
      position: "top",
    });
    setOpenForm(false);
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Add Payment Return Error:", error);
  }
};

// Get All Purchase Returns
export const GetAllPurchaseReturns = async (dispatch, startDate, endDate) => {
  dispatch({ type: GET_PURCHASE_RETURN_LOADING });
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/purchaseReturn/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    //  console.log("Get All Payment Return Response:", response);
    dispatch({
      type: GET_PURCHASE_RETURN_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_PURCHASE_RETURN_ERROR });
    console.log("Get All Payment Return Error:", error);
  }
};

// Update Purchase Return
export const UpdatePurchaseReturn = async (
  dispatch,
  dataId,
  data,
  toast,
  setIsEditing,
  setEditedData
) => {
  dispatch({ type: PURCHASE_REQUEST });
  toast.closeAll();
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.put(
      `${API_URL}/${firmId}/purchaseReturn/update/${dataId}`,
      data,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log(Update Payment Return Response:", response);
    dispatch({ type: UPDATE_PURCHASERETURN_SUCCESS });
    toast({
      title: "Purchase Return Updated!",
      status: "success",
      position: "top",
    });
    setIsEditing(false);
    setEditedData({});
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Update Payment Return Error:", error);
  }
};

// Delete Purchase Return
export const DeletePurchaseReturn = async (dispatch, itemId, toast) => {
  dispatch({ type: PURCHASE_REQUEST });
  toast.closeAll();
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/purchaseReturn/delete/${itemId}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log(Delete Payment Return Response:", response);
    dispatch({ type: DELETE_PURCHASERETURN_SUCCESS });
    toast({
      title: "Purchase Return Deleted!",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch({ type: PURCHASE_FAILURE });
    toast({
      description:
        error?.response?.data?.msg || error?.response?.data?.message || "",
      title: "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Delete Payment Return Error:", error);
  }
};
