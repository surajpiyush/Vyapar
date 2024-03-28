import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import {
   deletePayoutBill,
   getPaymentOutBill,
   updatePayoutBill,
} from "../../../Redux/purchase/action";
import EditableRow from "../../EditForm";
import { FormatDate } from "../../../Redux/sales/action";
import party from "../../../assets/Images/party.jpg";
import FirstTimeFormToggle from "../../FirmTimeForm/FirstTimeFormToggle";
import {
   DeleteIcon,
   DotsIcon,
   EditIcon,
   PrinterIcon,
} from "../../utils/reactIcons";

import "./Paymentouts.css";
import { useToast } from "@chakra-ui/react";

const Paymentouts = ({ func, date,data }) => {
   const toast = useToast();
   const dispatch = useDispatch();
   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const store = useSelector((store) => store.PurchaseReducer);

   console.log(data)

   const handleDelete = (id) => {
      // Delete payment out bill
      dispatch(deletePayoutBill(id, toast));
   };

   const handleEdit = (data) => {
      // Set state for editing
      setIsEditing(true);
      setEditedData(data);
   };

   const handleSave = (updatedData) => {
      // Save updated data
      dispatch(updatePayoutBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      dispatch(getPaymentOutBill({ date })); // Refresh data after saving
   };

   const handleCancel = () => {
      // Cancel editing
      setIsEditing(false);
      setEditedData(null);
   };

   const openForm = () => {
      // Open payment out form
      func(true);
   };

   const totaldisplay = useMemo(
      () => data?.reduce((acc, e) => acc + Number(e?.total), 0),
      [data]
   );
   const totalBalance = useMemo(
      () => data?.reduce((acc, e) => acc + Number(e?.balance), 0),
      [data]
   );

   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {!store.isLoading && !data.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={openForm}
               BtnText="Make Your First Payment-Out Order "
               MiddleText="No data is available for Payment-Out. Please try again after making relevant changes."
            />
         ) : (
            <div className="payment-out-container">
               <div className="transactions-buttons">
                  <button onClick={openForm}>
                     <span>+</span> Add Payment-out
                  </button>
               </div>

               <div>
                  <table className="table">
                     <thead className="table-head">
                        <tr className="table-row">
                           {[
                              "#",
                              "date",
                              "refNo",
                              "partyName",
                              "categoryName",
                              "type",
                              "total",
                              "balance",
                           ].map((item, index) => (
                              <th className="table-h" key={index}>
                                 <div className="table-items">{item}</div>
                              </th>
                           ))}
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
                           {data?.map((e, i) => (
                              <React.Fragment key={e._id}>
                                 {isEditing && editedData?._id === e._id ? (
                                    <EditableRow
                                       display={[
                                          "#",
                                          "date",
                                          "refNo",
                                          "partyName",
                                          "categoryName",
                                          "type",
                                          "total",
                                          "balance",
                                       ]}
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
                                          {e.categoryName || "-"}
                                       </td>
                                       <td className="table-h">{e.type}</td>
                                       <td className="table-h">₹{e.total}</td>
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
                           ))}
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
                     Total Amount: <span>₹ {totaldisplay}</span>
                  </p>
                  <p>Balance: ₹ {totalBalance}.00</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default Paymentouts;
