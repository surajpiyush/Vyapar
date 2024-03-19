import css from "../../../styles/SalesStyles/Estimate.module.css";
import party from "../../../assets/Images/party.jpg";
import EstimateForm from "./EstimateForm";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
   GetAllEstimates,
   deleteAllEstimates,
   updateAllEstimates,
} from "../../../Redux/sales/action";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import TableEstimates from "./TableEstimates";
import { useLocation, useNavigate } from "react-router-dom";
import Setting from "../../../Component/Setting/Setting";
import EditableRow from "../../../Component/EditForm";

export default function SalesEstimates() {
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const toast = useToast();
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const [openForm, setOpenForm] = useState(false);
   const [toggleSetting, setToggleSetting] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );
   const isLoading = useSelector((state) => state.SalesReducer.isLoading);
   const toggleEstimates = useSelector(
      (state) => state.SalesReducer.toggleEstimates
   );
   const estimatesList = useSelector(
      (state) => state.SalesReducer.estimatesList
   );

   useEffect(() => {
      GetAllEstimates(dispatch, startDate, endDate);
   }, [toggleEstimates, startDate, endDate]);

   const formOpen = () => {
      setOpenForm(true);
   };

   const handleDelete = (id) => {
      deleteAllEstimates(dispatch, id);
   };

   const handleEdit = (_id) => {
      const data = estimatesList.filter((e) => e._id == _id);
      // console.log(data);
      setIsEditing(true);
      if (data.length > 0) {
         setEditedData(data[0]);
      }
   };

   const handleSave = (updatedData) => {
      // updatedData.partyname = updatedData.partyName
      console.log("updatedData-", updatedData);
      const id = updatedData._id;

      dispatch(updateAllEstimates(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      GetAllEstimates(dispatch, startDate, endDate);
   };

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData({});
   };
   const display = [
      "invoiceDate",
      "refNo",
      "partyName",
      "amount",
      "balanceDue",
      "statuss",
   ];

   return (
      <div style={{ marginTop: "100px" }}>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         {/* Form */}
         {openForm && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Estimate #1</span>
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
                     <CloseIcon onClick={() => setOpenForm(false)} />
                  </div>
               </div>
               <EstimateForm
                  setToggleSetting={setToggleSetting}
                  setOpenForm={setOpenForm}
               />
            </div>
         )}

         <div className="grp-cont-invoice">
            <div className={css.TabelOuterDivSaleOrder}>
               <div className={css.dBetween} style={{ alignItems: "center" }}>
                  <div className={css.dFlex} style={{ gap: "10px" }}>
                     <div className={css.dFlex}>
                        <select name="" id="" className={css.invoiceSelect}>
                           <option value="">This Month</option>
                           <option value="">This Quarter</option>
                           <option value="">Last Month</option>
                           <option value="">This Year</option>
                           <option value="">Custom</option>
                        </select>
                     </div>
                     <div
                        className={css.dFlex}
                        style={{ border: "1px solid gray" }}
                     >
                        <div
                           style={{
                              padding: "3px 12px 2px 15px",
                              background: "gray",
                           }}
                        >
                           <p> Between</p>
                        </div>

                        <input
                           type="date"
                           value={startDate}
                           onChange={(e) => setStartDate(e.target.value)}
                           className={css.invoiceInput}
                        />
                        <div
                           style={{
                              padding: "3px 12px 2px 15px",
                           }}
                        >
                           <span>To</span>
                        </div>

                        <input
                           type="date"
                           value={endDate}
                           onChange={(e) => setEndDate(e.target.value)}
                           className="invoice-input"
                        />
                     </div>
                     <div className={css.dFlex}>
                        <select name="" id="" className={css.invoiceSelect}>
                           <option value="">All Firms</option>
                           <option value="">My Company</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="">
            <div className={css.TableOuter}>
               <div className={css.TabelOuterDivSaleOrder}>
               <div>
                  <div className={css.leftSideDivSaleOuter}>
                     <p
                        style={{
                           display: "block",
                           fontSize: "24px",
                           width: "70vw",
                           textAlign: "center",
                        }}
                     >
                        TRANSACTIONS
                     </p>
                     <div
                        style={{
                           display: "flex",
                           justifyContent: "space-between",
                        }}
                     >
                        <div className={css.saleOrderSearchDiv}>
                           <SearchIcon />
                           <div>
                              <input type="text" />
                           </div>
                        </div>
                        <div>
                           <button
                              type="button"
                              onClick={formOpen}
                              className={css.addSaleOrderBtn}
                           >
                              <PlusIcon /> Add Estimate
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
                  <table>
                     <thead>
                        <tr>
                           <th>
                              <div>
                                 DATE
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 REFERENCE NO
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 NAME
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 TOTAL AMOUNT
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 BALANCE
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 STATUS
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 ACTION
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th></th>
                        </tr>
                     </thead>

                     <tbody>
                        {!isLoading &&
                           estimatesList?.map((item, ind) =>
                              isEditing && editedData?._id == item._id ? (
                                 <tr
                                    style={{
                                       width: "82%",
                                       position: "absolute",
                                    }}
                                 >
                                    <EditableRow
                                       display={display}
                                       data={editedData}
                                       onSave={handleSave}
                                       onCancel={handleCancel}
                                    />
                                 </tr>
                              ) : (
                                 <TableEstimates
                                    {...item}
                                    ind={ind}
                                    key={ind + item?._id}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                 />
                              )
                           )}
                     </tbody>
                  </table>
                  {isLoading && (
                     <h2
                        style={{
                           color: "green",
                           textAlign: "center",
                           margin: "20px auto",
                        }}
                     >
                        Loading Estimates Data...
                     </h2>
                  )}
               </div>
            </div>
         </div>

         {estimatesList.length <= 0 && !isLoading && (
            <div style={{ marginTop: "-450px" }}>
               <FirstTimeFormToggle
                  img={party}
                  onClick={() => setOpenForm(true)}
                  BtnText="Add Your First Estimate"
                  MiddleText="Make Estimates/Quotations/Proforma Invoices and share with your parties by WhatsApp, Email or Printed copies."
                  BelowText="You can convert them to Sale invoices later by just click of a button"
               />
            </div>
         )}
      </div>
   );
}
