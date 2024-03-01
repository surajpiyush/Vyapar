import axios from "axios";
import {
  GET_ALLTRANSECTION_SUCCESS,
  GET_DAYBOOK_SUCCESS,
  GET_PURCHASEREPORT_SUCCESS,
  GET_SALEREPORT_SUCCESS,
  REPORT_FAILURE,
  REPORT_REQUEST,
} from "./actionTypes";

const API_URL = "https://ca-backend-api.onrender.com";
const token = localStorage.getItem("token");
const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

let RtotalTax = 0;
let RintegratedTax = 0
let RcessTax =0
const RtaxTotal = (data) => {
   // const data = res?.data?.data?.getSale;

   if (data) {
      RtotalTax = data.reduce((acc, e) => acc + e.taxableValue, 0);
   }

   // console.log(totalTax);
};
const RintegratedTaxCal = (data)=>{
   if(data){
      RintegratedTax = data.reduce((acc,e)=> acc + Number(e.integreatedTax), 0)
   }
   console.log(integratedTax)
}

const RcessTaxCal = (data)=>{
   if(data){
      RcessTax = data.reduce((acc,e)=> acc + Number(e.cess), 0)
   }
   console.log(cessTax)
}

let totalTax = 0;
let integratedTax = 0
let cessTax =0
const taxTotal = (data) => {
   // const data = res?.data?.data?.getSale;

   if (data) {
      totalTax = data.reduce((acc, e) => acc + e.taxableValue, 0);
   }

   // console.log(totalTax);
};
const integratedTaxCal = (data)=>{
   if(data){
      integratedTax = data.reduce((acc,e)=> acc + Number(e.integreatedTax), 0)
   }
   console.log(integratedTax)
}

const cessTaxCal = (data)=>{
   if(data){
      cessTax = data.reduce((acc,e)=> acc + Number(e.cess), 0)
   }
   console.log(cessTax)
}


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
            taxTotal(res?.data?.data?.getSale);
            integratedTaxCal(res?.data?.data?.getSale)
            cessTaxCal(res?.data?.data?.getSale)

            RtaxTotal(res?.data?.data?.getSaleReturn);
            RintegratedTaxCal(res?.data?.data?.getSaleReturn)
            RcessTaxCal(res?.data?.data?.getSaleReturn)
            
            dispatch({
               type: GET_SALEREPORT_SUCCESS,
               payload: res.data,
               tax: totalTax,
               integratedTax:integratedTax,
               cess  :cessTax,   

               Rtax: RtotalTax,
               RintegratedTax:RintegratedTax,
               Rcess  :RcessTax
            });
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
        `${API_URL}/${FirmId}/transctionReport/purchaseReport?startDate=${date.startDate}&endDate=${date.endDate}`,
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
