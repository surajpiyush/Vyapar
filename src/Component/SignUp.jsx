import "../Css/styles.css";
import "../Css/styles1.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { IoLockOpenOutline } from "react-icons/io5";

function SignUp({ func, setUserEmail }) {
  let url = "https://ca-backend-api.onrender.com/companyRegister/auth/signup";
  const [inputs, setInputs] = useState({});
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const { fullName, email, companyName, password } = inputs;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(url, {
        fullName,
        email,
        password,
        companyName,
      });
      //  console.log(response.data);
      setUserEmail(response?.data?.email);
      func(true);
      alert("User Registration Successfull");
    } catch (error) {
      console.log("Signup Error:", error);
      setError(error.response?.data?.message || "An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Container">
      {/* Name */}
      <div className="inputOuter">
        <FaRegUserCircle className="input-icons" />
        <input
          type="text"
          name="fullName"
          placeholder="Username"
          value={inputs.fullName || ""}
          onChange={handleChange}
        />
      </div>
      {/* Business NAME */}
      <div className="inputOuter">
        <CgOrganisation className="input-icons" />
        <input
          type="text"
          name="companyName"
          placeholder="Business Name"
          value={inputs.companyName || ""}
          onChange={handleChange}
        />
      </div>
      {/* Email */}
      <div className="inputOuter">
        <MdOutlineMailOutline className="input-icons" />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
      </div>
      {/* Password */}
      <div className="inputOuter">
        <IoLockOpenOutline className="input-icons" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </div>

      <div className="button">
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default SignUp;
