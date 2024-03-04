import React, { useEffect, useState } from "react";
import "./purchaseorder.css";
import {
   DotsIcon,
   FilterIcon,
   
} from "../utils/reactIcons";
import { useNavigate } from "react-router-dom";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseOrder } from "../../Redux/purchase/action";
import FirstTimeFormToggle from "../FirstTimeFormToggle";
import party from "../../assets/Images/party.jpg";

const Pourchaseorder = ({func}) => {
   const navigate = useNavigate();  
   const store = useSelector((store) => store.PurchaseReducer);

   const date = { startDate: "2023-01-20", endDate: "2025-02-24" };
   const dispatch = useDispatch();
   const data = store.purchaseOrderData;
   // console.log(store);
   useEffect(() => {
      dispatch(getPurchaseOrder({ date }));
   }, []);
   const openForm = () => {
      func(true);
   };
   // console.log(data);
   return (
      <>
         {!store.isLoading && !data.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => {
                     openForm();
                  }}
               BtnText="Add Your First Purchase Order"
               MiddleText="Make & share purchase orders with your parties & convert them to purchase bill instantly."
            />
         ) : (
            <div className="payment-out-container">
               <h4>Transactions</h4>
               <div className="transactions-buttons">
                  <input type="text" />
                  <button onClick={() => {
                     openForm();
                  }}>
                     <span>+</span> Add Purchase order
                  </button>
               </div>

               <table className="table">
                  <thead className="table-head">
                     <tr className="tabel-row">
                        <th className="table-h">
                           <div className="table-items">Party</div>
                           <div></div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">No.</div>
                           <FilterIcon />
                        </th>
                        <th className="table-h">
                           <div className="table-items">Date</div>
                           <FilterIcon />
                        </th>
                        <th className="table-h">
                           <div className="table-items">Due Date</div>
                           <FilterIcon />
                        </th>
                        <th className="table-h">
                           <div className="table-items">Total Amount</div>
                           <FilterIcon />
                        </th>
                        <th className="table-h">
                           <div className="table-items">Balance</div>
                           <FilterIcon />
                        </th>
                        <th className="table-h">
                           <div className="table-items">Type</div>
                           <FilterIcon />
                        </th>
                        <th className="table-h">
                           <div className="table-items">Status</div>
                           <FilterIcon />
                        </th>
                        <th className="table-h">
                           <div className="table-items">Action</div>
                           <FilterIcon />
                        </th>
                     </tr>
                  </thead>
                  {store.isLoading ? (
                     <BasicSpinner
                        style={{
                           width: "100%",
                           margin: "60px auto",
                           fontSize: "30px",
                        }}
                     />
                  ) : (
                     <tbody>
                        {data?.map((e) => (
                           <tr className="tabel-row tale-data purchase-order">
                              <th className="table-h">
                                 <div className="table-items">
                                 {e?.partyData?.partyName}
                                 </div>
                              </th>
                              <th className="table-h">
                                 <div className="table-items">
                                    {e.orderNumber}
                                 </div>
                              </th>
                              <th className="table-h">
                                 <div className="table-items">
                                    {new Date(e.date).toLocaleDateString(
                                       undefined
                                    )}
                                 </div>
                              </th>
                              <th className="table-h">
                                 {new Date(e.dueDate).toLocaleDateString(
                                    undefined
                                 )}{" "}
                              </th>
                              {/* <div className="table-items">
                                    {new Date(e.billDate).toLocaleDateString(
                                       "en-IN",
                                       {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric",
                                       }
                                    )}
                                 </div> */}

                              <th className="table-h">
                                 <div className="table-items">₹{e.total}</div>
                              </th>
                              <th className="table-h">
                                 <div className="table-items">₹{e.balance}</div>
                              </th>
                              <th className="table-h">
                                 <div className=" table-items">{e.type}</div>
                              </th>

                              <th className="table-h">
                                 <div className="table-items-purcahse-order">
                                    {e.status}
                                 </div>
                              </th>
                              <th className="table-h">
                                 <div className="table-items table-items-purcahse-convert">
                                    {e.action}
                                 </div>
                                 
                                 <DotsIcon />
                              </th>
                           </tr>
                        ))}
                     </tbody>
                  )}
               </table>
            </div>
         )}
      </>
   );
};

export default Pourchaseorder;
