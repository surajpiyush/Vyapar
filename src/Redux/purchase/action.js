import axios from "axios";
import {
  DELETE_PAYOUTBILL_SUCCESS,
  DELETE_PURCHASEBILL_SUCCESS,
  DELETE_PURCHASEORDER_SUCCESS,
  DELETE_PURCHASERETURN_SUCCESS,
  GET_PAYOUTBILL_SUCCESS,
  GET_PURCHASEBILL_SUCCESS,
  GET_PURCHASEORDER_SUCCESS,
  GET_PURCHASERETURN_SUCCESS,
  POST_PAYOUT_SUCCESS,
  POST_PURCHASEBILL_SUCCESS,
  POST_PURCHASEORDER_SUCCESS,
  POST_PURCHASERETURN_SUCCESS,
  PURCHASE_FAILURE,
  PURCHASE_REQUEST,
  UPDATE_PURCHASEBILL_SUCCESS,
} from "./actionTypes";

const API_URL = "http://asaanly.com";

// puchase Bills
export const addPurchaseBill = (newItem) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
  dispatch({ type: PURCHASE_REQUEST });

  axios
    .post(`${API_URL}/${FirmId}/purchase/create`, newItem, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("Add Purchase Response:", res.data.data);
      dispatch({ type: POST_PURCHASEBILL_SUCCESS, payload: res.data.data });
      alert("Bill Added ✔️");
    })
    .catch((ERR) => {
      console.log("Error Adding Purchase:", ERR);
      // alert(ERR?.response?.data?.message || "");
      dispatch({ type: PURCHASE_FAILURE });
    });
};

export const getPurchaseBill =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: PURCHASE_REQUEST });

    axios
      .get(
        `${API_URL}/${FirmId}/purchase/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //  console.log(res);
        dispatch({ type: GET_PURCHASEBILL_SUCCESS, payload: res.data });
      })
      .catch((ERR) => {
        console.log(ERR);
        // alert(`${ERR.response.data.msg}`);
        dispatch({ type: PURCHASE_FAILURE });
      });
  };

export const updatePurchaseBill = (_id, data) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });

  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .put(`${API_URL}/${FirmId}/purchase/update/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(res?.data?.msg);
      dispatch({ type: UPDATE_PURCHASEBILL_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      // alert(`${err.response.data.msg}`);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

// purchase/delete/:id
export const deletePurchaseBill = (_id) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });
  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .delete(`${API_URL}/${FirmId}/purchase/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(`${res.data.msg}`);
      dispatch({ type: DELETE_PURCHASEBILL_SUCCESS, payload: `${_id}` });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

// ----------------------------------------------
// Purchase order Bill
export const addPurchaseOrder = (newItem) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });
  axios
    .post(`${API_URL}/${FirmId}/purchaseOrder/create`, newItem, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: POST_PURCHASEORDER_SUCCESS, payload: res.data });
      alert("Bill Added ✔️");
    })
    .catch((ERR) => {
      console.log(ERR);
      alert(`${ERR.response.data.msg}`);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

export const getPurchaseOrder =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: PURCHASE_REQUEST });

    if (!token) {
      dispatch({ type: PURCHASE_FAILURE });
      return;
    }
    axios
      .get(
        `${API_URL}/${FirmId}/purchaseOrder/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_PURCHASEORDER_SUCCESS, payload: res.data });
      })
      .catch((ERR) => {
        console.log(ERR);
        // alert(`${ERR.response.data.msg}`);
        dispatch({ type: PURCHASE_FAILURE });
      });
  };

export const deletePurchaseOrderBill = (_id) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });
  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .delete(`${API_URL}/${FirmId}/purchaseOrder/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(`${res.data.msg}`);
      dispatch({ type: DELETE_PURCHASEORDER_SUCCESS, payload: `${_id}` });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

export const updatePurchaseOrderBill = (_id, data) => (dispatch) => {
  dispatch({ type: PURCHASE_REQUEST });

  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .put(`${API_URL}/${FirmId}/purchaseOrder/update/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(res?.data?.msg);
      dispatch({ type: UPDATE_PURCHASEBILL_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      // alert(`${err.response.data.msg}`);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

// ---------------------------------------------------------------
// Purchase paymentOut Bills

export const addPayOut = (newItem) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });

  axios
    .post(`${API_URL}/${FirmId}/purchaseOut/create`, newItem, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      //   console.log(res);
      dispatch({ type: POST_PAYOUT_SUCCESS, payload: res.data });
      alert("Bill Added ✔️");
    })
    .catch((ERR) => {
      console.log(ERR);
      //   alert(`${ERR.response.data.msg}`);
      dispatch({ type: PURCHASE_FAILURE });
    });
  // console.log(`Your item has been sent to the backend:`, newItem);
  // // Consider using a notification library or updating the UI instead of alert
  // alert("Your bill has been posted to the backend");
};

export const getPaymentOutBill =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: PURCHASE_REQUEST });

    if (!token) {
      dispatch({ type: PURCHASE_FAILURE });
      return;
    }

    axios
      .get(
        `${API_URL}/${FirmId}/purchaseOut/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //  console.log(res);
        dispatch({ type: GET_PAYOUTBILL_SUCCESS, payload: res.data });
      })
      .catch((ERR) => {
        console.log(ERR);
        // alert(`${ERR.response.data.msg}`);
        dispatch({ type: PURCHASE_FAILURE });
      });
  };

export const deletePayoutBill = (_id) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });

  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .delete(`${API_URL}/${FirmId}/purchaseOut/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(`${res.data.msg}`);
      dispatch({ type: DELETE_PAYOUTBILL_SUCCESS, payload: `${_id}` });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

export const updatePayoutBill = (_id, data) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });

  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .put(`${API_URL}/${FirmId}/purchaseOut/update/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(res?.data?.msg);
      dispatch({ type: UPDATE_PURCHASEBILL_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      // alert(`${err.response.data.msg}`);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

// -------------------------------------------------
// Purchse Returnbills
export const addPurchaseReturn = (newItem) => (dispatch) => {
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
  const token = localStorage.getItem("token");
  console.log("New Item data-", newItem);
  dispatch({ type: PURCHASE_REQUEST });
  axios
    .post(`${API_URL}/${FirmId}/purchaseReturn/create`, newItem, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      //   console.log(res);
      dispatch({ type: POST_PURCHASERETURN_SUCCESS, payload: res.data });
      alert("Bill Added ✔️");
    })
    .catch((ERR) => {
      console.log(ERR);
      //   alert(`${ERR.response.data.msg}`);
      dispatch({ type: PURCHASE_FAILURE });
    });
  // console.log(`Your item has been sent to the backend:`, newItem);
  // // Consider using a notification library or updating the UI instead of alert
  // alert("Your bill has been posted to the backend");
};

export const getPurchaseReturn =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: PURCHASE_REQUEST });
    if (!token) {
      dispatch({ type: PURCHASE_FAILURE });
      return;
    }
    axios
      .get(
        `${API_URL}/${FirmId}/purchaseReturn/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //  console.log(res);
        dispatch({ type: GET_PURCHASERETURN_SUCCESS, payload: res.data });
      })
      .catch((ERR) => {
        console.log(ERR);
        // alert(`${ERR.response.data.msg}`);
        dispatch({ type: PURCHASE_FAILURE });
      });
  };

export const deletePurchaseReturnBill = (_id) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });

  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .delete(`${API_URL}/${FirmId}/purchaseReturn/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(`${res.data.msg}`);
      dispatch({ type: DELETE_PURCHASERETURN_SUCCESS, payload: `${_id}` });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: PURCHASE_FAILURE });
    });
};

export const updatePurchaseReturnBill = (_id, data) => (dispatch) => {
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

  dispatch({ type: PURCHASE_REQUEST });

  if (!token) {
    dispatch({ type: PURCHASE_FAILURE });
    return;
  }

  axios
    .put(`${API_URL}/${FirmId}/purchaseReturn/update/${_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert(res?.data?.msg);
      dispatch({ type: UPDATE_PURCHASEBILL_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
      // alert(`${err.response.data.msg}`);
      dispatch({ type: PURCHASE_FAILURE });
    });
};
