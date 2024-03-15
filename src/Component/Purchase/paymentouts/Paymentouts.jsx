import "./Paymentouts.css";
import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
   deletePayoutBill,
   getPaymentOutBill,
   updatePayoutBill,
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
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import EditableRow from "../../EditForm";
import { FormatDate } from "../../../Redux/sales/action";

const Paymentouts = ({ func, date }) => {
   const dispatch = useDispatch();
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   let total = 0,totalBalance = 0
   const store = useSelector((store) => store.PurchaseReducer);
   const data = store.paymentOutData;
   console.log(data);
   //  console.log(date)
   // console.log(store);
   useEffect(() => {
      dispatch(getPaymentOutBill({ date }));
   }, [date, dispatch, func]);
   // console.log(data);

   // delete
   const handleDelete = (id) => {
      dispatch(deletePayoutBill(id));
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
      dispatch(updatePayoutBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      dispatch(getPaymentOutBill({ date }));
   };

   const handleCancel = () => {
      // If the user cancels, reset the state without saving
      setIsEditing(false);
      setEditedData(null);
   };

   const openForm = () => {
      func(true);
   };
   const display = [
      "#",
      "date",
      "refNo",
      "partyName",
      "categoryName",
      "type",
      "total",
      "recieved",
      "balance",
   ];
   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {!store.isLoading && !data.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={() => {
                  openForm();
               }}
               BtnText="Make Your First Payment-Out Order "
               MiddleText="No data is available for Payment-Out.
               Please try again after making relevant changes."
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
                     <span>+</span> Add Payment-out
                  </button>
               </div>

               <div>
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
                     {!store.isLoading ? (
                        <tbody>
                           {data?.map((e, i) => {
                              total += e.total; 
                              totalBalance += e.balance
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
                                             {FormatDate(e.date)}
                                          </td>
                                          <td className="table-h">{e.refNo}</td>
                                          <td className="table-h">
                                             {e.partyName}
                                          </td>
                                          <td className="table-h">
                                             {e.categoryName
                                                ? e.categoryName
                                                : "-"}
                                          </td>
                                          <td className="table-h">{e.type}</td>
                                          <td className="table-h">
                                             ₹{e.total}
                                          </td>
                                          <td className="table-h">₹{e.paid}</td>
                                          <td className="table-h">
                                             ₹{e.balance}
                                          </td>
                                          <td className="table-h">
                                             <PrinterIcon
                                                onClick={() => window.print()}
                                             />
                                             <DotsIcon />
                                          </td>
                                          <td className="table-h">
                                             <DeleteIcon
                                                onClick={() =>
                                                   handleDelete(e._id)
                                                }
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

               <div className="payment-outs-footer">
                  <p>
                     Total Amount: <span>₹ {total}</span>
                  </p>
                  <p>Balance: ₹ {totalBalance}</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default Paymentouts;
