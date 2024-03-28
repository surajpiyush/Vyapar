import css from "../../Page/Firm/EditFirm.module.css";
import {
   UpdateItem,
   DeleteItem,
   UpdateCategory,
   DeleteCategory,
} from "../../Redux/items/actions";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

const CategoryEditForm = ({ setShowEditFirm, item }) => {
   const toast = useToast();
   const dispatch = useDispatch();
   const loadingUpdate = useSelector(
      (state) => state.ItemReducer.loadingUpdate
   );
   const loadingDelete = useSelector(
      (state) => state.ItemReducer.loadingDelete
   );

   const [categoryData, setCategoryData] = useState(item);

   //   Input Change Function
   const handleInputChange = (e) => {
      const { name, value } = e.target;

      setCategoryData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   //   Update category Function
   const handleUpdate = () => {
      console.log(categoryData);
      toast({
         title: "Backend under development",
         status: "info",
         position: "top",
      });

      UpdateCategory(
         dispatch,
         categoryData?._id,
         categoryData,
         setShowEditFirm,
         toast
      );
   };

   //   Delete category Function
   const handleDelete = () => {
      toast({
         title: "Backend under development",
         status: "info",
         position: "top",
      });
      DeleteCategory(dispatch, categoryData?._id, setShowEditFirm, toast);
   };

   return (
      <div onClick={() => setShowEditFirm(false)} className={css.Overlay}>
         <div
            onClick={(e) => e.stopPropagation()}
            className={css.OuterEditProfile}
         >
            {/* Top Nav */}
            <div className={css.topNavDiv}>
               <h2>Edit Category</h2>
               <CloseIcon onClick={() => setShowEditFirm(false)} />
            </div>

            {/* FormInputs */}
            <div className={css.actualFormContDiv}>
               <div className={css.TopSectionInputOuter}>
                  <div className={css.rightSideTopDivOuter}>
                     <div>
                        <label htmlFor="#">Item ID</label>
                        <input
                           value={categoryData?._id}
                           onChange={handleInputChange}
                           readOnly
                           type="text"
                           placeholder="Item ID"
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                           Category Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           value={categoryData?.categoryName}
                           onChange={handleInputChange}
                           name="categoryName"
                           type="text"
                           placeholder="Category name"
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

export default CategoryEditForm;
