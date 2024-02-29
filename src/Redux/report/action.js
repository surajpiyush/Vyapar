import axios from "axios";
import {
   GET_ALLTRANSECTION_SUCCESS,
   GET_DAYBOOK_SUCCESS,
   GET_PURCHASEREPORT_SUCCESS,
   GET_SALEREPORT_SUCCESS,
   REPORT_FAILURE,
   REPORT_REQUEST,
} from "./actionTypes";

const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const baseURL = "https://ca-backend-api.onrender.com";

export const getSaleReport =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: REPORT_REQUEST });
      if (!token) {
         dispatch({ type: REPORT_FAILURE });
         return;
      }

      axios
         .get(
            `${baseURL}/${companyID}/transctionReport/saleReport?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => {
            console.log(res);
            dispatch({ type: GET_SALEREPORT_SUCCESS, payload: res.data });
         })
         .catch((ERR) => {
            console.log(ERR);
            // alert(`${ERR.response.data.msg}`);
            dispatch({ type: REPORT_FAILURE });
         });
   };

export const getPurchaseReport =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: REPORT_REQUEST });
      if (!token) {
         dispatch({ type: REPORT_FAILURE });
         return;
      }

      axios
         .get(
            `${baseURL}/${companyID}/transctionReport/purchaseReport?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => {
            // console.log(res);
            dispatch({ type: GET_PURCHASEREPORT_SUCCESS, payload: res.data });
         })
         .catch((ERR) => {
            // console.log(ERR);
            // alert(`${ERR.response.data.msg}`);
            dispatch({ type: REPORT_FAILURE });
         });
   };

   export const getDayBookReport =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: REPORT_REQUEST });
      if (!token) {
         dispatch({ type: REPORT_FAILURE });
         return;
      }

      axios
         .get(
            `${baseURL}/${companyID}/transctionReport/purchaseReport?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => {
            // console.log(res);
            dispatch({ type: GET_DAYBOOK_SUCCESS, payload: res.data });
         })
         .catch((ERR) => {
            console.log(ERR);
            // alert(`${ERR.response.data.msg}`);
            dispatch({ type: REPORT_FAILURE });
         });
   };

   export const getAllTransections =
   ({ date }) =>
   (dispatch) => {
      dispatch({ type: REPORT_REQUEST });
      if (!token) {
         dispatch({ type: REPORT_FAILURE });
         return;
      }

      axios
         .get(
            `${baseURL}/${companyID}/transctionReport/allTractionReport?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => {
            // console.log(res);
            dispatch({ type: GET_ALLTRANSECTION_SUCCESS, payload: res.data });
         })
         .catch((ERR) => {
            console.log(ERR);
            // alert(`${ERR.response.data.msg}`);
            dispatch({ type: REPORT_FAILURE });
         });
   };