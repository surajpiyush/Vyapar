import css from "./Firm.module.css";
import { AddBusinessLoginRequest } from "../../Redux/business/action";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCompanyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
  const [formData, setFormdata] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    acceptTerms: false,
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Input Change Function
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormdata((prev) => {
      return { ...prev, [name]: newValue };
    });
    // Clear validation error when user starts typing
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setValidationErrors(errors);
    if (
      Object.keys(errors).length === 0 &&
      !isLoading &&
      formData?.acceptTerms
    ) {
      AddBusinessLoginRequest(dispatch, formData, setFormdata, navigate);
    }
  };

  // Function to validate form
  const validateForm = (values) => {
    const errors = {};
    if (!values.companyName) {
      errors.companyName = "Business Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }
    if (!values.acceptTerms) {
      errors.acceptTerms = "You must accept the terms and conditions";
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className={css.addBusinessFormOuter}>
      <h2 className={css.formHeading}>ADD BUSINESS</h2>
      <div className={css.inputCont}>
        <input
          type="text"
          name="companyName"
          placeholder="Business Name"
          value={formData?.companyName}
          onChange={handleChange}
          required
        />
        {validationErrors.companyName && (
          <span className={css.errorMsg}>{validationErrors.companyName}</span>
        )}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData?.email}
          onChange={handleChange}
          required
        />
        {validationErrors.email && (
          <span className={css.errorMsg}>{validationErrors.email}</span>
        )}
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData?.phoneNumber}
          onChange={handleChange}
          required
        />
        {validationErrors.phoneNumber && (
          <span className={css.errorMsg}>{validationErrors.phoneNumber}</span>
        )}

        <label className={css.checkboxContainer}>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className={css.checkboxInput}
            required
          />
          <span className={css.checkboxLabel}>
            I accept the terms and conditions
          </span>
        </label>
        {validationErrors.acceptTerms && (
          <span className={css.errorMsg}>{validationErrors.acceptTerms}</span>
        )}

        <button type="submit" className={css.addBtn} disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default AddCompanyPage;
