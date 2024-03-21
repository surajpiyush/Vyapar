import React, { useState } from "react";
import { addCategory } from "../../Redux/items/actions";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

export default function CategoryForm(Props) {
   const [categoryName, setCategoryName] = useState("");
   const dispatch = useDispatch();
   const toast = useToast(); // Corrected typo here
   const closeForm = () => {
      console.log("Working");
      Props.func(false);
   };

   const handleSave = () => {
      // console.log(categoryName);
      const data = {categoryName:categoryName}
      addCategory(dispatch, data, closeForm, toast);
   };

   return (
      <div>
         <div className="unit-form">
            <div className="d-between">
               <div className="">
                  <h3>Add Category</h3>
               </div>
               <div className="">
                  <i className="fa fa-close" onClick={closeForm}></i>
               </div>
            </div>
            <hr />
            <div className="" style={{ textAlign: "start" }}>
               <input
                  type="text"
                  className="inp-field"
                  placeholder="Enter Category"
                  style={{ width: "93%" }}
                  onChange={(e) => setCategoryName(e.target.value)}
               />
            </div>
            <div className="">
               <button
                  className="imp-party-btn"
                  onClick={() => {
                     handleSave();
                  }}
               >
                  Create
               </button>
            </div>
         </div>
      </div>
   );
}
