import axios from "axios";
import {
   GET_ITEM_SUCCESS,
   POST_ITEM_SUCCESS,
   ITEM_FAILURE,
   ITEM_REQUEST,
} from "./actionTypes";

const token = localStorage.getItem("token"); // Replace "yourTokenKey" with the actual key used to store the token
const baseURL = "https://ca-backend-api.onrender.com";
export const addItem = (newItem, token) => async (dispatch) => {
   dispatch({ type: ITEM_REQUEST });

   try {
      const res = await axios.post(
         `${baseURL}/65b0d66ab97a739aba4e508f/insertItem`,
         newItem,
         {
            headers: { Authorization: `Bearer ${token}` },
         }
      );

      dispatch({ type: POST_ITEM_SUCCESS, payload: res.data });
   } catch (err) {
      console.error("Error adding item:", err);
      dispatch({ type: ITEM_FAILURE });
   }
};

export const getitems = () => async (dispatch) => {
   dispatch({ type: ITEM_REQUEST });

   try {
      //   const token = /* fetch your token */;
      if (!token) {
         dispatch({ type: ITEM_FAILURE });
         return;
      }

      const response = await axios.get(
         `${baseURL}/65b0d66ab97a739aba4e508f/item/allItem`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );

      dispatch({ type: GET_ITEM_SUCCESS, payload: response.data });
      return response;
   } catch (error) {
      dispatch({ type: ITEM_FAILURE });
      throw error;
   }
};
