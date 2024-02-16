import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const apiUrl =
<<<<<<< HEAD
   "https://ca-backend-api.onrender.com/companyRegister/auth/signin";

function Login() {
   const [inputs, setInputs] = useState({});
   const [userData, setUserData] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();
=======
  "https://ca-backend-api.onrender.com/companyRegister/auth/signin";

function Login() {
  const [inputs, setInputs] = useState({});
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
>>>>>>> 63c11ce9a353e5fa09a5d7f4788ea79ff9e18000

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
   };

   const { email, password } = inputs;

<<<<<<< HEAD
   const handleLogin = async () => {
      try {
         const response = await axios.post(apiUrl, { email, password });
         const { data } = response;
         setUserData(data);
         localStorage.setItem("token", data.result.token);
         localStorage.setItem("userId", data.result.userId);
         console.log(data.result);

         navigate("/");
      } catch (error) {
         setError("Invalid email or password. Please try again.");
      }
   };

   useEffect(() => {
      console.log("Login userData", userData);
   }, [userData]);

   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
         }}
         className="Container1"
      >
         <div>
            <h2 className="heading1">Login Here</h2>
            <div className="inputbox1">
               <label htmlFor="email" className="hidden">
                  Enter your email:
               </label>
               <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email || ""}
                  onChange={handleChange}
                  className="input1"
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
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password || ""}
                  onChange={handleChange}
                  className="input1"
               />
               <div className="react-icon">
                  <IoLockOpenOutline />
               </div>
            </div>
            <button type="submit" className="button">
               Login
            </button>
            {error && <p className="error-message">{error}</p>}
         </div>
      </form>
   );
=======
  const handleLogin = async () => {
    try {
      const response = await axios.post(apiUrl, { email, password });
      const { data } = response;
      setUserData(data);
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("userId", data.result.userId);
      // console.log(data.result)

      navigate("/company");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Login userData", userData);
  }, [userData]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="Container1"
    >
      <div>
        <h2 className="heading1">Login Here</h2>
        <div className="inputbox1">
          <label htmlFor="email" className="hidden">
            Enter your email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email || ""}
            onChange={handleChange}
            className="input1"
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
            type="password"
            name="password"
            placeholder="password"
            value={password || ""}
            onChange={handleChange}
            className="input1"
          />
          <div className="react-icon">
            <IoLockOpenOutline />
          </div>
        </div>
        <button type="submit" className="button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </form>
  );
>>>>>>> 63c11ce9a353e5fa09a5d7f4788ea79ff9e18000
}

export default Login;
