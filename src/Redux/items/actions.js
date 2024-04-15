import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../business/action";
import { API_URL, USER_DETAILS } from "../store";
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
   SUCCESS_DELETE_CATEGORY,
   LOADING_DELETE_CATEGORY,
   ERROR_DELETE_CATEGORY,
} from "./actionTypes";

import axios from "axios";
import { toast } from "react-toastify";

// Get All Items List ********************************
export const GetAllItems = async (dispatch) => {
   dispatch({ type: LOADING_GET_ALL_ITEMS });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;
   const navigate = useNavigate();
   try {
      const response = await axios.get(
         `${API_URL}/${FirmId}/item/allItemData`,
         {
            headers: { Authorization: `Bearer ${token} ` },
         }
      );

      // console.log("Get All Items Response:", response.data);
      dispatch({ type: SUCCESS_GET_ALL_ITEMS, payload: response?.data?.data });
   } catch (error) {
      console.log("Getting All Items Error:", error);
      dispatch({ type: ERROR_GET_ALL_ITEMS });
      toast.dismiss();
      if (error?.response?.data?.tokenExpired) {
         LOGOUT(navigate, true);
         return toast.info("Session Expired! Please Login again.");
      }
   }
};

// Add Item **********************************************************
export const AddItem = async (dispatch, newItem, closeForm) => {
   toast.dismiss();
   dispatch({ type: ITEM_REQUEST });
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.post(
         `${API_URL}/${FirmId}/insertItem`,
         newItem,
         { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Adding Item Response:", response?.data);
      dispatch({ type: POST_ITEM_SUCCESS });
      toast.success("Item added.");
      closeForm(false);
   } catch (error) {
      console.log("Adding New Item Error:", error);
      dispatch({ type: ITEM_FAILURE });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Failed to save item."
      );
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
      console.log("Getting Selected Item Data Error:", error);
      dispatch({ type: ERROR_GET_SELECTED_ITEM });
      toast.dismiss();
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
   }
};

// Update Item *****************************************************
export const UpdateItem = async (
   dispatch,
   itemId,
   updatedData,
   setShowEditFirm
) => {
   toast.dismiss();
   dispatch({ type: LOADING_UPDATE_ITEM });
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
      toast.success("Item details updated.");
      setShowEditFirm(false);
   } catch (error) {
      console.error("Updating Item Error:", error);
      dispatch({ type: ERROR_UPDATE_ITEM });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Failed to modify the item."
      );
   }
};

// Delete Item ************************
export const DeleteItem = async (dispatch, partyId, setShowEditFirm) => {
   dispatch({ type: LOADING_DELETE_ITEM });
   toast.dismiss();
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.delete(
         `${API_URL}/${FirmId}/item/${partyId}`,
         { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Delete Item Response:", response?.data);
      dispatch({ type: SUCCESS_DELETE_ITEM });
      toast.success("Item removed from your list.");
      setShowEditFirm(false);
   } catch (error) {
      console.log("Deleting Item Error:", error);
      dispatch({ type: ERROR_DELETE_ITEM });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error("Couldn't delete the item.");
   }
};

//  -------------------------------- Category -----------------------------
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
      console.log("Getting All Categories Error:", error);
      dispatch({ type: GET_All_CATEGORIES_ERROR });
      toast.dismiss();
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
   }
};

// Add New Category
export const AddNewCategory = async (dispatch, categoryData, closeForm) => {
   dispatch({ type: ADD_CATEGORY_LOADING });
   toast.dismiss();
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
      toast.success("Category added.");
      closeForm(false);
   } catch (error) {
      console.log("Adding Category Error:", error);
      dispatch({ type: ADD_CATEGORY_ERROR });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Failed to add category."
      );
   }
};

// Update Category
export const UpdateCategory = async (
   dispatch,
   itemId,
   updatedData,
   setShowEditFirm
) => {
   dispatch({ type: LOADING_UPDATE_CATEGORY });
   toast.dismiss();
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.patch(
         `${API_URL}/${FirmId}/patchCategory/${itemId}`,
         updatedData,
         { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Update Category Response:", response.data);
      dispatch({ type: SUCCESS_UPDATE_CATEGORY });
      setShowEditFirm(false);
      toast.success("Category updated.");
   } catch (error) {
      console.error("Updating Category Error:", error);
      dispatch({ type: ERROR_UPDATE_CATEGORY });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Failed to update the category."
      );
   }
};

// Delete Category
export const DeleteCategory = async (dispatch, partyId, setShowEditFirm) => {
   dispatch({ type: LOADING_DELETE_CATEGORY });
   toast.dismiss();
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.delete(
         `${API_URL}/${FirmId}/deleteCategory/${partyId}`,
         { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Delete Item Response:", response?.data);
      dispatch({ type: SUCCESS_DELETE_CATEGORY });
      setShowEditFirm(false);
      toast.success("Category removed from your list.");
   } catch (error) {
      console.log("Deleting Category Error:", error);
      dispatch({ type: ERROR_DELETE_CATEGORY });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error("Couldn't delete the category.");
   }
};

// ----------------------------------- Unit ---------------------------------
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
      console.log("Getting All Units Error:", error);
      dispatch({ type: GET_ALL_UNITS_ERROR });
      toast.dismiss();
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
   }
};

// Add New Unit
export const AddNewUnit = async (dispatch, unitData, closeForm) => {
   dispatch({ type: ADDING_UNIT_LOADING });
   toast.dismiss();
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.post(
         `${API_URL}/${FirmId}/createUnitName`,
         unitData,
         { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Adding Item Response:", response?.data);
      dispatch({ type: ADDING_UNIT_SUCCESS });
      toast.success("Unit added.");
      closeForm(false);
   } catch (error) {
      console.log("Adding Unit Error:", error);
      dispatch({ type: ADDING_UNIT_ERROR });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Failed to add unit."
      );
   }
};

// Update Unit
export const UpdateUnit = async (
   dispatch,
   itemId,
   updatedData,
   setShowEditFirm
) => {
   dispatch({ type: LOADING_UPDATE_UNIT });
   toast.dismiss();
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.patch(
         `${API_URL}/${FirmId}/patchUnit/${itemId}`,
         updatedData,
         { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Update Unit Response:", response.data);
      dispatch({ type: SUCCESS_UPDATE_UNIT });
      toast.success("Unit updated.");
      setShowEditFirm(false);
   } catch (error) {
      console.error("Updating Unit Error:", error);
      dispatch({ type: ERROR_UPDATE_UNIT });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error(
         error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Failed to update the unit."
      );
   }
};

// Delete Unit
export const DeleteUnit = async (dispatch, unittId, setShowEditFirm) => {
   dispatch({ type: LOADING_DELETE_UNIT });
   toast.dismiss();
   const token = localStorage.getItem("token");
   const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

   try {
      const response = await axios.delete(
         `${API_URL}/${FirmId}/deleteUnit/${unittId}`,
         { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Delete Item Response:", response?.data);
      dispatch({ type: SUCCESS_DELETE_UNIT });
      setShowEditFirm(false);
      toast.success("Unit removed from your list.");
   } catch (error) {
      console.log("Deleting Item Error:", error);
      dispatch({ type: ERROR_DELETE_UNIT });
      if (error?.response?.data?.tokenExpired) {
         return toast.info("Session Expired! Please Login again.");
      }
      toast.error("Couldn't delete the unit.");
   }
};
