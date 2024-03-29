import "./purchase-bill.css";
import css from "../../pages/sales/salesInvoice/Invoice.module.css";
import Thismonth from "../../Component/Purchase/Thismonth";
import Transactions from "../../Component/Purchase/Transactions/Transactions";
import AddPurchaseItem from "../../Component/Purchase/Purchase/Addpurchaseitem";
import { GetAllSalesInvoice } from "../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import Setting from "../../Component/Setting/Setting";
import { getPurchaseBill } from "../../Redux/purchase/action";

const Purchasebill = () => {
   const [toggleSetting, setToggleSetting] = useState(false);
   const toast = useToast();
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [openForm, setOpenForm] = useState(false);
   const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   const date = { startDate: startDate, endDate: endDate };
   const info = { paid: 0, unpaid: 0, total: 0 };
   const toggleSalesSuccess = useSelector(
      (state) => state.SalesReducer.toggleSalesSuccess
   );
   const isLoading = useSelector((state) => state.PurchaseReducer.isLoading);
   const AllPurchaseBills = useSelector(
      (store) => store.PurchaseReducer.purchaseBillData
   );
   useEffect(() => {
      // GetAllSalesInvoice(dispatch, startDate, endDate);
      dispatch(getPurchaseBill({ date }));
   }, [dispatch,startDate,endDate,openForm]);

   const formOpen = () => {
      setOpenForm(true);
   };
  
   return (
      <div className="purchase-bill-container">
         <Thismonth
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            info={info}
            data={AllPurchaseBills}
         />
         <div>
            {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

            <div>
               {openForm ? (
                  <div className={css.formOuter}>
                     <div className={css.upperNav}>
                        <div>
                           <p className={css.activeForm}>
                              <span>Purchase Bill #1</span>
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
                     <AddPurchaseItem setOpenForm={setOpenForm} date={date} />
                  </div>
               ) : (
                  <div>
                     {!isLoading && (
                        <Transactions func={formOpen} date={date} info={info} data={AllPurchaseBills} />
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Purchasebill;
