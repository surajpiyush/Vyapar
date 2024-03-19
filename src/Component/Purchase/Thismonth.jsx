import React from "react";
import "./months.css";
import { ArrowDownIcon, EqualIcon, PlusIcon } from "../utils/reactIcons";
import { BsFiletypeXlsx } from "react-icons/bs";

const Thismonth = ({
   isshowcards = true,
   ishowPayment = false,
   selectoptions,
   startDate,
   endDate,
   setEndDate,
   setStartDate,
}) => {
   const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
   };

   const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
   };

   return (
      <div className="this-month-container">
         <section className="this-month-top">
            <aside className="this-month-heading">
               <h5>This Month</h5>
               <ArrowDownIcon />
            </aside>
            <aside className="this-month-dates">
               <label htmlFor="#">Between</label>
               <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
               />
               <span>To</span>
               <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={handleEndDateChange}
               />
            </aside>
            <aside className="this-month-select">
               <select name="firms">
                  <option value="" disabled>
                     Select
                  </option>
                  {["All Firms", "My Company"].map((item, index) => (
                     <option key={index} value={item}>
                        {item}
                     </option>
                  ))}
               </select>
            </aside>
            <aside>
               <div
                  style={{ gap: "20px", paddingRight: "15px", display: "flex" }}
               >
                  <div className="d-flex-col">
                     <div>
                        <div style={{padding:"10px 0 0 30px"}}>
                        <BsFiletypeXlsx />
                        </div>
                        <div>
                           <span>Excel Report</span>
                        </div>
                     </div>
                  </div>
                  <div className="d-flex-col">
                     <div>
                        <div>
                           <i className="fa fa-print" aria-hidden="true"></i>
                        </div>
                        <div>
                           <span>Print</span>
                        </div>
                     </div>
                  </div>
               </div>
            </aside>
         </section>
         {isshowcards && (
            <section className="this-month-card-section">
               <aside className="this-month-paid-card">
                  <p>Paid</p>
                  <p className="this-month-rupee">₹ 0</p>
               </aside>
               <PlusIcon />
               <aside className="this-month-paid-card this-month-paid-card-unpaid">
                  <p>Unpaid</p>
                  <p className="this-month-rupee">₹ 0</p>
               </aside>
               <EqualIcon />
               <aside className="this-month-paid-card this-month-paid-card-total">
                  <p>Total</p>
                  <p className="this-month-rupee">₹ 0</p>
               </aside>
            </section>
         )}
         {ishowPayment && (
            <select name="this-month-select-payment">
               {(selectoptions || []).map((item, index) => (
                  <option key={index} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         )}
      </div>
   );
};

export default Thismonth;
