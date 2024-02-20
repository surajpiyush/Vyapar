import React, { useEffect, useState } from "react";
import "./Transactions.css";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseBill } from "../../../Redux/purchase/action";
import axios from "axios";

const transactionFilterItems = [
   {
      name: "DATE",
      Icon: <FilterIcon />,
      //   nestedItems
   },
];

const Transactions = () => {
   const transcationsItems = [
      {
         date: "11/01/2024",
         invoice: "hgtjj98j",
         partyName: "gg",
         paymentType: "cash",
         ampunt: "0",
         balance: "0",
      },
   ];

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [showAllPurchaseBills, setShowAllPurchaseBills] = useState([]);
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");
   // console.log(userId, token);

   const date = {
      startDate: "2023-01-20",
      endDate: "2024-02-24",
   };
   useEffect(() => {
      axios
         .get(
            `https://ca-backend-api.onrender.com/${companyID}/purchase/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,

            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((result) => {
            console.log(result);
            setShowAllPurchaseBills(result.data.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <>
         <div className="transactions-container">
            <div className="transactions-buttons">
               <button onClick={() => navigate("/addpurchase")}>
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
                  <p></p>
                  <FilterIcon />
               </div>
               <div className="transaction-table">
                  <p></p>
                  <FilterIcon />
               </div>
            </section>

            {showAllPurchaseBills.length ? (
               showAllPurchaseBills.map((e) => (
                  <section className="transaction-tables">
                     <div className="transaction-table">
                        <p className="transaction-table ">
                           {" "}
                           {new Date(e.billDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                           })}
                        </p>
                     </div>
                     <div className="transaction-table">
                        <p className="transaction-table ">{e.invoice}</p>

                        {/* <p></p> */}
                     </div>
                     <div className="transaction-table">
                        <p className="transaction-table">{e.partyName}</p>
                     </div>
                     <div className="transaction-table">
                        <p className="transaction-table">-</p>
                     </div>
                     <div className="transaction-table">
                        <p className="transaction-table">{e.amount}</p>
                     </div>
                     <div className="transaction-table">
                        <p className="transaction-table">{e.balance}</p>
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
               ))
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
      </>
   );
};

export default Transactions;
