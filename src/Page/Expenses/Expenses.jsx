import css from "./Expenses.module.css"
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import party from "../../assets/Images/party.jpg";
import { CalculatorIcon, CloseIcon2, CrossIcon, SettingsIconOutline2 } from "../../assets/Icons/ReactIcons";
import AddExpenses from "./AddExpenses";

const Expenses = () => {
    const [openForm, setOpenForm] = useState(false);
    const toast = useToast();


   return (
      <div>
       {openForm && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Expense #1</span>
                        <CrossIcon />
                     </p>
                  </div>
                  <div>
                     <CalculatorIcon
                        onClick={() =>
                           toast({
                              title: "Feature currently in development",
                              status: "info",
                              position: "top",
                           })
                        }
                     />
                     <SettingsIconOutline2
                        // onClick={() => setToggleSetting(true)}
                     />
                     <CloseIcon2 onClick={() => setOpenForm(false)} />
                  </div>
               </div>
               <AddExpenses
                  setOpenForm={setOpenForm}
                  // date={{ startDate, endDate }}
               />
            </div>
         )}

         <FirstTimeFormToggle
            marginTop="10px"
            height="61.25vh"
            img={party}
               onClick={() => setOpenForm(true)}
            BtnText="Add Expenses"
            MiddleText="Add your 1st Expense 
               
               Record your business expenses & know your real profits
               "
         />
      </div>
   );
};

export default Expenses;
