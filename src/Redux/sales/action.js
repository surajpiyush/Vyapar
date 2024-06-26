import { API_URL, USER_DETAILS } from "../store";
import {
  IS_LOADING,
  IS_ERROR,
  LOADING_SINGLE_INVOICE,
  ERROR_SINGLE_INVOICE,
  SUCCESS_SINGLE_INVOICE,
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
  POST_CREDIT_NOTE_SUCCESS,
  GET_ALL_CREDIT_NOTES_SUCCESS,
  DELETE_SALES_INVOICE_SUCCESS,
  DELETE_ESTIMATE_SUCCESS,
  DELETE_PAYMENT_IN_SUCCESS,
  DELETE_ALL_SALE_ORDER_SUCCESS,
  DELETE_ALL_DELIVERY_CHALLAN_SUCCESS,
  DELETE_ALL_CREDIT_NOTES_SUCCESS,
  UPDATE_SALES_INVOICE_SUCCESS,
  UPDATE_ESTIMATE_SUCCESS,
  UPDATE_PAYMENT_IN_SUCCESS,
  UPDATE_ALL_SALE_ORDER_SUCCESS,
  UPDATE_ALL_DELIVERY_CHALLAN_SUCCESS,
  UPDATE_ALL_CREDIT_NOTES_SUCCESS,
} from "./reducer";

import axios from "axios";

// --------------------------------------- INVOICE ------------------------------------
// Post Sales Invoice Request
export const PostSalesInvoice = async (dispatch, data, setOpenForm, toast) => {
  toast.closeAll();
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    // prettier-ignore
    const response = await axios.post( // eslint-disable-line no-unused-vars
      `${API_URL}/${firmId}/sale/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    //  console.log("Post Sales Invoice Response:", response?.data);
    dispatch(POST_SALES_INVOICE_SUCCESS());
    setOpenForm(false);
    toast({
      title: "Invoice Added!",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch(IS_ERROR());
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Post Sales Invoice Response:", error);
  }
};

// Get All Sales Invoice Request
export const GetAllSalesInvoice = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  console.log("firmid", startDate,endDate);
  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Get All Invoices Response:", response?.data);
    dispatch(GET_SALES_INVOICE_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Invoices:", error);
  }
};

// Get Single Invoice Data Request
export const GetSingleInvoiceData = async (dispatch, itemId, toast) => {
  dispatch(LOADING_SINGLE_INVOICE());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/getInvoice/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Get Single Invoice Response:", response?.data);
    dispatch(SUCCESS_SINGLE_INVOICE(response?.data?.data[0][0] || {}));
  } catch (error) {
    dispatch(ERROR_SINGLE_INVOICE());
    toast.closeAll();
    toast({
      title: "Encountered an issue while printing the Invoice.",
      description: "Please try again later!",
      status: "error",
      position: "top",
    });
    console.log("Error Getting Single Invoice:", error);
  }
};

// Delete the invoice
export const deleteSalesInvoice = async (dispatch, _id) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/sale/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Invoice Delete Response:", response?.data);
    dispatch(DELETE_SALES_INVOICE_SUCCESS(_id));
    alert(response?.data?.msg || "");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Deleting Invoice:", error);
  }
};

// Update the Invoice
export const updateSalesInvoice = (_id, data) => (dispatch) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  axios
    .put(`${API_URL}/${firmId}/sale/update/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Update Invoice Response:", res);
      dispatch(UPDATE_SALES_INVOICE_SUCCESS());
      alert(res?.data?.msg || "");
    })
    .catch((err) => {
      dispatch(IS_ERROR());
      console.log("Error Updating Invoice:", err);
      // alert(err?.response?.data?.msg || "");
    });
};

// --------------------------------------- ESTIMATES ------------------------------------
// Post Sales Estimate Request
export const PostEstimates = async (dispatch, data, setOpenForm, toast) => {
  toast.closeAll();
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    // prettier-ignore
    const response = await axios.post( // eslint-disable-line no-unused-vars
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
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Error Posting Estimates:", error);
  }
};

// Get All Estimates Request
export const GetAllEstimates = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
console.log("this is sdaate",startDate,endDate)
  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/saleEstimate/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );
console.log("qgdyegdyeg",response?.data?.data)
    // console.log("Getting All Estimates Response:", response?.data);
    dispatch(GET_ESTIMATE_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Estimates:", error);
  }
};

// Delete the invoice
export const deleteAllEstimates = async (dispatch, _id) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/sale/saleEstimate/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Deleted Estimate Response :", response?.data);
    dispatch(DELETE_ESTIMATE_SUCCESS(_id));
    alert(response?.data?.msg || "");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Deleting Estimate:", error);
  }
};

// Update the Estimates
export const updateAllEstimates = (_id, data) => (dispatch) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  axios
    .put(`${API_URL}/${firmId}/sale/saleEstimate/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Update Estimate Response:",res);
      dispatch(UPDATE_ESTIMATE_SUCCESS());
      alert(res?.data?.msg || "");
    })
    .catch((err) => {
      // alert(`${err.response.data.msg}`);
      dispatch(IS_ERROR());
      console.log("Error Updating Estimate:", err);
    });
};

// --------------------------------------- PAYMENT IN ------------------------------------
// Post Payment-In Request
export const PostPaymentIn = async (dispatch, data, closeForm, toast) => {
  dispatch(IS_LOADING());
  toast.closeAll();
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    // prettier-ignore
    const response = await axios.post( // eslint-disable-line no-unused-vars
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
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Error Post Payment-In:", error);
  }
};

// Get All Payment-In Data Request
export const GetAllPaymentIn = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
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

// Delete the payment-in
export const deletePaymentIn = async (dispatch, _id) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/sale/salePaymentIn/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Delete Payment-In Response:", response?.data);
    dispatch(DELETE_PAYMENT_IN_SUCCESS(_id));
    alert(response?.data?.msg || "");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Deleting Payment-In:", error);
  }
};

// Update the payment-in
export const updatePaymentIn = (_id, data) => (dispatch) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  axios
    .put(`${API_URL}/${firmId}/sale/salePaymentIn/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Update Payment-In Response:", res);
      dispatch(UPDATE_PAYMENT_IN_SUCCESS());
      alert(res?.data?.msg || "");
    })
    .catch((err) => {
      // alert(err?.response?.data?.msg || "");
      dispatch(IS_ERROR());
      console.log("Error Updating Payment-In:", err);
    });
};

// --------------------------------------- SALE ORDER ------------------------------------
// Post Sale Order Request
export const PostSaleOrder = async (dispatch, data, setOpenForm, toast) => {
  dispatch(IS_LOADING());
  toast.closeAll();
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    // prettier-ignore
    const response = await axios.post( // eslint-disable-line no-unused-vars
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
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Error Post Sale Order:", error);
  }
};

// Post Sale Order Request
export const GetAllSaleOrders = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/saleOrder/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Get All Sale Orders Response:", response?.data);
    dispatch(GET_All_SALE_ORDER_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Getting All Sale Orders Error:", error);
  }
};

// Delete the sale Order
export const deleteAllSaleOrder = async (dispatch, _id) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/sale/saleOrder/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Deleted Sale Order Response:", response?.data);
    dispatch(DELETE_ALL_SALE_ORDER_SUCCESS(_id));
    alert(response?.data?.msg || "");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Deleting Sale Order:", error);
  }
};

// Update the sale Order
export const updateAllSaleOrder = (_id, data) => (dispatch) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  axios
    .put(`${API_URL}/${firmId}/sale/saleOrder/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Update Sale Order Response:", res?.data);
      dispatch(UPDATE_ALL_SALE_ORDER_SUCCESS());
      alert(res?.data?.msg || "");
    })
    .catch((err) => {
      // alert(err?.response?.data?.msg || "");
      dispatch(IS_ERROR());
      console.log("Error Updating Sale Order:", err);
    });
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
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    // prettier-ignore
    const response = await axios.post( // eslint-disable-line no-unused-vars
      `${API_URL}/${firmId}/sale/deliveryChallan`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log("Post Delivery Challan Response:", response?.data);
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
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Error Post Delivery Challan:", error);
  }
};

// Get All Delivery Challans Request
export const GetAllDeliveryChallans = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/deliveryChallan/getAll?startDate=${startDate}&endDate=${endDate}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Getting All Delivery Challans Response:", response?.data);
    dispatch(GET_ALL_DELIVERY_CHALLAN_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Delivery Challans:", error);
  }
};

// Delete the delivery Challan
export const deleteAllDeliveryChallan = async (dispatch, _id) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/sale/deliveryChallan/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Delete Delivery Challan Response:", response?.data);
    dispatch(DELETE_ALL_DELIVERY_CHALLAN_SUCCESS(_id));
    alert(response?.data?.msg || "");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Deleting Delivery Challan", error);
  }
};

// Update the delivery Challan
export const updateAllDeliveryChallan = (_id, data) => (dispatch) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  axios
    .put(`${API_URL}/${firmId}/sale/deliveryChallan/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Update Delivery Challan Response:", res?.data);
      dispatch(UPDATE_ALL_DELIVERY_CHALLAN_SUCCESS());
      alert(res?.data?.msg || "");
    })
    .catch((err) => {
      // alert(err?.response?.data?.msg || "");
      dispatch(IS_ERROR());
      console.log("Error Updating Delivery Challan", err);
    });
};

// --------------------------------------- SALE RETURN / CREDIT NOTE ------------------------------------
// Post Credit Note Request
export const PostCreditNote = async (dispatch, data, setOpenForm, toast) => {
  dispatch(IS_LOADING());
  toast.closeAll();
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    // prettier-ignore
    const response = await axios.post( // eslint-disable-line no-unused-vars
      `${API_URL}/${firmId}/sale/saleReturnCredit`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
          // "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log("Post Credit Note Response:", response?.data);
    dispatch(POST_CREDIT_NOTE_SUCCESS());
    setOpenForm(false);
    toast({
      title: "Credit Note Added ✔️",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch(IS_ERROR());
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.log("Error Post Credit Note:", error);
  }
};

// Get All Credit Notes Request
export const GetAllCreditNotes = async (dispatch, startDate, endDate) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.get(
      `${API_URL}/${firmId}/sale/saleReturnCredit/getAll?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Getting All Credit Notes Response:", response?.data);
    dispatch(GET_ALL_CREDIT_NOTES_SUCCESS(response?.data?.data));
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Getting All Credit Notes:", error);
  }
};

// Delete the sale Return Credit
export const deleteAllCreditNotes = async (dispatch, _id) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.delete(
      `${API_URL}/${firmId}/sale/saleReturnCredit/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Delete Sales Credit Note Response:", response?.data);
    dispatch(DELETE_ALL_CREDIT_NOTES_SUCCESS(_id));
    alert(response?.data?.msg || "");
  } catch (error) {
    dispatch(IS_ERROR());
    console.log("Error Deleting Sales Credit Note", error);
  }
};

// Update the sale Return Credit
export const updateAllCreditNotes = (_id, data) => (dispatch) => {
  dispatch(IS_LOADING());
  const token = sessionStorage.getItem("token");
  const firmId = JSON.parse(sessionStorage.getItem(USER_DETAILS))?._id;

  axios
    .put(`${API_URL}/${firmId}/sale/saleReturnCredit/${_id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      // console.log("Update Sales Credit Note Response:", res?.data);
      dispatch(UPDATE_ALL_CREDIT_NOTES_SUCCESS());
      alert(res?.data?.msg || "");
    })
    .catch((err) => {
      // alert(err?.response?.data?.msg || "");
      dispatch(IS_ERROR());
      console.log("Error Updating Sales Credit Note", err);
    });
};

// This function takes a date as param and returns it as DD/MM/YYYY
export const FormatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  return formattedDate;
};

// This function takes price in number and returns in form of words
export function ConvertPriceToWords(price) {
  // Check if the input is a valid number
  if (isNaN(price) || price < 0) {
    return "Encountered error while displaying amount in words";
  }

  // Array of Indian number names
  const indianNumbers = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tensNames = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  // Function to convert a number less than 1000 to words
  function convertLessThanOneThousand(num) {
    let result = "";
    if (num >= 100) {
      result += indianNumbers[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      result += tensNames[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 0) {
      result += indianNumbers[num] + " ";
    }
    return result.trim();
  }

  // Function to convert the whole number to words
  function convertWholeNumberToWords(num) {
    let result = "";
    if (num === 0) {
      return "Zero";
    }
    let index = 0;
    do {
      let chunk = num % 1000;
      if (chunk !== 0) {
        result =
          convertLessThanOneThousand(chunk) +
          ["", "Thousand ", "Lakh ", "Crore "][index] +
          result;
      }
      index++;
      num = Math.floor(num / 1000);
    } while (num > 0);
    return result.trim();
  }

  // Function to convert the decimal part to words
  function convertDecimalToWords(num) {
    const decimalStr = num.toFixed(2).split(".")[1];
    const firstDigit = Math.floor(decimalStr / 10);
    const secondDigit = decimalStr % 10;
    let result = "";
    if (firstDigit > 0) {
      result += indianNumbers[firstDigit] + " ";
    }
    if (secondDigit > 0) {
      result += indianNumbers[secondDigit] + " ";
    }
    return result.trim();
  }

  // Main function
  const wholePart = Math.floor(price);
  const decimalPart = price - wholePart;
  let result = "";
  if (wholePart > 0) {
    result += convertWholeNumberToWords(wholePart) + " Rupees ";
  }
  if (decimalPart > 0) {
    result += "and " + convertDecimalToWords(decimalPart) + " Paisa ";
  }
  result += "only";
  return result.trim();
}

export function generateInvoiceNumber(ref = false) {
  const currentDate = new Date();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthIndex = currentDate.getMonth();
  const month = monthNames[monthIndex];
  const previousYear =
    monthIndex < 3
      ? (currentDate.getFullYear() - 1).toString().slice(-2)
      : currentDate.getFullYear().toString().slice(-2);
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const date = currentDate.getDate();
  const sec = currentDate.getSeconds();
  //  console.log(monthIndex);
  // Format the invoice number
  const invoiceNumber = ref
    ? `${date}${hours}${minutes}${sec}${month}${previousYear}-${
        Number(previousYear) + 1
      }`
    : `${date}${hours}${minutes}${sec}/${month}/${previousYear}-${
        Number(previousYear) + 1
      }`;

  //  console.log(invoiceNumber)
  return invoiceNumber;
}
