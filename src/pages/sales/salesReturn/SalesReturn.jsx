import css from "../../../styles/SalesStyles/CreditNotes.module.css";
import FormCreditNote from "./FormCreditNote";
import TableCreditNotes from "./TableCreditNotes";
import Setting from "../../../Component/Setting/Setting";
import {
   GetAllCreditNotes,
   deleteAllCreditNotes,
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
import { useLocation, useNavigate } from "react-router-dom";
import EditableRow from "../../../Component/EditForm";

export default function SalesReturn() {
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const toast = useToast();
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.SalesReducer.isLoading);
   const toggleCreditNote = useSelector(
      (state) => state.SalesReducer.toggleCreditNote
   );
   const creditNotesList = useSelector(
      (state) => state.SalesReducer.creditNotesList
   );

   const [openForm, setOpenForm] = useState(false);
   const [toggleSetting, setToggleSetting] = useState(false);
   const [startDate, setStartDate] = useState("2024-02-01");
   const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
   );

   useEffect(() => {
      GetAllCreditNotes(dispatch, startDate, endDate);
   }, [toggleCreditNote, startDate, endDate]);

   const formOpen = () => {
      setOpenForm(true);
   };

   const handleDelete = (id) => {
      deleteAllCreditNotes(dispatch, id);
   };

   const handleEdit = (_id) => {
      const data = creditNotesList.filter((e) => e._id === _id);
      console.log(data);
      setIsEditing(true);
      setEditedData(data[0]);
   };

   const handleSave = (updatedData) => {
      // Implement your logic to save the updated data to the backend
      // You may use an API call or any other method here
      console.log("updatedData-", updatedData);
      const id = updatedData._id;
      // After saving, reset the state
      // dispatch(updatePurchaseBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      GetAllCreditNotes(dispatch, startDate, endDate);
   };

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData(null);
   };
   const display = [
      "invoiceDate",
      "invoiceNumber",
      "partyName",
      "transactionType",
      "paymentType",
      "amount",
      "balanceDue",
      "duedate",
      "status",
      "hariom",
   ];

   return (
      <div style={{ marginTop: "100px" }}>
         {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

         {openForm && (
            <div className={css.formOuter}>
               <div className={css.upperNav}>
                  <div>
                     <p className={css.activeForm}>
                        <span>Credit Note #1</span>
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
               <FormCreditNote
                  setToggleSetting={setToggleSetting}
                  setOpenForm={setOpenForm}
               />
            </div>
         )}

         {/* Top Nav */}
         <div className="grp-cont-invoice">
            <div className={css.TableOuter} >
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
                              padding: "4px 12px 2px 15px",
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
                              padding: "4px 12px 2px 15px",
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
                  <div
                     className={css.dFlex}
                     style={{ gap: "20px", paddingRight: "25px" }}
                  >
                     <div>
                        <div
                           onClick={() =>
                              toast({
                                 title: "Feature currently in development",
                                 status: "info",
                                 position: "top",
                              })
                           }
                        >
                           <i
                              className="fa fa-bar-chart"
                              aria-hidden="true"
                           ></i>
                        </div>
                        <div>
                           <span>Graph</span>
                        </div>
                     </div>
                     <div className="d-flex-col">
                        <div
                           onClick={() =>
                              toast({
                                 title: "Feature currently in development",
                                 status: "info",
                                 position: "top",
                              })
                           }
                        >
                           <div>
                           <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                           </div>
                           <div>
                              <span>Excel Report</span>
                           </div>
                        </div>
                     </div>
                     <div className="d-flex-col">
                        <div
                           onClick={() =>
                              toast({
                                 title: "Feature currently in development",
                                 status: "info",
                                 position: "top",
                              })
                           }
                        >
                           <div>
                              <i className="fa fa-print" aria-hidden="true"></i>
                           </div>
                           <div>
                              <span>Print</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* <div
                  className="d-flex"
                  style={{ gap: "20px", marginTop: "20px" }}
               >
                  <div className="" style={{ marginLeft: "10px" }}>
                     <select name="" id="" className="invoice-select2">
                        <option value="">Payment In</option>
                        <option value="">All Transactions</option>
                        <option value="">Sale</option>
                        <option value="">Purchase</option>
                     </select>
                  </div>
               </div> */}
            </div>
         </div>

         {/* Data Part */}
         <div className="d-cen b-cont text-center text-center">
            <div className={css.TableOuter}>
               <div>
                  <div
                     className={css.leftSideDivSaleOuter}
                     style={{ padding: "25px 5px" }}
                  >
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
                        <button
                           type="button"
                           onClick={formOpen}
                           className={css.addSaleOrderBtn}
                        >
                           <PlusIcon /> Add Credit Note
                        </button>
                     </div>
                  </div>
               </div>
               <div className={css.TabelOuterDivSaleOrder}>
                  <table>
                     <thead>
                        <tr>
                           <th>
                              <div>#</div>
                           </th>
                           <th>
                              <div>
                                 DATE
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 REF NO.
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 PARTY NAME
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           {/* <th>
                    <div>
                      CATEGORY NAME
                       <FilterIcon />
                    </div>
                  </th> */}
                           <th>
                              <div>
                                 TYPE
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 TOTAL
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th>
                              <div>
                                 RECEIVED/PAID
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
                                 PRINT/SHARE
                                 {/*  <FilterIcon /> */}
                              </div>
                           </th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {!isLoading &&
                           creditNotesList?.map((item, ind) =>
                              isEditing && editedData?._id === item._id ? (
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
                                 <TableCreditNotes
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
                        Loading Credit Notes Data...
                     </h2>
                  )}
                  {!isLoading && creditNotesList?.length <= 0 && (
                     <h2
                        style={{
                           textAlign: "center",
                           margin: "20px auto",
                           color: "red",
                        }}
                     >
                        No Credit Notes data available for the specified dates
                     </h2>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
