import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoLockOpenOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const apiUrl =
  "https://ca-backend-api.onrender.com/companyRegister/auth/signin";

function Login({ userEmail }) {
  const [inputs, setInputs] = useState({ email: userEmail });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const { email, password } = inputs;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(apiUrl, { email, password });
      setUserData(response?.data);
      localStorage.setItem("token", response?.data?.result.token);
      localStorage.setItem("userId", response?.data?.result.userId);
      navigate("/company");
    } catch (error) {
      console.log("Login Error:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="Container"
    >
      {/* Email */}
      <div className="inputOuter">
        <MdOutlineMailOutline className="input-icons" />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={email || ""}
          onChange={handleChange}
        />
      </div>
      {/* Password */}
      <div className="inputOuter">
        <IoLockOpenOutline className="input-icons" />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password || ""}
          onChange={handleChange}
        />
      </div>
      <div className="button">
        <button type="submit" className="button">
          {loading ? "Loading" : "Login"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default Login;
