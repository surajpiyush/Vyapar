import css from "../../Parties/AddParties.module.css";
import {
   DeleteParty,
   SaveParty,
   UpdateParty,
} from "../../../Redux/parties/actions";
import {
   SettingsIconOutline,
   CrossIcon,
   BasicSpinnerIcon,
   DeleteIcon,
} from "../../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddBankAccount = ({
   CloseForm,
   OpenSettings,
   usedAsEditForm = false,
   editPartyData = {},
}) => {
   const toast = useToast();
   const dispatch = useDispatch();
   const postPartyLoading = useSelector(
      (state) => state.PartiesReducer.postPartyLoading
   );
   const loadingDeleteParty = useSelector(
      (state) => state.PartiesReducer.loadingDeleteParty
   );
   const loadingEdit = useSelector((state) => state.PartiesReducer.loadingEdit);
   const [printUPI, setPrintUPI] = useState(false);
   const [bankDet, setBankDet] = useState(false);
   const [linkAcc, setLinkAcc] = useState(false);
   const [formData, setFormData] = useState({
      accountDisplayName: "",
      openingBalance: "",
      asOfDate: new Date().toISOString().split("T")[0],
      accountNumber: "",
      ifscCode: "",
      upiId: "",
      bankName: "",
      accountHolderName: "",
   });
   // console.log(formData);
   // for mixing edit form data when used as edit party form
   useEffect(() => {
      if (usedAsEditForm) {
         setFormData((prev) => {
            return {
               ...prev,
               ...editPartyData,
               asOfDate: new Date(editPartyData.asOfDate)
                  .toISOString()
                  .split("T")[0],
            };
         });
      }
   }, []);

   // Handle Save Function
   const handleSubmit = (e) => {
      e.preventDefault();

      if (usedAsEditForm) {
         if (!loadingEdit) {
            UpdateParty(dispatch, formData?._id, formData, CloseForm, toast);
         }
      } else {
         if (!postPartyLoading) {
            SaveParty(dispatch, formData, CloseForm, toast);
         }
      }
   };

   //   Delete Party Function
   const handleDelete = () => {
      DeleteParty(dispatch, formData?._id, CloseForm, toast);
   };

   // Input Change Function
   const handleInpChange = (e) => {
      let { name, value } = e.target;
      setFormData((prev) => {
         return { ...prev, [name]: value };
      });
   };

   return (
      <div
         onClick={(e) => {
            e.stopPropagation();
            CloseForm(false);
         }}
         className={css.FormOuterParent}
      >
         <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className={css.actualFormOuter}
         >
            {/* Header */}
            <div className={css.formHeaderOuterDiv}>
               <h3>{usedAsEditForm ? "Edit" : "Add"} Bank Account</h3>
               <div>
                  {!usedAsEditForm && (
                     <SettingsIconOutline onClick={() => OpenSettings(true)} />
                  )}
                  <CrossIcon onClick={() => CloseForm(false)} />
               </div>
            </div>

            {/* Middle  */}
            <div className={css.middleOuter}>
               <div className={css.upperInpCont}>
                  {/* Party Name */}
                  <div className={css.inputDiv}>
                     <input
                        type="text"
                        name="accountDisplayName"
                        value={formData?.accountDisplayName}
                        onChange={handleInpChange}
                        className={css.input}
                        required
                     />
                     <label
                        className={
                           formData?.accountDisplayName
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        Account Display Name*
                     </label>
                  </div>
                  {/* Phone Number */}
                  <div className={css.inputDiv}>
                     <input
                        type="number"
                        name="openingBalance"
                        value={formData?.openingBalance}
                        onChange={handleInpChange}
                        className={css.input}
                     />
                     <label
                        className={
                           formData?.openingBalance
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        Opening Balance
                     </label>
                  </div>
                  {/* As Of Date */}
                  <div className={css.inputDiv}>
                     <input
                        type="date"
                        name="asOfDate"
                        value={formData?.asOfDate}
                        onChange={handleInpChange}
                        className={css.input}
                     />
                     <label
                        className={
                           formData?.asOfDate
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        As Of Date
                     </label>
                  </div>
               </div>
               <div className={css.additionalFieldOuter}>
                  <div className={css.singleAddFieldContOuter}>
                     <input
                        type="checkbox"
                        name="editable"
                        // checked={addFieldItem?.editable}
                        onChange={() => setPrintUPI(!printUPI)}
                     />
                     <p>Print UPI QR Code on Invoices</p>
                  </div>
                  <div className={css.singleAddFieldContOuter}>
                     <input
                        type="checkbox"
                        name="editable"
                        onChange={() => setBankDet(!bankDet)}
                        // checked={addFieldItem?.editable}
                     />
                     <p>Print bank details on invoices</p>
                  </div>
               </div>
               <div className={css.upperInpCont}>
                  {/* Account Number  */}
                  {(printUPI || bankDet) && (
                     <div className={css.inputDiv}>
                        <input
                           type="number"
                           name="accountNumber"
                           value={formData?.accountNumber}
                           onChange={handleInpChange}
                           className={css.input}
                           required
                        />
                        <label
                           className={
                              formData?.accountNumber
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           Account Number *
                        </label>
                     </div>
                  )}
                  {/* ifscCode */}
                  {(printUPI || bankDet) && (
                     <div className={css.inputDiv}>
                        <input
                           type="text"
                           name="ifscCode"
                           value={formData?.ifscCode}
                           onChange={handleInpChange}
                           className={css.input}
                           required
                        />
                        <label
                           className={
                              formData?.ifscCode
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           IFSC CODE *
                        </label>
                     </div>
                  )}
                  {/* UPI ID */}
                  {printUPI && (
                     <div className={css.inputDiv}>
                        <input
                           type="text"
                           name="upiId"
                           value={formData?.upiId}
                           onChange={handleInpChange}
                           className={css.input}
                        />
                        <label
                           className={
                              formData?.upiId
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           UPI ID for QR Code
                        </label>
                     </div>
                  )}
               </div>
               <div className={css.upperInpCont}>
                  {/* BANK NAME */}
                  {(printUPI || bankDet) && (
                     <div className={css.inputDiv}>
                        <input
                           type="text"
                           name="bankName"
                           value={formData?.bankName}
                           onChange={handleInpChange}
                           className={css.input}
                           required
                        />
                        <label
                           className={
                              formData?.bankName
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           BANK NAME
                        </label>
                     </div>
                  )}
                  {/* ACCOUNT HOLDER NAME */}
                  {bankDet && (
                     <div className={css.inputDiv}>
                        <input
                           type="text"
                           name="accountHolderName"
                           value={formData?.accountHolderName}
                           onChange={handleInpChange}
                           className={css.input}
                           required
                        />
                        <label
                           className={
                              formData?.accountHolderName
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           ACCOUNT HOLDER NAME
                        </label>
                     </div>
                  )}
               </div>
               <div className={css.singleAddFieldContOuter}>
                  <input
                     type="checkbox"
                     name="editable"
                     onChange={() => setLinkAcc(!setLinkAcc)}
                  />
                  <p>Link Bank Account Online</p>
               </div>
            </div>

            {/* Footer */}
            <div className={css.footerOuter}>
               {usedAsEditForm ? (
                  <button
                     type="submit"
                     style={{
                        cursor: loadingEdit ? "not-allowed" : "pointer",
                     }}
                     disabled={loadingEdit}
                     className={css.saveBtn}
                  >
                     {loadingEdit ? "Updating..." : "Update"}
                  </button>
               ) : (
                  <button
                     type="submit"
                     style={{
                        cursor: postPartyLoading ? "not-allowed" : "pointer",
                     }}
                     disabled={postPartyLoading}
                     className={css.saveBtn}
                  >
                     {postPartyLoading ? "Saving..." : "Save"}
                  </button>
               )}
               {usedAsEditForm && (
                  <button
                     type="button"
                     onClick={handleDelete}
                     disabled={loadingDeleteParty}
                     className={css.deleteBtn}
                  >
                     {loadingDeleteParty ? (
                        <BasicSpinnerIcon />
                     ) : (
                        <DeleteIcon />
                     )}
                  </button>
               )}
            </div>
         </form>
      </div>
   );
};

export default AddBankAccount;
