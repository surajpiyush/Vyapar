import React, { useEffect, useState } from "react";
import "./Transactions.css";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseBill } from "../../../Redux/purchase/action";

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
            {/* {transactionFilterItems?Map((data)=>)} */}
            {transcationsItems.map((e)=>{
               {/* console.log(e) */}

            return(<section className="transaction-tables">
              
               <div className="transaction-table">
                  <input className="transaction-table " type="text" value={e.date} />
               </div>
               <div className="transaction-table">
               <input className="transaction-table " type="text" value={e.invoice} />
                  {/* <p></p> */}
               </div>
               <div className="transaction-table">
               <input className="transaction-table" type="text" value={e.partyName} />

               </div>
               <div className="transaction-table">
               <input className="transaction-table" type="text" value={e.paymentType} />
               </div>
               <div className="transaction-table">
               <input className="transaction-table" type="text" value={e.ampunt} />
               </div>
               <div className="transaction-table">
               <input className="transaction-table" type="text" value={e.balance} />
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
           ) })}
         </div>
      </>
   );
};

export default Transactions;
