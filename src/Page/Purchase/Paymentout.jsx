import React from "react";
import Thismonth from "../../Component/Purchase/Thismonth";
import Paymentouts from "../../Component/Purchase/paymentouts/Paymentouts";
import "./purchase-bill.css";
import AddPurchaseItem from "../../Component/Purchase/Purchase/Addpurchaseitem";
import css from "../../styles/SalesStyles/Invoice.module.css";
import AddPaymentouts from "../../Component/Purchase/paymentouts/AddPaymentouts";
import { GetAllSalesInvoice } from "../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Setting from "../../Component/Setting/Setting";
const Paymentout = () => {
   const [toggleSetting, setToggleSetting] = useState(false);
   const toast = useToast();
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const [openForm, setOpenForm] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   const toggleSalesSuccess = useSelector(
      (state) => state.SalesReducer.toggleSalesSuccess
   );
   const isLoading = useSelector((state) => state.SalesReducer.isLoading);

   useEffect(() => {
      GetAllSalesInvoice(dispatch, startDate, endDate);
   }, [toggleSalesSuccess, startDate, endDate]);

   const formOpen = () => {
      setOpenForm(true);
   };
   const date = { startDate: startDate, endDate: endDate };

   return (
      <div className="purchase-bill-container">
         <Thismonth
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
         />
         <div>
            {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

            <div>
               {openForm ? (
                  <div className={css.formOuter}>
                     <div className={css.upperNav}>
                        <div>
                           <p className={css.activeForm}>
                              <span>Purchase #1</span>
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
                           <SettingIcon
                              onClick={() => setToggleSetting(true)}
                           />

                           <CloseIcon onClick={() => setOpenForm(false)} />
                        </div>
                     </div>
                     <AddPaymentouts setOpenForm={setOpenForm} />
                  </div>
               ) : (
                  <div>
                     {!isLoading && <Paymentouts func={formOpen} date={date} />}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Paymentout;
