import { SendRegisterRequest } from "../../Redux/business/action";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockOpenOutline } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
import { useState } from "react";

function Busniess() {
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
      SendRegisterRequest(dispatch, formData, navigate, location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Container1">
      <div>
        <h2 className="heading1">ADD BUSINESS</h2>
        <div className="inputbox">
          <label htmlFor="companyName" className="hidden">
            Enter your companyName:
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="input"
            required
          />
          <div className="react-icon">
            <CgOrganisation />
          </div>
        </div>
        <div className="inputbox1">
          <label htmlFor="email" className="hidden">
            Enter your email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            className="input1"
            required
          />
          <div className="react-icon">
            <MdOutlineMailOutline />
          </div>
        </div>
        <div className="inputbox1">
          <label htmlFor="password" className="hidden">
            Enter your password:
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input1"
            required
          />
          <div className="react-icon">
            <IoLockOpenOutline />
          </div>
        </div>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </div>
    </form>
  );
}

export default Busniess;
