import React, { useEffect, useState } from "react";
import "./Transactions.css";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";
import party from "../../../assets/Images/party.jpg";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseBill } from "../../../Redux/purchase/action";
import axios from "axios";
import FirstTimeFormToggle from "../../FirstTimeFormToggle";

const transactionFilterItems = [
   {
      name: "DATE",
      Icon: <FilterIcon />,
      //   nestedItems
   },
];

const Transactions = ({ func }) => {
   const openForm = () => {
      func(true);
   };
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");
   const store = useSelector((store) => store.PurchaseReducer);
   const showAllPurchaseBills = store.purchaseBillData;
   console.log(store);
   const date = {
      startDate: "2023-01-20",
      endDate: "2025-02-24",
   };
   // console.log(store);
   useEffect(() => {
      dispatch(getPurchaseBill({ date }));
   }, []);
   // console.log(showAllPurchaseBills);
   return (
      <>
         {!store.isLoading && !showAllPurchaseBills.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => openForm()}
               BtnText="Add Your First Purchase Invoice"
               MiddleText="Make Purchase invoices & Print or share with your customers directly via WhatsApp or Email."
            />
         ) : (
            <div className="transactions-container">
               <div className="transactions-buttons">
                  <button onClick={() => openForm()}>
                     <span>+</span> Add Purchase
                  </button>
               </div>
               <section className="transaction-tables">
                  <div className="transaction-table">
                     <p>DATE</p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p>INVOICE NO.</p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p>PARTY NAME</p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p>PAYMENT TYPE</p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p>AMOUNT</p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p>BALANCE DUE</p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p>STATUS</p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p></p>
                     <FilterIcon />
                  </div>
                  <div className="transaction-table">
                     <p></p>
                     <FilterIcon />
                  </div>
               </section>

               {!store.isLoading && showAllPurchaseBills.length ? (
                  showAllPurchaseBills?.map((e) =>{

                  
                     console.log(e?.partyData)
                     return (

                   
                     <section className="transaction-tables">
                        <div className="transaction-table">
                           <p className="transaction-table ">
                              {" "}
                              {new Date(e.billDate).toLocaleDateString(
                                 "en-IN",
                                 {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                 }
                              )}
                           </p>
                        </div>
                        <div className="transaction-table">
                           <p className="transaction-table ">{e.invoice}</p>

                           {/* <p></p> */}
                        </div>
                        <div className="transaction-table">
                           <p className="transaction-table">
                           
                                 {e?.partyData?.partyName}
                           </p>
                        </div>
                        <div className="transaction-table">
                           <p className="transaction-table">Cash</p>
                        </div>
                        <div className="transaction-table">
                           <p className="transaction-table">0</p>
                        </div>
                        <div className="transaction-table">
                           <p className="transaction-table">0</p>
                        </div>
                        <div className="transaction-table">
                           <p className="transaction-table">{e.status}</p>
                        </div>
                        <div className="transaction-table">
                           <p>
                              <PrinterIcon /> <ShareIcon />
                           </p>
                           {/* <FilterIcon/> */}
                        </div>
                        <div className="transaction-table">
                           <p></p>
                           <DotsIcon />
                        </div>
                     </section>
                  )})
               ) : (
                  <BasicSpinner
                     style={{
                        width: "100%",
                        margin: "60px auto",
                        fontSize: "30px",
                     }}
                  />
               )}
            </div>
         )}{" "}
      </>
   );
};

export default Transactions;
