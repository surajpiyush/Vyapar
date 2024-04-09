import { API_URL, USER_DETAILS } from "../store";

import axios from "axios";
import {
  ADD_CATEGORY_LOADING,
  ADD_CATEGORY_ERROR,
  ADD_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_LOADING,
  GET_ALL_CATEGORIES_ERROR,
  GET_ALL_CATEGORIES_SUCCESS,
  ADD_ITEM_LOADING,
  ADD_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  GET_ALL_ITEMS_LOADING,
  GET_ALL_ITEMS_ERROR,
  GET_ALL_ITEMS_SUCCESS,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_ERROR,
  ADD_EXPENSE_LOADING,
} from "./actionTypes";

// ------------------------------- CATEGORY -----------------------------------
// Add Category
export const AddExpenseCategory = async (dispatch, data, closeForm, toast) => {
  toast.closeAll();
  dispatch({ type: ADD_CATEGORY_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${FirmId}/expenseCategory/createCategoryName`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Add Expense Category Response:", response);
    dispatch({ type: ADD_CATEGORY_SUCCESS });
    toast({
      title: "Expense Category Added!",
      status: "success",
    });
    closeForm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
    });
    dispatch({ type: ADD_CATEGORY_ERROR });
    console.log("Error Adding Expense Category:", error);
  }
};

// Get All Categories
export const GetAllExpenseCategories = async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORIES_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${FirmId}/expenseCategory/allExpenseCategory`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Getting All Expense Categories Response", response?.data);
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_ALL_CATEGORIES_ERROR });
    console.error("Getting All Expense Categories Error:", error);
  }
};

// ------------------------------- ITEM -----------------------------------
// Add Item
export const AddExpenseItem = async (dispatch, data, closeForm, toast) => {
  toast.closeAll();
  dispatch({ type: ADD_ITEM_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      `${API_URL}/${FirmId}/expenseItem/createItemName`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Add Expense Item Response:", response);
    dispatch({ type: ADD_ITEM_SUCCESS });
    toast({
      title: "Expense Item Added!",
      status: "success",
    });
    closeForm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
    });
    dispatch({ type: ADD_ITEM_ERROR });
    console.log("Error Adding Expense Item:", error);
  }
};

// Get All Categories
export const GetAllExpenseItems = async (dispatch) => {
  dispatch({ type: GET_ALL_ITEMS_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.get(
      `${API_URL}/${FirmId}/expenseItem/allExpenseItem`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Getting All Expense Items Response", response?.data);
    dispatch({
      type: GET_ALL_ITEMS_SUCCESS,
      payload: response?.data?.data || [],
    });
  } catch (error) {
    dispatch({ type: GET_ALL_ITEMS_ERROR });
    console.error("Getting All Expense Items Error:", error);
  }
};

// ------------------------------- EXPENSE -----------------------------------
// Add Expense
export const AddExpense = async (
  dispatch,
  withGST,
  data,
  setOpenForm,
  toast
) => {
  toast.closeAll();
  dispatch({ type: ADD_EXPENSE_LOADING });
  const token = localStorage.getItem("token");
  const FirmId = JSON.parse(localStorage.getItem(USER_DETAILS))?._id;

  try {
    const response = await axios.post(
      withGST
        ? `${API_URL}/${FirmId}/expenseWithGst/createExpenseWithGst`
        : `${API_URL}/${FirmId}/expenseWithOutGst/createExpenseWithOutGst`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Add Expense Response:", response);
    dispatch({ type: ADD_EXPENSE_SUCCESS });
    toast({
      title: "Expense Added!",
      status: "success",
    });
    setOpenForm(false);
  } catch (error) {
    toast({
      title:
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "Something Went Wrong!",
      status: "error",
    });
    dispatch({ type: ADD_EXPENSE_ERROR });
    console.log("Error Adding Expense:", error);
  }
};
