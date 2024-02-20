import React, { useEffect, useState } from "react";
import {
   DotsIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";
import { useNavigate } from "react-router-dom";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import axios from "axios";

const Purchasereturn = () => {
   const navigate = useNavigate();
   const token = localStorage.getItem("token");
   const companyID = JSON.parse(localStorage.getItem("USER_DETAILS"))?._id;
   const baseURL = "https://ca-backend-api.onrender.com";
   const [data, setData] = useState([]);
   // console.log(userId["_id"])
   const date = { startDate: "2023-01-20", endDate: "2024-02-24" };

   useEffect(() => {
      axios
         .get(
            `${baseURL}/${companyID}/purchaseReturn/getAll?startDate=${date.startDate}&endDate=${date.endDate}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => setData(res.data.data))
         .catch((err) => {
            console.log(err.response.data.msg);
         });
      //  alert(err.response.data.msg)
   }, []);
   console.log(data);
   return (
      <div className="payment-out-container">
         <div className="transactions-buttons">
            <input type="text" />
            <button onClick={(e) => navigate("/addpurchasereturn")}>
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
                  {data.map((e, i) => (
                     <tr className="tabel-row tale-data">
                        <th className="table-h">
                           <div className="table-items">{i + 1}</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">
                              {new Date(e.billDate).toLocaleDateString(
                                 "en-IN",
                                 {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                 }
                              )}
                           </div>
                        </th>

                        <th className="table-h">
                           <div className="table-items">{e.returnNumber}</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">{e.partyName}</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">{e.categoryName}</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">-</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">
                              ₹{e.total ? e.total : e.balanceDue}
                           </div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">₹{e.balanceDue}</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">₹{e.amount}</div>
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
      </div>
   );
};

export default Purchasereturn;
