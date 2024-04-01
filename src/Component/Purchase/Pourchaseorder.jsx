import "./purchaseorder.css";
import party from "../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../FirmTimeForm/FirstTimeFormToggle";
import {
   deletePurchaseOrderBill,
   getPurchaseOrder,
   updatePurchaseOrderBill,
} from "../../Redux/purchase/action";
import { DeleteIcon, EditIcon } from "../utils/reactIcons";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import EditableRow from "../EditForm";
import { useToast } from "@chakra-ui/react";

const Pourchaseorder = ({ func }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const store = useSelector((store) => store.PurchaseReducer);
   const date = { startDate: "2023-01-20", endDate: "2025-02-24" };
   const dispatch = useDispatch();
   const toast = useToast();
   const data = store.purchaseOrderData;
   // console.log(store);
   useEffect(() => {
      dispatch(getPurchaseOrder({ date }));
   }, [dispatch, func]);
   const openForm = () => {
      func(true);
   };
   console.log(data);

   // delete
   const handleDelete = (id) => {
      dispatch(deletePurchaseOrderBill(id, toast));
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
      "#",
      "partyName",
      "orderNumber",
      "date",
      "dueDate",
      "total",
      "balance",
      "type",
      "status",
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
               <div className="transactions-buttons">
                  {/* <input type="text" /> */}
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
                     <tr className="table-row">
                        <th className="table-h">
                           <div className="table-items">#</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Date</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">No.</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">PartyName</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Due Date</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Type</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Total Amount</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Balance</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Status</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Action</div>
                        </th>
                      
                     </tr>
                  </thead>
                  {!store.isLoading ? (
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
                                    <tr className="table-row" key={e._id}>
                                       <td className="table-h">{i + 1}</td>
                                       <td className="table-h">
                                          {new Date(e.date).toLocaleDateString(
                                             "en-IN",
                                             {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                             }
                                          )}
                                       </td>
                                       <td className="table-h">
                                          {" "}
                                          {e.orderNumber || "-"}
                                       </td>
                                       <td className="table-h">
                                          {e.partyName}
                                       </td>
                                       <td className="table-h">
                                          {new Date(
                                             e.dueDate
                                          ).toLocaleDateString("en-IN", {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          })}
                                       </td>
                                       <td className="table-h">{e.type}</td>
                                       <td className="table-h">
                                          {" "}
                                          ₹{e.total || 0}
                                       </td>
                                       <td className="table-h">
                                          {" "}
                                          ₹{e.balance || 0}
                                       </td>
                                       <td className="table-h">{e.status}</td>
                                       <td className="table-h ">
                                          <p className="table-items table-items-purcahse-convert">
                                             {e.action}
                                          </p>
                                       </td>
                                       <td className="table-h">
                                          <DeleteIcon
                                             onClick={() => handleDelete(e._id)}
                                          />
                                          <EditIcon
                                             onClick={() => handleEdit(e)}
                                          />
                                       </td>
                                    </tr>
                                 )}
                              </React.Fragment>
                           );
                        })}
                     </tbody>
                  ) : (
                     <tr>
                        <BasicSpinner
                           style={{
                              width: "100%",
                              margin: "60px auto",
                              fontSize: "30px",
                           }}
                        />
                     </tr>
                  )}
               </table>
            </div>
         )}
      </>
   );
};

export default Pourchaseorder;
