import css from "./PurchaseBill.module.css";
import Setting from "../../../Component/Setting/Setting";
import party from "../../../assets/Images/party.jpg";
import Loader3 from "../../../Component/Loaders/Loader3";
import AddPurchaseBill from "./AddPurchaseBill";
import EditPurchaseForm from "../../../Component/Purchase/EditPurchaseForm";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
   GetAllPurchaseBill,
   GetSinglePurchaseBillData,
   deletePurchaseBill,
   updatePurchaseBill,
} from "../../../Redux/purchase/action";
import {
   CloseIcon2,
   DeleteIcon2,
   EditIcon,
   PlusIcon2,
   SearchIcon,
   CalculatorIcon,
   SettingsIconOutline2,
   CrossIcon,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PurchaseBill = () => {
   const toast = useToast();
   const dispatch = useDispatch();
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const [toggleSetting, setToggleSetting] = useState(false);
   const [openForm, setOpenForm] = useState(false);
   const currentDate = new Date();
   const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
   );
   const formattedStartDate = startOfMonth.toISOString().split("T")[0];
   const [startDate, setStartDate] = useState(formattedStartDate);
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
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
   const singlePurchaseBillData = useSelector(
      (store) => store.PurchaseReducer.singlePurchseData
   );
   const [paidAmount, setPaidAmount] = useState(0);
   const [unpaidAmount, setUnpaidAmount] = useState(0);

   // To Calculate Paid/Unpaid amounts on getAll Success request
   useEffect(() => {
      let paid = 0;
      let unpaid = 0;
      PurchaseBillData?.forEach((item) => {
         paid += item?.amount - item?.balanceDue || 0;
         unpaid += item?.balanceDue || 0;
      });
      setPaidAmount(paid);
      setUnpaidAmount(unpaid);
   }, [getAllPurchaseBillSuccess]);

// console.log(PurchaseBillData)
   // To Get All Purchase Bill Data
   useEffect(() => {
      GetAllPurchaseBill(dispatch, startDate, endDate);
   }, [toggleAddPurchaseBill, startDate, endDate]);

   const handleEdit = (id) => {
      GetSinglePurchaseBillData(dispatch, id, toast, setIsEditing);
   };
   // console.log("Single data invposea;-",data)

   const handleSubmit = (updatedData) => {
      console.log("updatedData", updatedData);

      // dispatch(
      //    UPDATE_PURCHASEBILL_SUCCESS(updatedData._id, updatedData, () =>
      //       GetAllPurchaseBill(dispatch, startDate, endDate)
      //    )
      // );
      // setIsEditing(false);
      // setEditedData(null);
   };

   // Handle Delete
   const handleDelete = (id) => {
      dispatch(
         deletePurchaseBill(id, toast, () =>
            GetAllPurchaseBill(dispatch, startDate, endDate)
         )
      );
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
                     <SettingsIconOutline2
                        onClick={() => setToggleSetting(true)}
                     />
                     <CloseIcon2 onClick={() => setOpenForm(false)} />
                  </div>
               </div>
               <AddPurchaseBill
                  setOpenForm={setOpenForm}
                  // date={{ startDate, endDate }}
               />
            </div>
         )}

         {isEditing && (
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
                     <SettingsIconOutline2
                        onClick={() => setToggleSetting(true)}
                     />
                     <CloseIcon2 onClick={() => setIsEditing(false)} />
                  </div>
               </div>
               <EditPurchaseForm data={singlePurchaseBillData} />
            </div>
         )}

         {/* Top Nav */}
         <UpperControlPanel
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            showPaymentData={true}
            showPrintOptions={false}
            data={PurchaseBillData}
            paidAmount={paidAmount}
            unpaidAmount={unpaidAmount}
         />

         {/* Middle */}
         {PurchaseBillData?.length > 0 ? (
            <div className={css.ContentOuter}>
               <div className={css.contentUpperNav}>
                  <div className={css.leftSideDivSaleOuter}>
                     <p>TRANSACTIONS</p>
                     <div className={css.saleOrderSearchDiv}>
                        <SearchIcon />
                        <div>
                           <input type="text" />
                        </div>
                     </div>
                  </div>
                  <div>
                     <button
                        type="button"
                        onClick={() => setOpenForm(true)}
                        className={css.addBtnCss}
                     >
                        <PlusIcon2 /> Add Purchase
                     </button>
                  </div>
               </div>

               <div className={css.contentTableOuterDiv}>
                  <table>
                     <thead>
                        <tr>
                           {[
                              "DATE",
                              "INVOICE NO.",
                              "PARTY NAME",
                              "PAYMENT TYPE",
                              "AMOUNT",
                              "BALANCE DUE",
                              "STATUS",
                              "ACTION",
                           ].map((item, ind) => (
                              <th key={item + ind}>
                                 <div>{item}</div>
                              </th>
                           ))}
                        </tr>
                     </thead>

                     <tbody>
                        {!getAllPurchaseLoading &&
                           PurchaseBillData?.map((item, ind) => (
                              <tr key={item?._id + ind}>
                                 <td>
                                    {new Date(
                                       item?.billDate
                                    ).toLocaleDateString("en-IN", {
                                       day: "2-digit",
                                       month: "2-digit",
                                       year: "numeric",
                                    })}
                                 </td>
                                 <td>{item?.billNumber}</td>
                                 <td>{item?.partyName}</td>
                                 <td>{item?.paymentType[0]?.types}</td>
                                 <td style={{ textAlign: "right" }}>
                                    ₹{item?.amount}
                                 </td>
                                 <td style={{ textAlign: "right" }}>
                                    ₹
                                    {item?.status === "Paid"
                                       ? 0
                                       : item?.balanceDue}
                                 </td>
                                 <td>{item?.status}</td>
                                 <td>
                                    <div className={css.actionDivContent}>
                                       <button
                                          onClick={() =>
                                             handleDelete(item?._id)
                                          }
                                       >
                                          <DeleteIcon2 />
                                       </button>
                                       <button
                                          onClick={() => handleEdit(item?._id)}
                                       >
                                          <EditIcon />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
               </div>
            </div>
         ) : (
            <FirstTimeFormToggle
               marginTop="10px"
               height="61.25vh"
               img={party}
               onClick={() => setOpenForm(true)}
               BtnText="Add Your First Purchase Bill"
               MiddleText="Make Purchase Bills & share with your customers directly via WhatsApp or Email."
            />
         )}
      </div>
   );
};

export default PurchaseBill;
