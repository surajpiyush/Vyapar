import React from "react";
import cheques from "../../../assets/Images/cheques.jpg";
import css from "../../Parties/Parties.module.css";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";

const Cheques = () => {
   return (
      <div>
         <div className={css.navOuter}>
            <div className={css.navOptions}>CHEQUE DETAILS</div>
         </div>

         <FirstTimeFormToggle
            marginTop="10px"
            height="73.25vh"
            img={cheques}
            MiddleText="Payment received through cheque for your invoices will be shown here."
         />
      </div>
   );
};

export default Cheques;
