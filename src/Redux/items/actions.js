import axios from "axios";
import {
  GET_ITEM_SUCCESS,
  POST_ITEM_SUCCESS,
  ITEM_FAILURE,
  ITEM_REQUEST,
  LOADING_SINGLE_ITEM,
  ERROR_SINGLE_ITEM,
  SUCCESS_SINGLE_ITEM,
  LOADING_GET_ALL_ITEMS,
  ERROR_GET_ALL_ITEMS,
  SUCCESS_GET_ALL_ITEMS,
} from "./actionTypes";
import { USER_DETAILS } from "../business/actionTypes";

const firmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const baseURL = "https://ca-backend-api.onrender.com";

export const addItem = (newItem, closeForm, toast) => async (dispatch) => {
  toast.closeAll();
  dispatch({ type: ITEM_REQUEST });
  try {
    const response = await axios.post(
      `${baseURL}/${firmId}/insertItem`,
      newItem,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("Adding Item Response:", response?.data);
    dispatch({ type: POST_ITEM_SUCCESS, payload: response?.data });
    toast({
      title: "Item Added Successfully",
      status: "success",
      position: "top",
    });
    closeForm(false);
  } catch (error) {
    console.log("Adding Items Error", error);
    dispatch({ type: ITEM_FAILURE });
    toast({
      title: "Something Went Wrong!",
      description: error?.response?.data?.message || "",
      status: "error",
      position: "top",
    });
  }
};

export const getitems = () => async (dispatch) => {
  dispatch({ type: ITEM_REQUEST });

  if (!token) {
    dispatch({ type: ITEM_FAILURE });
    return;
  }

  axios
    .get(`${baseURL}/${userId}/item/allItem`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // console.log(response)
      dispatch({ type: GET_ITEM_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      console.log("Error Getting Items data:", error);
      dispatch({ type: ITEM_FAILURE });
    });
  // throw error;
};

// Get Single item
export const GetSingleItem = async (dispatch, itemId) => {
  dispatch({ type: LOADING_SINGLE_ITEM });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `https://ca-backend-api.onrender.com/${FirmId}/sale/getInvoice/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );

    console.log("Get Single Item Response:", response.data);
    dispatch({ type: SUCCESS_SINGLE_ITEM, payload: response?.data?.data });
  } catch (error) {
    console.log("Getting Single Item Error:", error);
    dispatch({ type: ERROR_SINGLE_ITEM });
  }
};

// Get All items List
export const GetAllItems = () => async (dispatch) => {
  dispatch({ type: LOADING_GET_ALL_ITEMS });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `https://ca-backend-api.onrender.com/${FirmId}/item/allItemData`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    // console.log("Get All Items Response:", response.data);
    dispatch({ type: SUCCESS_GET_ALL_ITEMS, payload: response?.data?.data });
  } catch (error) {
    console.log("Getting All Items Error:", error);
    dispatch({ type: ERROR_GET_ALL_ITEMS });
  }
};
