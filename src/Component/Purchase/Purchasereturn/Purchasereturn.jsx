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
import { useToast } from "@chakra-ui/react";

const Purchasereturn = ({ func, date, data }) => {
   const dispatch = useDispatch();
   const toast = useToast();
   const isLoading = useSelector((store) => store.PurchaseReducer.isLoading);

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

   const handleDelete = (id) => {
      dispatch(
         deletePurchaseReturnBill(id, toast, () => {
            dispatch(getPurchaseReturn({ date }));
         })
      );
   };

   const handleEdit = (data) => {
      setIsEditing(true);
      setEditedData(data);
   };

   const handleSave = (updatedData) => {
      console.log("updatedData-", updatedData);
      const id = updatedData._id;
      dispatch(updatePurchaseReturnBill(updatedData._id, updatedData));
      setIsEditing(false);
      setEditedData(null);
      dispatch(getPurchaseReturn({ date }));
   };

   const handleCancel = () => {
      setIsEditing(false);
      setEditedData(null);
   };

   const openForm = () => {
      func(true);
   };

   return (
      <div className={`main-container ${isEditing ? "editing" : ""}`}>
         {!isLoading && !data.length ? (
            <FirstTimeFormToggle
               img={party}
               onClick={openForm}
               BtnText="Make Your First Purchase Return Order"
               MiddleText="No data is available for Debit-Note. Please try again after making relevant changes."
            />
         ) : (
            <div className="payment-out-container">
               <div className="transactions-buttons">
                  <button onClick={openForm}>
                     <span>+</span> Add Payment Return
                  </button>
               </div>
               <table className="table">
                  <thead className="table-head">
                     <tr className="table-row">
                        <th className="table-h">#</th>
                        <th className="table-h">DATE</th>
                        <th className="table-h">RETURN NO.</th>
                        <th className="table-h">PARTY NAME</th>
                        <th className="table-h">CATEGORY NAME</th>
                        <th className="table-h">TYPE</th>
                        <th className="table-h">TOTAL</th>
                        <th className="table-h">RECIEVED</th>
                        <th className="table-h">BALANCE DUE</th>
                        <th className="table-h">STATUS</th>
                        <th className="table-h">PRINT/ACTION</th>
                     </tr>
                  </thead>
                  {!isLoading ? (
                     <tbody>
                        {data?.map((e, i) => (
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
                                       {new Date(e.billDate).toLocaleDateString(
                                          "en-IN",
                                          {
                                             day: "2-digit",
                                             month: "2-digit",
                                             year: "numeric",
                                          }
                                       )}
                                    </td>
                                    <td className="table-h">
                                       {e.returnNumber || "-"}
                                    </td>
                                    <td className="table-h">{e.partyName}</td>
                                    <td className="table-h">
                                       {e.categoryName || "-"}
                                    </td>
                                    <td className="table-h">{e.type}</td>
                                    <td className="table-h">
                                       ₹{e.amount || 0}
                                    </td>
                                    <td className="table-h">
                                       ₹{e.paymentType[0]?.amount || 0}
                                    </td>
                                    <td className="table-h">
                                       ₹
                                       {e.amount - e.paymentType[0]?.amount ||
                                          0}
                                    </td>
                                    <td className="table-h">
                                      {e.status}
                                    </td>
                                    <td className="table-h">
                                       <PrinterIcon
                                          onClick={() => window.print()}
                                       />
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
                     <tbody>
                        <tr>
                           <td colSpan="11">
                              <BasicSpinner
                                 style={{
                                    width: "100%",
                                    margin: "60px auto",
                                    fontSize: "30px",
                                 }}
                              />
                           </td>
                        </tr>
                     </tbody>
                  )}
               </table>
            </div>
         )}
      </div>
   );
};

export default Purchasereturn;
