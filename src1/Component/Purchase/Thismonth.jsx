import React from "react";
import "./months.css";
import { ArrowDownIcon, EqualIcon, PlusIcon } from "../utils/reactIcons";

const Thismonth = ({
   isshowcards = true,
   ishowPayment = false,
   selectoptions,
}) => {
   return (
      <div className="this-month-container">
         <section className="this-month-top">
            <aside className="this-month-heading">
               <h3>This Month</h3>
               <ArrowDownIcon />
            </aside>
            <aside className="this-month-dates">
               <label htmlFor="#">Between</label>
               <input type="date" name="date" />
               <span>To</span>
               <input type="date" name="#" />
            </aside>
            <aside className="this-month-select">
               <select name="#">
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
         </section>
         {isshowcards && (
            <section className="this-month-card-section">
               <aside className="this-month-paid-card">
                  <p>Paid</p>
                  <p className="this-month-rupee">₹ 0.00</p>
               </aside>
               <PlusIcon />
               <aside className="this-month-paid-card this-month-paid-card-unpaid">
                  <p>Unpaid</p>
                  <p className="this-month-rupee">₹ 0.00</p>
               </aside>
               <EqualIcon />
               <aside className="this-month-paid-card this-month-paid-card-total">
                  <p>Total</p>
                  <p className="this-month-rupee">₹ 0.00</p>
               </aside>
            </section>
         )}
         {ishowPayment && selectoptions && (
            <select name="this-month-select-payment">
               {selectoptions &&
                  selectoptions.map((items) => {
                     {/* console.log(items) */}
                     (<option value={items}>{items}</option>);
                  })}
            </select>   
         )}
         {ishowPayment && !selectoptions && (
            <select name="this-month-select-payment">
               <option value="">Payment out</option>
               <option value="">Payment out</option>
               <option value="">Payment out</option>
               <option value="">Payment out</option>
            </select>
         )}
      </div>
   );
};

export default Thismonth;
