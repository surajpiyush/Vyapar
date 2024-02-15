import axios from 'axios'
import React, { useState, useEffect } from 'react';
// import "../Css/styles1.css"
// import "../Css/styles.css" 
import { MdOutlineMailOutline } from "react-icons/md"
import { IoLockOpenOutline } from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
const apiUrl = 'https://ca-backend-api.onrender.com/companyRegister/auth/signin';


function Busniess() {
 const [inputs, setInputs] = useState({});
 const [userData, setUserData] = useState("");
 const handleChange = (event) => {
   const name = event.target.name;
   const value = event.target.value;
   setInputs((values) => ({ ...values, [name]: value }));
 };

 const {companyName, email, password } = inputs;
 const handleSubmit = async (event) => {
   event.preventDefault();
   const data = await axios.post(apiUrl, {companyName, email, password });
   setUserData(data.data);
   
 };
 useEffect(() => {
   // console.log("userData", userData)
 }, [userData]);

 return (
   <form onSubmit={handleSubmit} className='Container1'>
         <div>
           <h2 className='heading1'>ADD BUSINESS</h2>
           <div className='inputbox'>
       <label htmlFor="companyName" className="hidden">
         Enter your companyName:
       </label>
       <input
         type="text"
         name="companyName"
         placeholder="comapnyName"
         value={inputs.companyName || ''}
         onChange={handleChange}
         className="input"
       />
        <div className='react-icon'>
       <CgOrganisation/>
       </div>
     </div>
     <div className = 'inputbox1'>
       <label htmlFor="email" className="hidden">
         Enter your email:
       </label>
       <input
         type="email"
         name="email"
         placeholder="email"
         value={inputs.email || ''}
         onChange={handleChange}
         className="input1"
       />
        <div className='react-icon'>
       <MdOutlineMailOutline/>
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
         value={inputs.password || ''}
         onChange={handleChange}
         className="input1"
       />
       <div className='react-icon'>
       <IoLockOpenOutline/>
       </div>
     </div>
     <button type="submit" className="button">
       Login
     </button>
     </div>
   </form>
 );
}

export default Busniess;