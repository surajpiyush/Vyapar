import axios from "axios";
import {
   GET_ITEM_SUCCESS,
   POST_ITEM_SUCCESS,
   ITEM_FAILURE,
   ITEM_REQUEST,
} from "./actionTypes";

const token = localStorage.getItem("token"); 
const userId = localStorage.getItem("userId");
const baseURL = "https://ca-backend-api.onrender.com";
export const addItem = (newItem) => async (dispatch) => {
   dispatch({ type: ITEM_REQUEST });

   axios
      .post(`${baseURL}/${userId}/insertItem`, newItem, {
         headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
         console.log(res);
         dispatch({ type: POST_ITEM_SUCCESS, payload: res.data });
      })

      .catch((err) => dispatch({ type: ITEM_FAILURE }));
};

export const getitems = () => async (dispatch) => {
   dispatch({ type: ITEM_REQUEST });

   try {
      if (!token) {
         dispatch({ type: ITEM_FAILURE });
         return;
      }

      const response = await axios.get(`${baseURL}/${userId}/item/allItem`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }); 
      // console.log(response)
      dispatch({ type: GET_ITEM_SUCCESS, payload: response.data });
      return response;
   } catch (error) {
      dispatch({ type: ITEM_FAILURE });
      throw error;
   }
};
