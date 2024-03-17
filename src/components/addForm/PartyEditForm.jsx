import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose as CloseIcon } from "react-icons/io";
import css from "../../Page/Firm/EditFirm.module.css";
import { UpdateCompanyProfile } from "../../Redux/business/action";

const PartyEditForm = ({ setShowEditFirm, party }) => {
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
   const [partyData, setPartyData] = useState(party);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPartyData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSave = () => {
      console.log(partyData);
      setShowEditFirm(false);
      //   dispatch(UpdateCompanyProfile(partyData));
   };

   return (
      <div onClick={() => setShowEditFirm(false)} className={css.Overlay}>
         <div
            onClick={(e) => e.stopPropagation()}
            className={css.OuterEditProfile}
         >
            {/* Top Nav */}
            <div className={css.topNavDiv}>
               <h2>Edit Party</h2>
               <CloseIcon onClick={() => setShowEditFirm(false)} />
            </div>

            {/* FormInputs */}
            <div className={css.actualFormContDiv}>
               <div className={css.TopSectionInputOuter}>
                  <div className={css.rightSideTopDivOuter}>
                     <div>
                        <label htmlFor="#">Party ID</label>
                        <input
                           value={partyData?._id}
                           onChange={handleInputChange}
                           readOnly
                           type="text"
                           placeholder="Party ID"
                           style={{
                              backgroundColor: "#f4f4f4",
                              color: "#888",
                              border: "1px solid #ddd",
                              cursor: "not-allowed",
                           }}
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Party Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           value={partyData?.partyName}
                           onChange={handleInputChange}
                           name="partyName"
                           type="text"
                           placeholder="Party name"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Opening Balance{" "}
                           <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           value={partyData?.openingBalance}
                           onChange={handleInputChange}
                           name="openingBalance"
                           type="Number"
                           placeholder="Opening Balance"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Phone No. <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           type="number"
                           value={partyData?.phoneNumber}
                           onChange={handleInputChange}
                           name="phoneNumber"
                           placeholder="Phone Number"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Billing Address{" "}
                           <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           type="text"
                           value={partyData?.billingAddress}
                           onChange={handleInputChange}
                           name="billingAddress"
                           placeholder="Enter Billing Address"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">GST NO.</label>
                        <input
                           type="text"
                           value={partyData?.gstNo}
                           onChange={handleInputChange}
                           name="gstNo"
                           placeholder="GST NO."
                        />
                     </div>
                  </div>
               </div>
            </div>
            {/* Footer */}
            <div className={css.footerDivOuter}>
               <button type="submit" disabled={isLoading} onClick={handleSave}>
                  {isLoading ? "Saving..." : "Save"}
               </button>
            </div>
         </div>
      </div>
   );
};

export default PartyEditForm;
