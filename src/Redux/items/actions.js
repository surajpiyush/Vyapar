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
  LOADING_UPDATE_ITEM,
  ERROR_UPDATE_ITEM,
  SUCCESS_UPDATE_ITEM,
  LOADING_DELETE_ITEM,
  ERROR_DELETE_ITEM,
  SUCCESS_DELETE_ITEM,
  LOADING_GET_SELECTED_ITEM,
  ERROR_GET_SELECTED_ITEM,
  SUCCESS_GET_SELECTED_ITEM,
  ADD_CATEGORY_SUCCESS,
  GET_All_CATEGORIES_SUCCESS,
  GET_ALL_UNITS_LOADING,
  ADDING_UNIT_SUCCESS,
  GET_ALL_UNITS_SUCCESS,
  ADDING_UNIT_LOADING,
  ADDING_UNIT_ERROR,
  GET_ALL_UNITS_ERROR,
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_ERROR,
  GET_All_CATEGORIES_LOADING,
  GET_All_CATEGORIES_ERROR,
  SUCCESS_DELETE_UNIT,
  ERROR_DELETE_UNIT,
  LOADING_DELETE_UNIT,
  ERROR_UPDATE_UNIT,
  SUCCESS_UPDATE_UNIT,
  LOADING_UPDATE_UNIT,
  LOADING_UPDATE_CATEGORY,
  SUCCESS_UPDATE_CATEGORY,
  ERROR_UPDATE_CATEGORY,
} from "./actionTypes";
import { USER_DETAILS } from "../business/actionTypes";

const API_URL = "https://asaanly.in";

// Add Item **********************************************************
export const AddItem = async (dispatch, newItem, closeForm, toast) => {
  toast.closeAll();
  dispatch({ type: ITEM_REQUEST });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${FirmId}/insertItem`,
      newItem,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("Adding Item Response:", response?.data);
    dispatch({ type: POST_ITEM_SUCCESS });
    toast({
      title: "Item Added Successfully",
      status: "success",
      position: "top",
    });
    closeForm(false);
  } catch (error) {
    toast({
      title: "Something Went Wrong!",
      description: error?.response?.data?.msg || "",
      status: "error",
      position: "top",
    });
    dispatch({ type: ITEM_FAILURE });
    console.log("Adding Items Error:", error);
  }
};

// Get Item *********************************
export const getitems = async (dispatch) => {
  dispatch({ type: ITEM_REQUEST });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(`${API_URL}/${FirmId}/item/allItemData`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Get items response:", response?.data);
    dispatch({ type: GET_ITEM_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    dispatch({ type: ITEM_FAILURE });
    console.log("Getting Items Data Error:", error);
  }
};

// Get Single Item ***************************************
export const GetSelectedItemData = async (dispatch, itemId) => {
  dispatch({ type: LOADING_GET_SELECTED_ITEM });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${FirmId}/item/itemById/${itemId}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Get Selected Item Data Response:", response?.data);
    dispatch({
      type: SUCCESS_GET_SELECTED_ITEM,
      payload: {
        selectedItemData: response?.data?.data?.getItem[0] || {},
        selectedItemTransactionData: response?.data?.data?.allData || {},
      },
    });
  } catch (error) {
    dispatch({ type: ERROR_GET_SELECTED_ITEM });
    console.log("Getting Selected Item Data Error:", error);
  }
};

// Get Single Item ***************************************
export const GetSingleItem = async (dispatch, itemId) => {
  dispatch({ type: LOADING_SINGLE_ITEM });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${FirmId}/sale/getInvoice/${itemId}`,
      { headers: { Authorization: `Bearer ${token} ` } }
    );

    // console.log("Getting Single Item Response:", response);
    dispatch({ type: SUCCESS_SINGLE_ITEM, payload: response?.data?.data });
  } catch (error) {
    dispatch({ type: ERROR_SINGLE_ITEM });
    console.log("Getting Single Item Error:", error);
  }
};

// Get All Items List ********************************
export const GetAllItems = () => async (dispatch) => {
  dispatch({ type: LOADING_GET_ALL_ITEMS });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(`${API_URL}/${FirmId}/item/allItemData`, {
      headers: { Authorization: `Bearer ${token} ` },
    });

    // console.log("Get All Items Response:", response.data);
    dispatch({ type: SUCCESS_GET_ALL_ITEMS, payload: response?.data?.data });
  } catch (error) {
    dispatch({ type: ERROR_GET_ALL_ITEMS });
    console.log("Getting All Items Error:", error);
  }
};

// Update Item *****************************************************
export const UpdateItem = async (
  dispatch,
  itemId,
  updatedData,
  setShowEditFirm,
  toast
) => {
  dispatch({ type: LOADING_UPDATE_ITEM });
  toast.closeAll();
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.patch(
      `${API_URL}/${FirmId}/item/${itemId}`,
      updatedData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Update Item Response:", response.data);
    dispatch({ type: SUCCESS_UPDATE_ITEM });
    toast({
      title: "Item Updated",
      status: "success",
      position: "top",
    });
    setShowEditFirm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: ERROR_UPDATE_ITEM });
    console.error("Updating Item Error:", error);
  }
};

// Delete Item ************************
export const DeleteItem = async (dispatch, partyId, setShowEditFirm, toast) => {
  dispatch({ type: LOADING_DELETE_ITEM });
  toast.closeAll();
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.delete(
      `${API_URL}/${FirmId}/item/${partyId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Delete Item Response:", response?.data);
    dispatch({ type: SUCCESS_DELETE_ITEM });
    toast({
      title: "Item Deleted!",
      status: "success",
      position: "top",
    });
    setShowEditFirm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: ERROR_DELETE_ITEM });
    console.log("Deleting Item Error:", error);
  }
};

//  -------------------------------- Category -----------------------------
// Add New Category
export const AddNewCategory = async (
  dispatch,
  categoryData,
  closeForm,
  toast
) => {
  dispatch({ type: ADD_CATEGORY_LOADING });
  toast.closeAll();
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${FirmId}/createCategoryName`,
      categoryData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Adding Category Response:", response?.data);
    dispatch({ type: ADD_CATEGORY_SUCCESS });
    toast({
      title: "Category Added!",
      status: "success",
      position: "top",
    });
    closeForm(false);
  } catch (error) {
    toast({
      title: error?.response?.data?.msg || "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: ADD_CATEGORY_ERROR });
    console.log("Adding Category Error:", error);
  }
};

// Get All Categories
export const GetAllCategories = async (dispatch) => {
  dispatch({ type: GET_All_CATEGORIES_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${FirmId}/categoryName/allCategoryName`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Getting All Categories Response:", response?.data);
    dispatch({
      type: GET_All_CATEGORIES_SUCCESS,
      payload: response?.data?.data,
    });
  } catch (error) {
    dispatch({ type: GET_All_CATEGORIES_ERROR });
    console.log("Getting All Categories Error:", error);
  }
};

// Update Category
export const UpdateCategory = async (
  dispatch,
  itemId,
  updatedData,
  setShowEditFirm,
  toast
) => {
  toast.closeAll();
  dispatch({ type: LOADING_UPDATE_CATEGORY });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.patch(
      `${API_URL}/${FirmId}/patchCategory/${itemId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Update Category Response:", response.data);
    dispatch({ type: SUCCESS_UPDATE_CATEGORY });
    setShowEditFirm(false);
    toast({
      title: "Category Updated",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch({ type: ERROR_UPDATE_CATEGORY });
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.error("Error Updating Category:", error);
  }
};

// Delete Category
export const DeleteCategory = async (
  dispatch,
  partyId,
  setShowEditFirm,
  toast
) => {
  toast.closeAll();
  dispatch({ type: LOADING_DELETE_ITEM });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.delete(
      `${API_URL}/${FirmId}/deleteCategory/${partyId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("Delete Item Response:", response?.data);
    dispatch({ type: SUCCESS_DELETE_ITEM });
    setShowEditFirm(false);
    toast({
      title: "Item Deleted",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch({ type: ERROR_DELETE_ITEM });
    console.log("Deleting Item Error:", error);
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
  }
};

// ----------------------------------- Unit ---------------------------------
// Add New Unit
export const AddNewUnit = async (dispatch, unitData, closeForm, toast) => {
  dispatch({ type: ADDING_UNIT_LOADING });
  toast.closeAll();
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
  // console.log(categoryName);
  try {
    const response = await axios.post(
      `${API_URL}/${FirmId}/createUnitName`,
      unitData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Adding Item Response:", response?.data);
    dispatch({ type: ADDING_UNIT_SUCCESS });
    toast({
      title: "Unit Added!",
      status: "success",
      position: "top",
    });
    closeForm(false);
  } catch (error) {
    toast({
      title: error?.response?.data?.msg || "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    dispatch({ type: ADDING_UNIT_ERROR });
    console.log("Adding Unit Error", error);
  }
};

// Get All Units
export const GetAllUnits = async (dispatch) => {
  dispatch({ type: GET_ALL_UNITS_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
  try {
    const response = await axios.get(
      `${API_URL}/${FirmId}/createUnitName/allUnitName`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log("Get All Units response:", response?.data);
    dispatch({ type: GET_ALL_UNITS_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    dispatch({ type: GET_ALL_UNITS_ERROR });
    console.log("Error Getting All Units:", error);
  }
};

// Update Unit
export const UpdateUnit = async (
  dispatch,
  itemId,
  updatedData,
  setShowEditFirm,
  toast
) => {
  toast.closeAll();
  dispatch({ type: LOADING_UPDATE_UNIT });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.patch(
      `${API_URL}/${FirmId}/patchUnit/${itemId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Update Category Response:", response.data);
    dispatch({ type: SUCCESS_UPDATE_UNIT });
    setShowEditFirm(false);
    toast({
      title: "Category Updated",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch({ type: ERROR_UPDATE_UNIT });
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
    console.error("Error Updating Category:", error);
  }
};

// Delete Unit
export const DeleteUnit = async (dispatch, partyId, setShowEditFirm, toast) => {
  toast.closeAll();
  dispatch({ type: LOADING_DELETE_UNIT });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.delete(
      `${API_URL}/${FirmId}/deleteUnit/${partyId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log("Delete Item Response:", response?.data);
    dispatch({ type: SUCCESS_DELETE_UNIT });
    setShowEditFirm(false);
    toast({
      title: "Item Deleted",
      status: "success",
      position: "top",
    });
  } catch (error) {
    dispatch({ type: ERROR_DELETE_UNIT });
    console.log("Deleting Item Error:", error);
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
      position: "top",
    });
  }
};
