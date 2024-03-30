import { API_URL } from "../store";
import {
  GET_ALLTRANSECTION_SUCCESS,
  GET_DAYBOOK_SUCCESS,
  GET_PURCHASEREPORT_SUCCESS,
  GET_SALEREPORT_SUCCESS,
  REPORT_FAILURE,
  REPORT_REQUEST,
} from "./actionTypes";

import axios from "axios";

const calculateTax = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return { totalTax: 0, integratedTax: 0, cessTax: 0 };
  }

  const totalTax = data.reduce(
    (acc, item) => acc + (item.taxableValue || 0),
    0
  );
  const integratedTax = data.reduce(
    (acc, item) => acc + (Number(item.integratedTax) || 0),
    0
  );
  const cessTax = data.reduce((acc, item) => acc + (Number(item.cess) || 0), 0);

  return { totalTax, integratedTax, cessTax };
};

export const getSaleReport =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: REPORT_REQUEST });

    axios
      .get(
        `${API_URL}/${FirmId}/transctionReport/saleReport?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { getSale, getSaleReturn } = res?.data?.data;
        const { totalTax, integratedTax, cessTax } = calculateTax(getSale);
        const {
          totalTax: RtotalTax,
          integratedTax: RintegratedTax,
          cessTax: RcessTax,
        } = calculateTax(getSaleReturn);

        dispatch({
          type: GET_SALEREPORT_SUCCESS,
          payload: res.data,
          tax: totalTax,
          integratedTax,
          cess: cessTax,
          Rtax: RtotalTax,
          RintegratedTax,
          Rcess: RcessTax,
        });
      })
      .catch((ERR) => {
        console.log("error sale report:", ERR);
        dispatch({ type: REPORT_FAILURE });
      });
  };

export const getPurchaseReport =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: REPORT_REQUEST });

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
        dispatch({ type: GET_PURCHASEREPORT_SUCCESS, payload: res.data });
      })
      .catch((ERR) => {
        console.log(ERR);
        dispatch({ type: REPORT_FAILURE });
      });
  };

export const getDayBookReport =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: REPORT_REQUEST });

    axios
      .get(
        `${API_URL}/${FirmId}/transctionReport/dayBookReport?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_DAYBOOK_SUCCESS, payload: res.data });
      })
      .catch((ERR) => {
        console.log("error getDayBookReport:", ERR);
        dispatch({ type: REPORT_FAILURE });
      });
  };

export const getAllTransections =
  ({ date }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const FirmId = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;

    dispatch({ type: REPORT_REQUEST });

    axios
      .get(
        `${API_URL}/${FirmId}/transctionReport/allTractionReport?startDate=${date.startDate}&endDate=${date.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_ALLTRANSECTION_SUCCESS, payload: res.data });
      })
      .catch((ERR) => {
        console.log("getAllTransections", ERR);
        dispatch({ type: REPORT_FAILURE });
      });
  };
