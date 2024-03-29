// import "../../styles/Items.css";
import css from "../../Page/Items/edit.module.css";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { AddNewUnit } from "../../Redux/items/actions";

export default function CategoryForm(Props) {
   const toast = useToast();
   const dispatch = useDispatch();
   const [data, setData] = useState({
      shortName: "",
      unitName: "",
   });
   const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };
   const closeForm = () => {
      // console.log("Working");
      Props.func(false);
   };

   const handleSave = () => {
      // console.log("Add Unit Data:", data);
      AddNewUnit(dispatch, data, closeForm, toast);
   };

   return (
      <div onClick={() => closeForm()} className={css.Overlay}>
         <div
            onClick={(e) => e.stopPropagation()}
            className={css.OuterEditProfile}
         >
            {/* Top Nav */}
            <div className={css.topNavDiv}>
               <h3>Add Unit</h3>
               <CloseIcon onClick={() => closeForm()} />
            </div>

            {/* FormInputs */}
            <div className={css.actualFormContDiv}>
               <div className={css.TopSectionInputOuter}>
                  <div className={css.rightSideTopDivOuter}>
                     <div>
                        <label htmlFor="#">
                           Unit Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           type="text"
                           className="inp-field"
                           placeholder="Unit Name"
                           style={{ width: "93%" }}
                           name="unitName"
                           onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="#">
                        Short Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                           type="text"
                           className="inp-field"
                           placeholder="Short Name"
                           style={{ width: "93%" }}
                           name="shortName"
                           onChange={handleChange}
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className={css.footerDivOuter}>
               <button type="submit" onClick={handleSave}>
                  Save
               </button>
            </div>
         </div>
      </div>
   );
}
