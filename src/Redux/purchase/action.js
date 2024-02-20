import axios from "axios";
import {
   GET_PURCHASEBILL_SUCCESS,
   POST_PURCHASEBILL_SUCCESS,
   PURCHASE_FAILURE,
   PURCHASE_REQUEST,
} from "./actionTypes";

   const token = localStorage.getItem("token");
   const userId = localStorage.getItem("userId");
   const baseURL = "https://ca-backend-api.onrender.com";

export const addPurchaseBill = (newItem) => async (dispatch) => {
   dispatch({ type: PURCHASE_REQUEST });

   try {
      const res = await axios.post(
         `${baseURL}/${userId}/purchase/create`,
         newItem,
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      );

      console.log(`Your item has been sent to the backend:`, newItem);
      // Consider using a notification library or updating the UI instead of alert
      alert("Your bill has been posted to the backend");

      dispatch({ type: POST_PURCHASEBILL_SUCCESS, payload: res.data });
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
      .get(`https://ca-backend-api.onrender.com/65c5d0d209b34ca8a018749d/purchase/getAll`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      .then((res) => {
         console.log(res)
         dispatch({ type: GET_PURCHASEBILL_SUCCESS, payload: res.data });
         // return res  
      })
      .catch((ERR) => {
         // console.log(ERR)
         alert(`${ERR.response.data.msg}`);
         dispatch({ type: PURCHASE_FAILURE });
      });

   // return response;
};
