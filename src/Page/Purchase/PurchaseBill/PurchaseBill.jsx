//import "./PurchaseBill.css";
import css from "./PurchaseBill.module.css";
import Setting from "../../../Component/Setting/Setting";
import Thismonth from "../../../Component/Purchase/Thismonth";
import Transactions from "../../../Component/Purchase/Transactions/Transactions";
import AddPurchaseItem from "../../../Component/Purchase/Purchase/Addpurchaseitem";
import { GetAllPurchaseBill } from "../../../Redux/purchase/action";
import { GetAllSalesInvoice } from "../../../Redux/sales/action";
import { CloseIcon2 } from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import Loader3 from "../../../Component/Loaders/Loader3";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import EditPurchaseForm from "../../../Component/Purchase/EditPurchaseForm";

const PurchaseBill = () => {
   const [toggleSetting, setToggleSetting] = useState(false);
   const [isEditing, setIsEditing] = useState(false);

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
   const info = { paid: 0, unpaid: 0, total: 0 };
   const toggleSalesSuccess = useSelector(
      (state) => state.SalesReducer.toggleSalesSuccess
   );
   // Add Purchase Bill Toggle
   const toggleAddPurchaseBill = useSelector(
      (state) => state.PurchaseReducer.toggleAddPurchaseBill
   );
   // Get All Purchase Bill Loading
   const getAllPurchaseLoading = useSelector(
      (state) => state.PurchaseReducer.getAllPurchaseLoading
   );
   // Get All Purchase Bill Success Toggle
   const getAllPurchaseBillSuccess = useSelector(
      (state) => state.PurchaseReducer.getAllPurchaseBillSuccess
   );
   // Purchase Bill Data
   const PurchaseBillData = useSelector(
      (state) => state.PurchaseReducer.PurchaseBillData
   );
   const data = useSelector((store) => store.PurchaseReducer.singlePurchseData);
   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);
   // const isLoading = useSelector((state) => state.PurchaseReducer.isLoading);
   // const PurchaseBillData = useSelector(
   //   (store) => store.PurchaseReducer.purchaseBillData
   // );

   // To Calculate Paid/Unpaid amounts on getAll Success request
   useEffect(() => {
      let paid = 0;
      let unpaid = 0;
      PurchaseBillData?.forEach((item) => {
         paid += item?.amount || 0;
         unpaid += item?.balanceDue || 0;
      });
      setPaidAmount(paid);
      setUnpaidAmount(unpaid);
   }, [getAllPurchaseBillSuccess]);

   useEffect(() => {
      GetAllPurchaseBill(dispatch, startDate, endDate);
   }, [toggleAddPurchaseBill, startDate, endDate]);

   const formOpen = () => {
      setOpenForm(true);
   };

   return getAllPurchaseLoading ? (
      <Loader3 text="Loading Purchase Bill" />
   ) : (
      <div className={css.Outer}>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         {/* Add Purchase Bill Form */}
         {openForm && (
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
                     <SettingIcon onClick={() => setToggleSetting(true)} />
                     <CloseIcon2 onClick={() => setOpenForm(false)} />
                  </div>
               </div>

               <AddPurchaseItem
                  setOpenForm={setOpenForm}
                  date={{ startDate, endDate }}
               />
            </div>
         )}
         {isEditing && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Edit Purchase Bill </span>
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
                     <SettingIcon onClick={() => setToggleSetting(true)} />
                     <CloseIcon2 onClick={() => setIsEditing(false)} />
                  </div>
               </div>

               <EditPurchaseForm data = {data} />
            </div>
         )}
         {/* Top Nav */}
         <UpperControlPanel
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            showPaymentData={true}
            showPrintOptions={true}
            data={PurchaseBillData}
            paidAmount={paidAmount}
            unpaidAmount={unpaidAmount}
         />

         {/*  */}

         <div>
            <Transactions
               func={formOpen}
               date={{ startDate, endDate }}
               info={info}
               data={PurchaseBillData}
               isEditing={isEditing}
               setIsEditing={setIsEditing}
            />
         </div>
      </div>
   );
};

export default PurchaseBill;
