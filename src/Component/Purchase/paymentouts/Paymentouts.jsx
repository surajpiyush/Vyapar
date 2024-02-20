import React, { useEffect, useState } from "react";
import "./Paymentouts.css";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";      

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Paymentouts = () => {
   const dispatch = useDispatch();
   const [data, setData] = useState([]);
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const token = localStorage.getItem("token");

   const date = {
      startDate: "2023-01-20",
      endDate: "2024-02-24",
   };
   const postData = {
      type: "Purchase-Out",
      status: "Pending",
      partyName: "Bhuvensh",
      receiptNumber: "RO123",
      date: "2024-02-16T00:00:00.000Z",
      time: "10:00 AM",
      description: "Purchase return of items",
      paymentType: [
         {
            cash: 0,
            cheque: {
               refreanceNo: "REF123",
               checkAmount: 150,
            },
            bankDetail: {
               accountName: "ABC Bank",
               openingBalance: 5000,
               asOfDate: "2024-02-16T00:00:00.000Z",
            },
            default: "cheque",
         },
      ],
      paid: 0,
      discount: 0,
      total: 0,
   };

   useEffect(() => {
      axios
         .get(
            `https://ca-backend-api.onrender.com/${companyID}/purchaseOut/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => setData(res.data.data))
         .catch((err) => console.log(err));
   }, []);
   console.log(data);
   return (
      <>
         <div className="payment-out-container">
            <div className="transactions-buttons">
               {/* <input type="text" /> */}
               <button onClick={() => alert("UI is under work")}>
                  <span>+</span> Add Payment-out
               </button>
            </div>

            <table className="table">
               <thead className="table-head">
                  <tr className="tabel-row">
                     <th className="table-h">
                        <div className="table-items">#</div>
                        <div></div>
                     </th>
                     <th className="table-h">
                        <div className="table-items">Date</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">Ref No.</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">PartyName</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">CategoryName</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">Type</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">Total</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">Recevied</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">Balance</div>
                        <FilterIcon />
                     </th>
                     <th className="table-h">
                        <div className="table-items">Print</div>
                        <FilterIcon />
                     </th>
                  </tr>
               </thead>
               {!data.length ? (
                  <BasicSpinner
                     style={{
                        width: "100%",
                        margin: "60px auto",
                        fontSize: "30px",
                     }}
                  />
               ) : (
                  <tbody>
                     {data?.map((e, i) => (
                        <tr className="tabel-row tale-data">
                           <th className="table-h">
                              <div className="table-items">{i + 1}</div>
                              <div></div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">
                                 {new Date(e.date).toLocaleDateString()}
                              </div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">{e.refNo}</div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">{e.partyName}</div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">
                                 {e.categotyName ? e.categotyName : "-"}
                              </div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">{e.type}</div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">₹{e.total}</div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">₹{e.paid}</div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">₹{e.balance}</div>
                           </th>
                           <th className="table-h">
                              <div className="table-items">
                                 <PrinterIcon onClick={() => window.print()} />
                                 <ShareIcon />
                                 <DotsIcon />
                              </div>
                           </th>
                        </tr>
                     ))}
                  </tbody>
               )}
            </table>
            <div className="payment-outs-footer">
               <p>
                  Total Amount: <span>₹ 0.00</span>
               </p>
               <p>Balance: ₹0.00</p>
            </div>
         </div>
      </>
   );
};

export default Paymentouts;
