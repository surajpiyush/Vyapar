import { AddBusinessLoginRequest } from "../../Redux/business/action";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AddCompanyPage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const [formData, setFormdata] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
  });

  // Input Change Function
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      AddBusinessLoginRequest(
        dispatch,
        formData,
        toast,
        navigate,
        location,
        setFormdata
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      //className="Container1"
      className="addBusinessFormOuter"
    >
      <h2 className="formHeading">ADD BUSINESS</h2>
      <div className="inputCont">
        <input
          type="text"
          name="companyName"
          placeholder="Business Name"
          value={formData?.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData?.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData?.phoneNumber}
          onChange={handleChange}
          required
        />
        <p>
          By clicking on the Login button I accept the
          <span>terms and conditions</span>
        </p>
        <button type="submit" className="addBtn" disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default AddCompanyPage;
