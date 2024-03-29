// import "../../styles/Items.css";
import css from "../../Page/Items/edit.module.css";

import { AddNewCategory } from "../../Redux/items/actions";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { IoMdClose as CloseIcon } from "react-icons/io";

export default function CategoryForm(Props) {
  const toast = useToast();
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  const closeForm = () => {
    //  console.log("Working");
    Props.func(false);
  };

  const handleSave = () => {
    // console.log(categoryName);
    const data = { categoryName: categoryName };
    AddNewCategory(dispatch, data, closeForm, toast);
  };

  return (
    <div onClick={() => closeForm()} className={css.Overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.OuterEditProfile}
      >
        {/* Top Nav */}
        <div className={css.topNavDiv}>
          <h2>Add Category</h2>
          <CloseIcon onClick={() => closeForm()} />
        </div>

        {/* FormInputs */}
        <div className={css.actualFormContDiv}>
          <div className={css.TopSectionInputOuter}>
            <div className={css.rightSideTopDivOuter}>
              <div>
                <label htmlFor="#">
                  Category Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  onChange={(e) => setCategoryName(e.target.value)}
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
          <button type="submit" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
