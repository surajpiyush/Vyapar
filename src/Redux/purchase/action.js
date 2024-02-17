import axios from "axios";
import {
   GET_PURCHASEBILL_SUCCESS,
   POST_PURCHASEBILL_SUCCESS,
   PURCHASE_FAILURE,
   PURCHASE_REQUEST,
} from "./actionTypes";

const token = localStorage.getItem("token");
const baseURL = "https://ca-backend-api.onrender.com";

export const addPurchaseBill = (newItem) => async (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   try {
      // const res = await axios.post(
      //    `${baseURL}/65bbb395b587fda4e5433bd2/`,
      //    newItem,
      //    {
      //       headers: { Authorization: `Bearer ${token}` },
      //    }
      // );
      let res = newItem;
      console.log(`your item ${newItem} has been send to backend`);
      alert("Your bill has been posted to backend");

      dispatch({ type: POST_PURCHASEBILL_SUCCESS, payload: res });
   } catch (err) {
      console.error("Error adding item:", err);
      dispatch({ type: PURCHASE_FAILURE });
   }
};

export const getPurchaseBill = () => (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   if (!token) {
      dispatch({ type: PURCHASE_FAILURE });
      return;
   }

   axios
      .get(`${baseURL}/65c5d0d209b34ca8a018749d/purchase/getAll`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      .then((res) => {
         dispatch({ type: GET_PURCHASEBILL_SUCCESS, payload: res });
      })
      .catch((ERR) => {
         // console.log(ERR)
         alert(`${ERR.response.data.msg}`);
         dispatch({ type: PURCHASE_FAILURE });
      });

   // return response;
};
