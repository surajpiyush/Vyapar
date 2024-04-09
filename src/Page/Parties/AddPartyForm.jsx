import css from "./AddParties.module.css";
import {
   DeleteParty,
   SaveParty,
   UpdateParty,
} from "../../Redux/parties/actions";
import {
   SettingsIconOutline,
   CrossIcon,
   BasicSpinnerIcon,
   DeleteIcon,
} from "../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddPartyForm = ({
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

   const [formData, setFormData] = useState({
      partyName: "",
      phoneNumber: "",
      state: "",
      email: "",
      GSTType: "",
      billingAddress: "",
      shippingAddress: "",
      openingBalance: "",
      asOfDate: new Date().toISOString().split("T")[0],
      creditLimit: "",
      gstNo: "",
      additionalField: [
         { name: "", value: "", editable: false },
         { name: "", value: "", editable: false },
         { name: "", value: "", editable: false },
      ],
   });

   const states = [
      "Andaman and Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
   ];
   const [disableShippingAddress, setDisableShippingAddress] = useState(true);
   const [creditLimitToggle, setCreditLimitToggle] = useState(false);

   const [currInps, setCurrInps] = useState("GST & Address");
   const loadingEdit = useSelector((state) => state.PartiesReducer.loadingEdit);

   // Handle Save Function
   const handleSubmit = (e) => {
      e.preventDefault();
      // Validate form fields
      if (!validateForm()) {
         return;
      }

      let partyFormData = {
         ...formData,
         additionalField: formData?.additionalField.filter(
            (field) => field.name !== ""
         ),
      };
      if (
         formData.GSTType === "" ||
         formData.GSTType === "Unregistered/Consumer"
      ) {
         formData.gstNo = "";
      }

      if (usedAsEditForm) {
         if (!loadingEdit) {
            UpdateParty(
               dispatch,
               partyFormData?._id,
               partyFormData,
               CloseForm,
               toast
            );
         }
      } else {
         if (!postPartyLoading) {
            SaveParty(dispatch, partyFormData, CloseForm, toast);
         }
      }
   };

   // Validate form fields
   const validateForm = () => {
      if (formData.phoneNumber.trim().length !== 10) {
         toast({
            title: "Error",
            description: "Please enter a 10-digit mobile number.",
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      }

      return true;
   };

   // Delete Party Function
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

   // Additional Field Input Change
   const addFieldInpChange = (e, fieldIndex) => {
      const { name, type } = e.target;
      let newAddFieldArr = formData?.additionalField?.map((item, ind) => {
         if (ind != fieldIndex) {
            return item;
         } else {
            let obj = {
               ...item,
               [name]: type === "checkbox" ? e.target.checked : e.target.value,
            };
            return obj;
         }
      });
      setFormData((prev) => {
         return { ...prev, additionalField: newAddFieldArr };
      });
   };

   // Add More Additional Fields
   const AddMoreAdditionalField = () => {
      setFormData((prev) => {
         return {
            ...prev,
            additionalField: [
               ...prev?.additionalField,
               { name: "", value: "", editable: false },
            ],
         };
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
               <h3>{usedAsEditForm ? "Edit" : "Add"} Party</h3>
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
                        name="partyName"
                        value={formData?.partyName}
                        onChange={handleInpChange}
                        className={css.input}
                        required
                     />
                     <label
                        className={
                           formData?.partyName
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        Party Name*
                     </label>
                  </div>
                  {/* Phone Number */}
                  <div className={css.inputDiv}>
                     <input
                        type="number"
                        name="phoneNumber"
                        value={formData?.phoneNumber}
                        onChange={handleInpChange}
                        className={css.input}
                        required
                     />
                     <label
                        className={
                           formData?.phoneNumber
                              ? css.activeLabel
                              : css.inactiveLabel
                        }
                     >
                        Phone Number*
                     </label>
                  </div>
                  {/* GSTIN */}
                  {!(
                     formData.GSTType === "" ||
                     formData.GSTType === "Unregistered/Consumer"
                  ) && (
                     <div className={css.inputDiv}>
                        <input
                           type="text"
                           name="gstNo"
                           value={formData?.gstNo}
                           onChange={handleInpChange}
                           className={css.input}
                           required
                        />
                        <label
                           className={
                              formData?.gstNo
                                 ? css.activeLabel
                                 : css.inactiveLabel
                           }
                        >
                           GSTIN*
                        </label>
                     </div>
                  )}
               </div>

               {/* Changer */}
               <div className={css.changerOuterDiv}>
                  <div
                     style={{
                        color:
                           currInps === "GST & Address"
                              ? "var(--blueB)"
                              : "var(--greyH)",
                        borderColor:
                           currInps === "GST & Address"
                              ? "var(--blueB)"
                              : "transparent",
                     }}
                     onClick={() => setCurrInps("GST & Address")}
                     className={css.changerDivs}
                  >
                     GST & Address
                  </div>
                  <div
                     style={{
                        color:
                           currInps === "Credit & Balance"
                              ? "var(--blueB)"
                              : "var(--greyH)",
                        borderColor:
                           currInps === "Credit & Balance"
                              ? "var(--blueB)"
                              : "transparent",
                     }}
                     onClick={() => setCurrInps("Credit & Balance")}
                     className={css.changerDivs}
                  >
                     Credit & Balance
                  </div>
                  <div
                     style={{
                        color:
                           currInps === "Additional Fields"
                              ? "var(--blueB)"
                              : "var(--greyH)",
                        borderColor:
                           currInps === "Additional Fields"
                              ? "var(--blueB)"
                              : "transparent",
                     }}
                     onClick={() => setCurrInps("Additional Fields")}
                     className={css.changerDivs}
                  >
                     Additional Fields
                  </div>
               </div>

               {currInps === "GST & Address" ? (
                  // GST & Address - Inputs
                  <div className={css.gstAddressOuter}>
                     <div className={css.leftSideGstAddressDiv}>
                        {/* GST */}
                        <div className={css.inputDiv}>
                           <select
                              id=""
                              className={css.input}
                              style={{ width: "225px" }}
                              value={formData.GSTType}
                              name="GSTType"
                              onChange={handleInpChange}
                              required
                           >
                              <option value="">GST Type*</option>
                              <option value="Unregistered/Consumer">
                                 Unregistered/Consumer
                              </option>
                              <option value="Registered Business - Regular">
                                 Registered Business - Regular
                              </option>
                              <option value="Registered Business - Composition">
                                 Registered Business - Composition
                              </option>
                           </select>
                           <label
                              className={
                                 formData?.GSTType
                                    ? css.activeLabel
                                    : css.inactiveLabel
                              }
                           >
                              GST Type*
                           </label>
                        </div>
                        {/* State */}
                        <div className={css.inputDiv}>
                           <select
                              name="state"
                              value={formData?.state}
                              onChange={handleInpChange}
                              className={css.input}
                              required
                           >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                 <option value={state}>{state}</option>
                              ))}
                           </select>
                           <label
                              className={
                                 formData?.state
                                    ? css.activeLabel
                                    : css.inactiveLabel
                              }
                           >
                              State*
                           </label>
                        </div>
                        {/* Email */}
                        <div className={css.inputDiv}>
                           <input
                              type="email"
                              name="email"
                              value={formData?.email}
                              onChange={handleInpChange}
                              className={css.input}
                              required
                           />
                           <label
                              className={
                                 formData?.email
                                    ? css.activeLabel
                                    : css.inactiveLabel
                              }
                           >
                              Email*
                           </label>
                        </div>
                     </div>
                     <div className={css.rightSideGstAddressDiv}>
                        {/* Billing Address */}
                        <div className={css.inputDiv}>
                           <textarea
                              name="billingAddress"
                              value={formData?.billingAddress}
                              onChange={handleInpChange}
                              className={css.input}
                           />
                           <label
                              className={
                                 formData?.billingAddress
                                    ? css.activeLabel
                                    : css.inactiveLabel
                              }
                           >
                              Billing Address
                           </label>
                           <h3
                              onClick={() =>
                                 setDisableShippingAddress((prev) => !prev)
                              }
                              style={{
                                 color: !disableShippingAddress
                                    ? "var(--greyA)"
                                    : "var(--blueB)",
                              }}
                              className={css.textBtnCss}
                           >
                              {disableShippingAddress
                                 ? "+ Enable"
                                 : "- Disable"}{" "}
                              Shipping Address
                           </h3>
                        </div>
                        {/* Shipping Address */}
                        <div
                           style={{
                              visibility: disableShippingAddress
                                 ? "hidden"
                                 : "visible",
                           }}
                           className={css.inputDiv}
                        >
                           <textarea
                              name="shippingAddress"
                              value={formData?.shippingAddress}
                              onChange={handleInpChange}
                              className={css.input}
                           />
                           <label
                              className={
                                 formData?.shippingAddress
                                    ? css.activeLabel
                                    : css.inactiveLabel
                              }
                           >
                              Shipping Address
                           </label>
                        </div>
                     </div>
                  </div>
               ) : currInps === "Credit & Balance" ? (
                  // Credit & Balance - Inputs
                  <div>
                     <div className={css.creditAndBalUpperInpDiv}>
                        {/* Opening Balance */}
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
                     <div className={css.creditLimitOuterDiv}>
                        <h3>Credit Limit</h3>
                        <div>
                           <label
                              style={{
                                 color: !creditLimitToggle
                                    ? "var(--blueB)"
                                    : "var(--greyD)",
                              }}
                              htmlFor="No Limit"
                           >
                              <input
                                 type="radio"
                                 name="No Limit"
                                 checked={!creditLimitToggle}
                                 onChange={() => {
                                    setCreditLimitToggle(false);
                                 }}
                              />
                              No Limit
                           </label>
                           <label
                              style={{
                                 color: creditLimitToggle
                                    ? "var(--blueB)"
                                    : "var(--greyD)",
                              }}
                              htmlFor="Custom Limit"
                           >
                              <input
                                 type="radio"
                                 checked={creditLimitToggle}
                                 onChange={() => {
                                    setCreditLimitToggle(true);
                                 }}
                                 name="Custom Limit"
                              />
                              Custom Limit
                           </label>
                        </div>
                        {/* Credit Limit */}
                        {creditLimitToggle && (
                           <div className={css.inputDiv}>
                              <input
                                 type="number"
                                 name="creditLimit"
                                 value={formData?.creditLimit}
                                 onChange={handleInpChange}
                                 className={css.input}
                              />
                              <label
                                 className={
                                    formData?.creditLimit
                                       ? css.activeLabel
                                       : css.inactiveLabel
                                 }
                              >
                                 Credit Limit
                              </label>
                           </div>
                        )}
                     </div>
                  </div>
               ) : (
                  // Additional Fields - Inputs
                  <div className={css.additionalFieldOuter}>
                     {formData?.additionalField?.map(
                        (addFieldItem, fieldIndex) => (
                           <div className={css.singleAddFieldContOuter}>
                              <input
                                 type="checkbox"
                                 name="editable"
                                 checked={addFieldItem?.editable}
                                 onChange={(e) =>
                                    addFieldInpChange(e, fieldIndex)
                                 }
                              />
                              {/* Name */}
                              <div className={css.inputDiv}>
                                 <input
                                    type="text"
                                    name="name"
                                    value={addFieldItem?.name}
                                    onChange={(e) =>
                                       addFieldInpChange(e, fieldIndex)
                                    }
                                    readOnly={!addFieldItem?.editable}
                                    className={css.input}
                                 />
                                 <label
                                    className={
                                       addFieldItem?.name
                                          ? css.activeLabel
                                          : css.inactiveLabel
                                    }
                                 >
                                    Additional Field {fieldIndex + 1} Name
                                 </label>
                              </div>
                              {/* Value */}
                              {addFieldItem?.name && (
                                 <div className={css.inputDiv}>
                                    <input
                                       type="text"
                                       name="value"
                                       value={addFieldItem?.value}
                                       onChange={(e) =>
                                          addFieldInpChange(e, fieldIndex)
                                       }
                                       readOnly={!addFieldItem?.editable}
                                       className={css.input}
                                    />
                                    <label
                                       className={
                                          addFieldItem?.value
                                             ? css.activeLabel
                                             : css.inactiveLabel
                                       }
                                    >
                                       {addFieldItem?.name} Value
                                    </label>
                                 </div>
                              )}
                           </div>
                        )
                     )}
                     <h3
                        onClick={AddMoreAdditionalField}
                        style={{
                           color: "var(--blueB)",
                        }}
                        className={css.textBtnCss}
                     >
                        + Add More Additional Fields
                     </h3>
                  </div>
               )}
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

export default AddPartyForm;
