import "../../Css/styles.css";
import "../../Css/styles1.css";

import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoLockOpenOutline as PasswordIcon } from "react-icons/io5";
import { MdOutlineMailOutline as MailIcon } from "react-icons/md";
import { FaRegUserCircle as UserIcon } from "react-icons/fa";
import { CgOrganisation as CompanyIcon } from "react-icons/cg";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

const API_URL = "https://ca-backend-api.onrender.com";

const AuthPage = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [states, setStates] = useState({
    isLoading: false,
    isError: false,
    toggle: false,
  });
  const [inpVal, setInpVal] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
  });

  //   Checking token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/companies", {
        state: { redirectTo: location.pathname },
        replace: true,
      });
    }
  }, []);

  //   Register Request
  const handleRegister = async (e) => {
    e.preventDefault();
    setStates((prev) => {
      return { ...prev, isLoading: true, isError: false };
    });
    toast.closeAll();

    try {
      const res = await axios.post(
        `${API_URL}/companyRegister/auth/signup`,
        inpVal
      );
      // console.log("SignUp Response", res?.data);
      const userName = res?.data?.companyData?.name;
      localStorage.setItem("token", res?.data?.companyData?.token);
      localStorage.setItem("userId", res?.data?.companyData?.userId);
      toast({
        title: "SignUp Successfull!",
        description: userName ? `Hello! ${userName}` : "",
        status: "success",
        position: "top",
      });
      setInpVal({
        name: "",
        companyName: "",
        email: "",
        password: "",
      });
      setShowRegister(false);
      setStates((prev) => {
        return { ...prev, isLoading: false, toggle: !prev.toggle };
      });
      navigate("/companies", {
        state: { redirectTo: location.pathname },
        replace: true,
      });
    } catch (error) {
      console.log("Signup Error:", error);
      toast({
        title: "Something Went Wrong!",
        description: error.response?.data?.message || "",
        status: "error",
        position: "top",
      });
      setStates((prev) => {
        return { ...prev, isLoading: false, isError: true };
      });
    }
  };

  //   Login Request
  const handleLogin = async (e) => {
    e.preventDefault();
    setStates((prev) => {
      return { ...prev, isLoading: true, isError: false };
    });
    toast.closeAll();

    try {
      const res = await axios.post(`${API_URL}/companyRegister/auth/signin`, {
        email: inpVal?.email,
        password: inpVal?.password,
      });
      // console.log("LogIn Response", res?.data);
      const userName = res?.data?.result?.name;
      localStorage.setItem("token", res?.data?.result?.token);
      localStorage.setItem("userId", res?.data?.result?.userId);
      toast({
        title: "LogIn Successfull!",
        description: userName ? `Hello! ${userName}` : "",
        status: "success",
        position: "top",
      });
      setInpVal({
        name: "",
        companyName: "",
        email: "",
        password: "",
      });
      setStates((prev) => {
        return { ...prev, isLoading: false, toggle: !prev.toggle };
      });
      navigate("/companies", {
        state: { redirectTo: location.pathname },
        replace: true,
      });
    } catch (error) {
      console.log("Login Error:", error);
      toast({
        title: "Something Went Wrong!",
        description: error.response?.data?.message || "",
        status: "error",
        position: "top",
      });
      setStates((prev) => {
        return { ...prev, isLoading: false, isError: true };
      });
    }
  };

  //   Input change handler
  const handleInpChange = (e) => {
    const { name, value } = e.target;
    setInpVal((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="body" style={{ height: "100vh", width: "100vw" }}>
      <div className="tab-container">
        <section className="tab-button">
          <button
            onClick={() => setShowRegister(true)}
            style={{
              backgroundColor: showRegister && "#abc0ff",
              color: showRegister && "black",
            }}
            className="tab-items"
          >
            Signup
          </button>
          <button
            onClick={() => setShowRegister(false)}
            style={{
              backgroundColor: !showRegister && "#abc0ff",
              color: !showRegister && "black",
            }}
            className="tab-items"
          >
            LogIn
          </button>
        </section>

        {showRegister ? (
          <section className="regsiter-tab">
            <form onSubmit={handleRegister} className="Container">
              {/* Name */}
              <div className="inputOuter">
                <UserIcon className="input-icons" />
                <input
                  type="text"
                  name="name"
                  value={inpVal?.name}
                  onChange={handleInpChange}
                  placeholder="Username"
                  required
                />
              </div>
              {/* Business NAME */}
              <div className="inputOuter">
                <CompanyIcon className="input-icons" />
                <input
                  type="text"
                  name="companyName"
                  value={inpVal?.companyName}
                  onChange={handleInpChange}
                  placeholder="Business Name"
                  required
                />
              </div>
              {/* Email */}
              <div className="inputOuter">
                <MailIcon className="input-icons" />
                <input
                  type="email"
                  name="email"
                  value={inpVal?.email}
                  onChange={handleInpChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              {/* Password */}
              <div className="inputOuter">
                <PasswordIcon className="input-icons" />
                <input
                  type="password"
                  name="password"
                  value={inpVal?.password}
                  onChange={handleInpChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="button">
                <button type="submit" disabled={states?.isLoading}>
                  {states?.isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className="login-tab">
            <form onSubmit={handleLogin} className="Container">
              {/* Email */}
              <div className="inputOuter">
                <MailIcon className="input-icons" />
                <input
                  type="email"
                  name="email"
                  value={inpVal?.email}
                  onChange={handleInpChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              {/* Password */}
              <div className="inputOuter">
                <PasswordIcon className="input-icons" />
                <input
                  type="password"
                  name="password"
                  value={inpVal?.password}
                  onChange={handleInpChange}
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="button">
                <button
                  type="submit"
                  className="button"
                  disabled={states?.isLoading}
                >
                  {states?.isLoading ? "Loading" : "Login"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
