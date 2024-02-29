import axios from "axios";
import {
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

const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const baseURL = "https://ca-backend-api.onrender.com";

export const addPurchaseBill = (newItem) => (dispatch) => {
  //  console.log(newItem)
   dispatch({ type: PURCHASE_REQUEST });
   // console.log(companyID)
   axios
      .post(
         `https://ca-backend-api.onrender.com/${companyID}/purchase/create`,
         newItem,
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      )
      .then((res) => {
         console.log(res.data.data);
         dispatch({ type: POST_PURCHASEBILL_SUCCESS, payload:res.data.data });
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
  // console.log(companyID)
  axios
     .post(
        `https://ca-backend-api.onrender.com/${companyID}/purchaseOrder/create`,
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
  // console.log(companyID)
  axios
     .post(
        `https://ca-backend-api.onrender.com/${companyID}/purchaseReturn/create`,
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
     // console.log(companyID)
     axios
        .post(
           `https://ca-backend-api.onrender.com/${companyID}/purchaseOut/create`,
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
            `https://ca-backend-api.onrender.com/${companyID}/purchase/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
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
            `https://ca-backend-api.onrender.com/${companyID}/purchaseOut/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
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
            `${baseURL}/${companyID}/purchaseOrder/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
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
            `${baseURL}/${companyID}/purchaseReturn/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
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
