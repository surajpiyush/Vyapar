import css from "../../Page/Firm/EditFirm.module.css";
import { UpdateItem, DeleteItem } from "../../Redux/items/actions";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

const UnitEditForm = ({ setShowEditFirm, item }) => {
   const toast = useToast();
   const dispatch = useDispatch();
   const loadingUpdate = useSelector(
      (state) => state.ItemReducer.loadingUpdate
   );
   const loadingDelete = useSelector(
      (state) => state.ItemReducer.loadingDelete
   );
   const [unitData, setUnitData] = useState(item);

   //   Input Change Function
   const handleInputChange = (e) => {
      const { name, value } = e.target;

      setUnitData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   //   Update Item Function
   const handleUpdate = () => {
      toast({
         title: "Backend under development",
         status: "info",
         position: "top",
      });
      // UpdateItem(dispatch, unitData?._id, unitData, setShowEditFirm, toast);
   };

   //   Delete Item Function
   const handleDelete = () => {
      toast({
         title: "Backend under development",
         status: "info",
         position: "top",
      });
      // DeleteItem(dispatch, unitData?._id, setShowEditFirm, toast);
   };

   return (
      <div onClick={() => setShowEditFirm(false)} className={css.Overlay}>
         <div
            onClick={(e) => e.stopPropagation()}
            className={css.OuterEditProfile}
         >
            {/* Top Nav */}
            <div className={css.topNavDiv}>
               <h2>Edit Unit</h2>
               <CloseIcon onClick={() => setShowEditFirm(false)} />
            </div>

            {/* FormInputs */}
            <div className={css.actualFormContDiv}>
               <div className={css.TopSectionInputOuter}>
                  <div className={css.rightSideTopDivOuter}>
                     <div>
                        <label htmlFor="#">Unit ID</label>
                        <input
                           value={unitData?._id}
                       
                           readOnly
                           type="text"
                           placeholder="Item ID"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Unit Full Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           value={unitData?.unitName}
                           onChange={handleInputChange}
                           name="unitName"
                           type="text"
                           placeholder="Unit name"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Unit Short Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           value={unitData?.shortName}
                           onChange={handleInputChange}
                           name="shortName"
                           type="text"
                           placeholder="Unit Short name"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className={css.footerDivOuter}>
               <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loadingDelete}
                  id={css.deleteBtn}
               >
                  {loadingDelete ? <SpinnerIcon /> : <DeleteIcon />}
               </button>
               <button
                  type="submit"
                  disabled={loadingUpdate}
                  onClick={handleUpdate}
               >
                  {loadingUpdate ? "Saving..." : "Save"}
               </button>
            </div>
         </div>
      </div>
   );
};

export default UnitEditForm;
