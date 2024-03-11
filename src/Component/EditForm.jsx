import React, { useState } from "react";
import "./Editform.css";

const EditableRow = ({ display, data, onSave, onCancel }) => {
   const [editedData, setEditedData] = useState(data);
   console.log(editedData);
   const handleInputChange = (e) => {
      const { name, value } = e.target;

      setEditedData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   return (
      <section className="transaction-tables edit-mode">
         {display.includes("#") ? (
            <div className="transaction-table">
               <input type="text" name="#" value={"#"} readOnly />
            </div>
         ) : (
            ""
         )}

         {display.includes("billDate") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="billDate"
                  value={new Date(editedData.billDate).toLocaleDateString(
                     "en-IN",
                     {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                     }
                  )}
                  //    onChange={handleInputChange}
                  readOnly
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("date") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="date"
                  value={new Date(editedData.date).toLocaleDateString("en-IN", {
                     day: "2-digit",
                     month: "2-digit",
                     year: "numeric",
                  })}
                  //    onChange={handleInputChange}
                  readOnly
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("orderNumber") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="orderNumber"
                  value={editedData.orderNumber}
                  readOnly
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("refNo") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="refNo"
                  value={editedData.refNo}
                  handleInputChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("billNumber") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="invoice"
                  value={editedData.billNumber}
                  onChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("partyName") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="partyName"
                  value={editedData.partyName}
                  onChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}

         {display.includes("dueDate") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="orderNumber"
                  value={new Date(editedData.dueDate).toLocaleDateString(
                     "en-IN",
                     {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                     }
                  )}
                  onChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("categoryName") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="categotyName"
                  value={editedData.categotyName}
                  handleInputChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}

         {display.includes("type") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="type"
                  value={editedData.type}
                  handleInputChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("total") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="total"
                  value={editedData.total}
                  handleInputChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("recieved") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="recieved"
                  value={editedData.recieved}
                  handleInputChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("balance") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="balance"
                  value={editedData.balance}
                  handleInputChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("paymentType") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="paymentType"
                  value={editedData.paymentType[0].type}
                  onChange={handleInputChange}
                  readOnly
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("amount") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="amount"
                  value={editedData.amount}
                  onChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("balanceDue") ? (
            <div className="transaction-table">
               <input
                  type="text"
                  name="balanceDue"
                  value={
                     editedData.status === "Paid"
                        ? 0 : editedData.amount - (editedData.balanceAmount || 0)
                       
                  }
                  // value={editedData.balanceDue}
                  onChange={handleInputChange}
               />
            </div>
         ) : (
            ""
         )}
         {display.includes("status") ? (
            <div className="transaction-table">
               <select
                  name="status"
                  value={editedData.status}
                  onChange={handleInputChange}
               >
                  {/* <option value={editedData.status}>
                {editedData.status}
            </option> */}
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
               </select>
            </div>
         ) : (
            ""
         )}

         <div className="transaction-table">
            {/* Save and Cancel buttons */}
            <button onClick={() => onSave(editedData)}>Update</button>
            <button className="cancel" onClick={onCancel}>
               Cancel
            </button>
         </div>
      </section>
   );
};

export default EditableRow;
