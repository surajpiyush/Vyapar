import React from "react";
import Pourchaseorder from "../../Component/Purchase/Pourchaseorder";
import "./purchaseorderpage.css";
import "./purchase-bill.css";
import css from "../../styles/SalesStyles/Invoice.module.css";

import { GetAllSalesInvoice } from "../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Addpurchaseorderitems from "../../Component/Purchase/Addpurchaseorderitems";
const Purchaseorderpage = ({func}) => {
  const toast = useToast();
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
  return (
    <div className="purchase-bill-container">
      <h4 className="purchase-order-h4">Orders</h4>
      <div>
            <div>
               {openForm ? (
                  <div className={css.formOuter}>
                     <div className={css.upperNav}>
                        <div>
                           <p className={css.activeForm}>
                              <span>Sale #1</span>
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
                              onClick={() =>
                                 toast({
                                    title: "Feature currently in development",
                                    status: "info",
                                    position: "top",
                                 })
                              }
                           />
                           <CloseIcon onClick={() => setOpenForm(false)} />
                        </div>
                     </div>
                     <Addpurchaseorderitems setOpenForm={setOpenForm} />
                  </div>
               ) : (
                  <div>{!isLoading && <Pourchaseorder func={formOpen} />}</div>
               )}
            </div>
         </div>
      
    </div>
  );
};

export default Purchaseorderpage;
