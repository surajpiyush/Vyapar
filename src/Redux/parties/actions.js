import {
  FETCH_PARTIES_LOADING,
  FETCH_PARTIES_ERROR,
  FETCH_PARTIES_SUCCESS,
  SAVE_PARTY_LOADING,
  SAVE_PARTY_ERROR,
  SAVE_PARTY_SUCCESS,
} from "./actionTypes";

import axios from "axios";

// ----------------------- Fetch All Parties Data Function ---- Didn't applied function curring due to thunk error in store.js
export const FetchData = async (dispatch) => {
  dispatch({ type: FETCH_PARTIES_LOADING });

  // const userId = localStorage.getItem("userId");
  // const token = localStorage.getItem("token");
  const userId = "65c5cfc509b34ca8a0187497";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwMjUxOTIsImV4cCI6MTcwODExMTU5Mn0.Ba5HsRW1K1STFbCfo_qs8-U3kPz2x3fU4vyGProBvNs";
  try {
    const response = await axios.get(
      `https://ca-backend-api.onrender.com/${userId}/party/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );

    dispatch({ type: FETCH_PARTIES_SUCCESS, payload: response.data.data });
    console.log("Parties Fetch Data Response:-", response);
  } catch (error) {
    dispatch({ type: FETCH_PARTIES_ERROR });
    console.error("Error Fetching Parties Data:", error);
  }
};

// ------------------------- Save Party Function ---- Didn't applied function curring due to thunk error in store.js
export const SaveParty = async (dispatch, data) => {
  dispatch({ type: SAVE_PARTY_LOADING });

  // const userId = localStorage.getItem("userId");
  // const token = localStorage.getItem("token");
  const userId = "65c5cfc509b34ca8a0187497";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM1Y2ZjNTA5YjM0Y2E4YTAxODc0OTciLCJpYXQiOjE3MDgwMjUxOTIsImV4cCI6MTcwODExMTU5Mn0.Ba5HsRW1K1STFbCfo_qs8-U3kPz2x3fU4vyGProBvNs";
  try {
    const response = await axios.post(
      `https://ca-backend-api.onrender.com/${userId}/party`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    console.log("Business Route Response:", response?.data);

    dispatch({ type: SAVE_PARTY_SUCCESS });
    alert("Party Saved ✔️");
  } catch (error) {
    dispatch({ type: SAVE_PARTY_ERROR });
    console.log("Saving Party Error Response:", error);
    alert(error?.response?.data?.message || "Something Went Wrong!");
  }
};
