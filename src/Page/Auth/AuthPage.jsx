import css from "./Auth.module.css";
import Logo from "../../assets/Shop.svg";
import { API_URL } from "../../Redux/store";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoLockOpenOutline as PasswordIcon } from "react-icons/io5";
import { MdOutlineMailOutline as MailIcon } from "react-icons/md";
import { FaRegUserCircle as UserIcon } from "react-icons/fa";
import { CgOrganisation as CompanyIcon } from "react-icons/cg";

const backGroundImg =
  "https://png.pngtree.com/thumb_back/fh260/background/20200801/pngtree-purple-abstract-background-fluid-gradient-with-wave-forms-image_375467.jpg";

const AuthPage = () => {
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
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/companies");
    }
  }, []);

  //   Register Request
  const handleRegister = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setStates((prev) => {
      return { ...prev, isLoading: true, isError: false };
    });

    try {
      const res = await axios.post(
        `${API_URL}/companyRegister/auth/signup`,
        inpVal
      );
      //console.log("SignUp Response", res?.data);
      const userName = res?.data?.companyData?.name || "";
      sessionStorage.setItem("token", res?.data?.companyData?.token);
      sessionStorage.setItem("userId", res?.data?.companyData?.userId);

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

      toast.success(
        userName
          ? `Welcome, ${userName}! Sign up successful.`
          : "Welcome! Signup successful."
      );
      navigate("/companies");
    } catch (error) {
      console.log("Signup Error:", error);
      setStates((prev) => {
        return { ...prev, isLoading: false, isError: true };
      });
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "Issue encountered during sign up."
      );
    }
  };

  //   Login Request
  const handleLogin = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setStates((prev) => {
      return { ...prev, isLoading: true, isError: false };
    });

    try {
      const res = await axios.post(`${API_URL}/companyRegister/auth/signin`, {
        email: inpVal?.email,
        password: inpVal?.password,
      });
      // console.log("LogIn Response", res?.data);
      const userName = res?.data?.result?.name;
      sessionStorage.setItem("token", res?.data?.result?.token);
      sessionStorage.setItem("userId", res?.data?.result?.userId);

      setInpVal({
        name: "",
        companyName: "",
        email: "",
        password: "",
      });
      setStates((prev) => {
        return { ...prev, isLoading: false, toggle: !prev.toggle };
      });
      toast.success(
        userName
          ? `Welcome back, ${userName}! Login successful`
          : "Login successful! Welcome!"
      );
      navigate("/companies");
    } catch (error) {
      console.log("Login Error:", error);
      setStates((prev) => {
        return { ...prev, isLoading: false, isError: true };
      });
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "Error encountered during login, please retry."
      );
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
    <div
      style={{ backgroundImage: `url(${backGroundImg})` }}
      className={css.AuthOuter}
    >
      <div className={css.InnerContDivOuter}>
        <div className={css.leftSideDivOuter}>
          <div className={css.logoDiv}>
            <img src={Logo} alt="Asaanly" />
          </div>
          <h2 className={css.welcomeHeadCss}>
            Welcome to <span>Asaanly!</span>
          </h2>
          <h2 className={css.secondaryHeaderCss}>A GST Billing Platform.</h2>
        </div>

        {/* Form */}
        <div className={css.FormOuter}>
          <section className={css.topBtnContDiv}>
            <button
              onClick={() => setShowRegister(true)}
              style={{
                backgroundColor: showRegister && "var(--SereneSky)",
                color: showRegister && "var(--ElectricBlue)",
                cursor: !showRegister ? "pointer" : "default",
              }}
              className={css.toggleBtns}
            >
              SIGNUP
            </button>
            <button
              onClick={() => setShowRegister(false)}
              style={{
                backgroundColor: !showRegister && "var(--SereneSky)",
                color: !showRegister && "var(--ElectricBlue)",
                cursor: showRegister ? "pointer" : "default",
              }}
              className={css.toggleBtns}
            >
              LOGIN
            </button>
          </section>

          {showRegister ? (
            // Register Form
            <form onSubmit={handleRegister} className={css.actualFormOuter}>
              {/* Name */}
              <div className={css.inputOuter}>
                <UserIcon className={css.inputIcons} />
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
              <div className={css.inputOuter}>
                <CompanyIcon className={css.inputIcons} />
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
              <div className={css.inputOuter}>
                <MailIcon className={css.inputIcons} />
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
              <div className={css.inputOuter}>
                <PasswordIcon className={css.inputIcons} />
                <input
                  type="password"
                  name="password"
                  value={inpVal?.password}
                  onChange={handleInpChange}
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={states?.isLoading}
                className={css.submitBtnDiv}
                style={{
                  cursor: states?.isLoading ? "progress" : "pointer",
                }}
              >
                {states?.isLoading ? (
                  <span className={css.Authloader}></span>
                ) : (
                  "REGISTER"
                )}
              </button>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLogin} className={css.actualFormOuter}>
              {/* Email */}
              <div className={css.inputOuter}>
                <MailIcon className={css.inputIcons} />
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
              <div className={css.inputOuter}>
                <PasswordIcon className={css.inputIcons} />
                <input
                  type="password"
                  name="password"
                  value={inpVal?.password}
                  onChange={handleInpChange}
                  placeholder="Enter Password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={states?.isLoading}
                style={{
                  cursor: states?.isLoading ? "progress" : "pointer",
                }}
                className={css.submitBtnDiv}
              >
                {states?.isLoading ? (
                  <span className={css.Authloader}></span>
                ) : (
                  "LOGIN"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
