import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
   deletePurchaseReturnBill,
   getPurchaseReturn,
   updatePurchaseReturnBill,
} from "../../../Redux/purchase/action";
import {
   DeleteIcon,
   DotsIcon,
   EditIcon,
   FilterIcon,
   PrinterIcon,
   ShareIcon,
} from "../../utils/reactIcons";

import React, { useEffect, useState } from "react";

import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import EditableRow from "../../EditForm";

const Purchasereturn = ({ func, date }) => {
   const dispatch = useDispatch();
   const isLoading = useSelector((store) => store.PurchaseReducer.isLoading);
   const data = useSelector(
      (store) => store.PurchaseReducer?.purchaseReturnData
   );
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const display = [
      "#",
      "billDate",
      "refNo",
      "partyName",
      "category",
      "type",
      "total",
      "recieve",
      "balance",
   ];
   // console.log("REturn data:",data)
   useEffect(() => {
      dispatch(getPurchaseReturn({ date }));
   }, [dispatch, date, func]);

   // delete
   const handleDelete = (id) => {
      dispatch(deletePurchaseReturnBill(id));
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
      dispatch(updatePurchaseReturnBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      dispatch(getPurchaseReturn({ date }));
   };

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData(null);
   };

   const openForm = () => {
      func(true);
   };
   console.log(data);
   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {!isLoading && !data.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => {
                  openForm();
               }}
               BtnText="Make Your First Purchase Return Order "
               MiddleText="No data is available for Debit-Note .
               Please try again after making relevant changes."
            />
         ) : (
            <div className="payment-out-container">
               <div className="transactions-buttons">
                  {/* <input type="text" /> */}
                  <button onClick={() => openForm()}>
                     <span>+</span> Add Payment Return
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
                           <div className="table-items">Ref No.</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">PartyName</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">CategoryName</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Type</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Total</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Received</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Balance</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Print</div>
                        </th>
                        <th className="table-h">
                           <div className="table-items">Action</div>
                        </th>
                     </tr>
                  </thead>
                  {!isLoading ? (
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
                                          {new Date(
                                             e.billDate
                                          ).toLocaleDateString("en-IN", {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          })}
                                       </td>
                                       <td className="table-h">
                                          {" "}
                                          {e.returnNumber || "-"}
                                       </td>
                                       <td className="table-h">
                                          {e.partyName}
                                       </td>
                                       <td className="table-h">
                                          {e.categoryName
                                             ? e.categoryName
                                             : "-"}
                                       </td>
                                       <td className="table-h">{e.type}</td>
                                       <td className="table-h">   ₹{e.amount || 0}</td>
                                       <td className="table-h"> ₹{e.balanceDue || 0}</td>
                                       <td className="table-h">₹{e.balance}</td>
                                       <td className="table-h">
                                          <PrinterIcon
                                             onClick={() => window.print()}
                                          />
                                          <DotsIcon />
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
      </div>
   );
};

export default Purchasereturn;
