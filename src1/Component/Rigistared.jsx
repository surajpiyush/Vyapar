import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Css/styles.css";
import "../Css/styles1.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CgOrganisation } from "react-icons/cg";
import { IoLockOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
let url = "https://ca-backend-api.onrender.com/companyRegister/auth/signup";

function Register(Props) {
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
   // console.log(Props.func)
   console.log(Props.func);
   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         setLoading(true);
         const data = await axios.post(url, {
            fullName,
            email,
            password,
            companyName,
         });
         setUserData(data.data);
         alert("User Registration Successfull");
         Props.func(true);
      } catch (error) {
         setError(error.response?.data?.message || "An error occurred");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      console.log("userData", userData);
   }, [userData]);

   return (
      <form onSubmit={handleSubmit} className="Container">
         <div>
            <h2 className="heading">Register Here</h2>
            <div className="inputbox">
               <label htmlFor="fullName" className="hidden">
                  Enter your fullName:
               </label>
               <input
                  type="text"
                  name="fullName"
                  placeholder="fullName"
                  value={inputs.fullName || ""}
                  onChange={handleChange}
                  className="input"
               />
               <div className="react-icon">
                  <FaRegUserCircle />
               </div>
            </div>
            <div className="inputbox">
               <label htmlFor="email" className="hidden">
                  Enter your email:
               </label>
               <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  className="input"
               />
               <div className="react-icon">
                  <MdOutlineMailOutline />
               </div>
            </div>
            <div className="inputbox">
               <label htmlFor="companyName" className="hidden">
                  Enter your companyName:
               </label>
               <input
                  type="text"
                  name="companyName"
                  placeholder="comapnyName"
                  value={inputs.companyName || ""}
                  onChange={handleChange}
                  className="input"
               />
               <div className="react-icon">
                  <CgOrganisation />
               </div>
            </div>
            <div className="inputbox">
               <label htmlFor="password" className="hidden">
                  Enter your companyName:
               </label>
               <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  className="input"
               />
               <div className="react-icon">
                  <IoLockOpenOutline />
               </div>
            </div>
            <button type="submit" className="button" disabled={loading}>
               {loading ? "Registering..." : "Register"}
            </button>
            {error && <p className="error-message">{error}</p>}
         </div>
      </form>
   );
}

export default Register;
