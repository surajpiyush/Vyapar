import css from "./Expenses.module.css";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import Setting from "../../Component/Setting/Setting";
import Loader3 from "../../Component/Loaders/Loader3";
import CategoryTable from "../../components/TableData/PartiesTable";
import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import party from "../../assets/Images/party.jpg";
import {
   CalculatorIcon,
   CloseIcon2,
   CrossIcon,
   SettingsIconOutline2,
} from "../../assets/Icons/ReactIcons";
import AddExpenses from "./AddExpenses";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExpensesTable from "../../components/TableData/ExpensesCategoryTable";
import ExpensesItemTable from "../../components/TableData/ExpenseItemTable";

const Expenses = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [openForm, setOpenForm] = useState(false);
   const toast = useToast();
   const [currPage, setCurrPage] = useState(
      searchParams.get("true") || "CATEGORY"
   );

   const isLoading = useSelector((state) => state.ExpenseReducer.isLoading);
   const expenseData = useSelector((state) => state.ExpenseReducer.expenseData);

   console.log(isLoading);

   const dataFromChild = (val) => {
      setOpenForm(val);
   };

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
         {/* Toggle Current Item Page */}
         <div className={css.navOuter}>
            <div
               className={css.navOptions}
               onClick={() => {
                  setCurrPage("CATEGORY");
               }}
               style={{
                  borderColor:
                     currPage == "CATEGORY" ? "var(--blueB)" : "transparent",
                  color:
                     currPage == "CATEGORY"
                        ? "var(--DeepBluishGrey)"
                        : "var(--greyG)",
               }}
            >
               CATEGORY
            </div>
            <div
               className={css.navOptions}
               onClick={() => {
                  setCurrPage("ITEM");
               }}
               style={{
                  borderColor:
                     currPage == "ITEM" ? "var(--blueB)" : "transparent",
                  color:
                     currPage == "ITEM"
                        ? "var(--DeepBluishGrey)"
                        : "var(--greyG)",
               }}
            >
               ITEM
            </div>
         </div>

         {currPage == "CATEGORY" ? (
            // Category
            <div className={css.Outer}>
               {isLoading ? (
                  <Loader3 text="Loading Products" />
               ) : expenseData.length > 0 ? (
                  <ExpensesTable func={dataFromChild} />
               ) : (
                  <FirstTimeFormToggle
                     height="100%"
                     img={party}
                     onClick={() => setOpenForm(true)}
                     BtnText="Add Expenses "
                     MiddleText="Add your 1st Expense 
               
               Record your business expenses & know your real profits
               "
                  />
               )}
            </div>
         ) : (
            // CATEGORY
            <div className={css.Outer}>
               {isLoading ? (
                  <Loader3 text="Loading Categories" />
               ) : !expenseData.length > 0 ? (
                  <ExpensesItemTable func={dataFromChild} />
               ) : (
                  <FirstTimeFormToggle
                     height="100%"
                     img={party}
                     onClick={() => setOpenForm(true)}
                     BtnText="Add Expenses foro item"
                     MiddleText="Add your 1st Expense 
               
               Record your business expenses & know your real profits
               "
                  />
               )}
            </div>
         )}
      </div>
   );
};

export default Expenses;
