import "./purchaseorder.css";
import party from "../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../FirmTimeForm/FirstTimeFormToggle";
import {
   deletePurchaseOrderBill,
   getPurchaseOrder,
   updatePurchaseOrderBill,
} from "../../Redux/purchase/action";
import {
   DeleteIcon,
   DotsIcon,
   EditIcon,
   FilterIcon,
} from "../utils/reactIcons";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import EditableRow from "../EditForm";

const Pourchaseorder = ({ func }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const store = useSelector((store) => store.PurchaseReducer);
   const date = { startDate: "2023-01-20", endDate: "2025-02-24" };
   const dispatch = useDispatch();
   const data = store.purchaseOrderData;
   // console.log(store);
   useEffect(() => {
      dispatch(getPurchaseOrder({ date }));
   }, [dispatch]);
   const openForm = () => {
      func(true);
   };
   // console.log(data);

   // delete
   const handleDelete = (id) => {
      dispatch(deletePurchaseOrderBill(id));
   };

   const handleEdit = (data) => {
      setIsEditing(true);
      setEditedData(data);
   };

   const handleSave = (updatedData) => {
      // Implement your logic to save the updated data to the backend
      // You may use an API call or any other method here
      console.log("updatedData-", updatedData);
      const id = updatedData._id;
      // After saving, reset the state
      dispatch(updatePurchaseOrderBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      dispatch(getPurchaseOrder({ date }));
   }; 

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData(null);
   };
   const display = [
      "partyName",
      "orderNumber",
      "date",
      "dueDate",
      "total",
      "balance",
      "type",
   ];
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
                  <button
                     onClick={() => {
                        openForm();
                     }}
                  >
                     <span>+</span> Add Purchase order
                  </button>
               </div>

               <table className="table">
                  <thead className="table-head">
                     <tr className="tabel-row">
                        <th className="table-h">
                           <div className="table-items">Date</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">No.</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Party</div>
                           <div></div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Due Date</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Type</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Total Amount</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Balance</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Status</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items">Action</div>

                           {/*  <FilterIcon /> */}
                        </th>
                        <th className="table-h">
                           <div className="table-items"></div>

                           {/*  <FilterIcon /> */}
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
                        {data?.map((e, i) => {
                           return (
                              <React.Fragment key={e._id}>
                                 {isEditing && editedData?._id === e._id ? (
                                    <EditableRow
                                       display={display}
                                       data={editedData}
                                       onSave={handleSave}
                                       onCancel={handleCancel}
                                    />
                                 ) : (
                                    <tr className="tabel-row tale-data purchase-order">
                                       <th className="table-h">
                                          <div className="table-items">
                                             {new Date(
                                                e.date
                                             ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                             })}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e.orderNumber}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             {e?.partyName}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          {new Date(
                                             e.dueDate
                                          ).toLocaleDateString("en-IN", {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          })}{" "}
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
                                          <div className=" table-items">
                                             {e.type}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.total}
                                          </div>
                                       </th>
                                       <th className="table-h">
                                          <div className="table-items">
                                             ₹{e.balance}
                                          </div>
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
                                       </th>
                                       <th className="table-h">
                                          <div
                                             className="transaction-table"
                                             style={{
                                                display: "flex",
                                                direction: "row",
                                                justifyContent: "space-evenly",
                                             }}
                                          >
                                             <p
                                                style={{
                                                   fontSize: "1.5rem",
                                                   textAlign: "center",

                                                   justifyContent:
                                                      "space-around",
                                                }}
                                             >
                                                <DeleteIcon
                                                   onClick={() =>
                                                      handleDelete(e._id)
                                                   }
                                                />
                                             </p>
                                             <p style={{ fontSize: "1.5rem" }}>
                                                <EditIcon
                                                   onClick={() => handleEdit(e)}
                                                />
                                             </p>
                                          </div>
                                       </th>
                                    </tr>
                                 )}
                              </React.Fragment>
                           );
                        })}
                     </tbody>
                  )}
               </table>
            </div>
         )}
      </>
   );
};

export default Pourchaseorder;
