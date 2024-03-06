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
} from "./actionTypes";

const API_URL = "https://ca-backend-api.onrender.com";
const token = localStorage.getItem("token");
const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

export const addPurchaseBill = (newItem) => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   axios
      .post(
         `https://ca-backend-api.onrender.com/${FirmId}/purchase/create`,
         newItem,
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      )
      .then((res) => {
         console.log(res.data.data);
         dispatch({ type: POST_PURCHASEBILL_SUCCESS, payload: res.data.data });
         alert("Bill Added ✔️");
      })
      .catch((ERR) => {
         console.log(ERR);
         // alert(`${ERR.response.data.msg}`);
         dispatch({ type: PURCHASE_FAILURE });
      });
   // console.log(`Your item has been sent to the backend:`, newItem);
   // // Consider using a notification library or updating the UI instead of alert
   // alert("Your bill has been posted to the backend");
};

export const addPurchaseOrder = (newItem) => (dispatch) => {
   // console.log(newItem)
   dispatch({ type: PURCHASE_REQUEST });
   // console.log(FirmId)
   axios
      .post(
         `https://ca-backend-api.onrender.com/${FirmId}/purchaseOrder/create`,
         newItem,
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      )
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
   // console.log(`Your item has been sent to the backend:`, newItem);
   // // Consider using a notification library or updating the UI instead of alert
   // alert("Your bill has been posted to the backend");
};

export const addPurchaseReturn = (newItem) => (dispatch) => {
   //   console.log(newItem)
   dispatch({ type: PURCHASE_REQUEST });
   // console.log(FirmId)
   axios
      .post(
         `https://ca-backend-api.onrender.com/${FirmId}/purchaseReturn/create`,
         newItem,
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      )
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

export const addPayOut = (newItem) => (dispatch) => {
   //   console.log(newItem)
   dispatch({ type: PURCHASE_REQUEST });
   // console.log(FirmId)
   axios
      .post(
         `https://ca-backend-api.onrender.com/${FirmId}/purchaseOut/create`,
         newItem,
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      )
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

export const getPurchaseBill =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });

      axios
         .get(
            `https://ca-backend-api.onrender.com/${FirmId}/purchase/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
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

export const getPaymentOutBill =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });
      if (!token) {
         dispatch({ type: PURCHASE_FAILURE });
         return;
      }

      axios
         .get(
            `https://ca-backend-api.onrender.com/${FirmId}/purchaseOut/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
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

export const getPurchaseOrder =
   ({ date }) =>
   (dispatch) => {
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

export const getPurchaseReturn =
   ({ date }) =>
   (dispatch) => {
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

export const updatePurchaseBill =
   ({ id, data }) =>
   (dispatch) => {
      dispatch({ type: PURCHASE_REQUEST });
      console.log(id, data);

      // Assuming 'token' is defined somewhere in your code
      if (!token) {
         dispatch({ type: PURCHASE_FAILURE });
         return;
      }

      axios
         .patch(`${API_URL}/${FirmId}/purchase/update?id=${id}`, data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            console.log(res);
            // dispatch({ type: GET_PURCHASERETURN_SUCCESS, payload: res.data });
         })
         .catch((err) => {
            console.log(err);
            // alert(`${err.response.data.msg}`);
            dispatch({ type: PURCHASE_FAILURE });
         });
   };

// purchase/delete/:id
export const deletePurchaseBill = (_id) => (dispatch) => {
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

export const deletePayoutBill = (_id) => (dispatch) => {
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


export const deletePurchaseOrderBill = (_id) => (dispatch) => {
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


export const deletePurchaseReturnBill = (_id) => (dispatch) => {
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


// export const updatePurchaseBill =
//    ({ id,data }) =>
//    (dispatch) => {
//       dispatch({ type: PURCHASE_REQUEST });
//       if (!token) {
//          dispatch({ type: PURCHASE_FAILURE });
//          return;
//       }
// console.log(id,data)
//       axios
//          .patch(
//             `${API_URL}/${FirmId}/purchase/update/${id}`,data,
//             {
//                headers: {
//                   Authorization: `Bearer ${token}`,
//                },
//             }
//          )
//          .then((res) => {
//              console.log(res);
//             // dispatch({ type: GET_PURCHASERETURN_SUCCESS, payload: res.data });
//          })
//          .catch((ERR) => {
//             console.log(ERR);
//             // alert(`${ERR.response.data.msg}`);
//             dispatch({ type: PURCHASE_FAILURE });
//          });
//    };
