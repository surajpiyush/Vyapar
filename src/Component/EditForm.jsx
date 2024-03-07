import React, { useState } from "react";
import "./Editform.css";

const EditableRow = ({ data, onSave, onCancel }) => {
   const [editedData, setEditedData] = useState(data);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "partyName") {
         setEditedData((prevData) => ({
            ...prevData,
            partyData: {
               ...prevData.partyData,
               [name]: value,
            },
         }));
      } else {
         setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
         }));
      }
   };

   return (
      <section className="transaction-tables edit-mode">
         {/* Add your input fields for editing */}
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
         <div className="transaction-table">
            <input
               type="text"
               name="invoice"
               value={editedData.invoice}
               onChange={handleInputChange}
            />
         </div>
         <div className="transaction-table">
            <input
               type="text"
               name="partyName"
               value={editedData.partyData.partyName}
               onChange={handleInputChange}
            />
         </div>
         <div className="transaction-table">
            <input
               type="text"
               name="paymentType"
               value={editedData.paymentType[0].type}
               onChange={handleInputChange}
               readOnly
            />
         </div>
         <div className="transaction-table">
            <input
               type="text"
               name="amount"
               value={editedData.amount}
               onChange={handleInputChange}
            />
         </div>
         <div className="transaction-table">
            <input
               type="text"
               name="balanceDue"
               value={editedData.balanceDue}
               onChange={handleInputChange}
            />
         </div>
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
