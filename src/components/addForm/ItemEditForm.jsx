import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose as CloseIcon } from "react-icons/io";
import css from "../../Page/Firm/EditFirm.module.css";
import { UpdateCompanyProfile } from "../../Redux/business/action";
import { EditItem } from "../../Redux/items/actions";

const ItemEditForm = ({ setShowEditFirm, item }) => {
   // console.log(item)
   const dispatch = useDispatch();
   const isLoading = useSelector((state) => state.BusinessReducer.isLoading);
   const [itemData, setPartyData] = useState(item);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "openingQuantity") {
         setPartyData((prevData) => ({
            ...prevData,
            stock: {
               ...prevData.stock,
               openingQuantity: value,
            },
         }));
      } else {
         setPartyData((prevData) => ({
            ...prevData,
            [name]: value,
         }));
      }
   };

   const handleSave = () => {
      console.log(itemData);
      setShowEditFirm(false);
      dispatch(EditItem(itemData._id, itemData));
   };

   return (
      <div onClick={() => setShowEditFirm(false)} className={css.Overlay}>
         <div
            onClick={(e) => e.stopPropagation()}
            className={css.OuterEditProfile}
         >
            {/* Top Nav */}
            <div className={css.topNavDiv}>
               <h2>Edit Item</h2>
               <CloseIcon onClick={() => setShowEditFirm(false)} />
            </div>

            {/* FormInputs */}
            <div className={css.actualFormContDiv}>
               <div className={css.TopSectionInputOuter}>
                  <div className={css.rightSideTopDivOuter}>
                     <div>
                        <label htmlFor="#">Item ID</label>
                        <input
                           value={itemData?._id}
                           onChange={handleInputChange}
                           readOnly
                           type="text"
                           placeholder="Item ID"
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
                           Item Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           value={itemData?.itemName}
                           onChange={handleInputChange}
                           name="itemName"
                           type="text"
                           placeholder="Party name"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Quantity <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           value={itemData?.stock?.openingQuantity}
                           onChange={handleInputChange}
                           name="openingQuantity"
                           type="number"
                           placeholder="Opening Quantity"
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

export default ItemEditForm;
