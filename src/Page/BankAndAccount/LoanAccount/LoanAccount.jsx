import React from "react";
import bank from "../../../assets/Images/bank.jpg";
import css from "../../Parties/Parties.module.css";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";

const LoanAccount = () => {
   return (
      <div>
         <div className={css.navOuter}>
            <div className={css.navOptions}>Loan Account</div>
         </div>
         <div
            style={{
               background: "#b8cbdc",
               margin: "5px 20px 0px",
               padding: "20px",
               borderRadius: "15px",
            }}
         >
            <p>EXCLUSIVE ON </p>
            <h5>Business Loans up to 30 lakhs!</h5>
            <p>
               Now avail loans with completely digital process, no collateral
               and fast disbursal
            </p>
            <p>1L+ loan applications</p>
         </div>
         <div style={{ margin: "0px 20px" }}>
            <FirstTimeFormToggle
               marginTop="10px"
               height="73.25vh"
               BtnText="Add Your First Estimate"
               img={bank}
               MiddleText="Payment received through cheque for your invoices will be shown here."
            />
         </div>
      </div>
   );
};

export default LoanAccount;
