import css from "../../Page/Items/edit.module.css";
import {
  AddNewCategory,
  DeleteCategory,
  UpdateCategory,
} from "../../Redux/items/actions";
import {
  CloseIcon,
  DeleteIcon,
  BasicSpinnerIcon,
} from "../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ExpenseCategoryForm({
  func,
  useAsUpdateForm = false,
  clickedItem = {},
}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const loadingUpdate = useSelector((state) => state.ItemReducer.loadingUpdate);
  const loadingDelete = useSelector((state) => state.ItemReducer.loadingDelete);
  const loadingAddCategory = useSelector(
    (state) => state.ItemReducer.loadingAddCategory
  );
  const [formData, setFormData] = useState({ categoryName: "" });

  useEffect(() => {
    if (useAsUpdateForm) {
      setFormData((prev) => {
        return { ...prev, ...clickedItem };
      });
    }
  }, []);

  const closeForm = () => {
    //  console.log("Working");
    func(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useAsUpdateForm) {
      UpdateCategory(dispatch, formData?._id, formData, func, toast);
    } else {
      AddNewCategory(dispatch, formData, closeForm, toast);
    }
  };

  // Delete Category
  const handleDelete = () => {
    DeleteCategory(dispatch, formData?._id, func, toast);
  };

  return (
    <div onClick={() => closeForm()} className={css.Overlay}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={css.OuterEditProfile}
      >
        {/* Top Nav */}
        <div className={css.topNavDiv}>
          <h2> {useAsUpdateForm ? "Edit" : "Add"} Category</h2>
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
                  type="text"
                  name="categoryName"
                  value={formData?.categoryName}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                  placeholder="Category name"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={css.footerDivOuter}>
          {useAsUpdateForm && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loadingDelete}
              id={css.deleteBtn}
            >
              {loadingDelete ? <BasicSpinnerIcon /> : <DeleteIcon />}
            </button>
          )}
          {useAsUpdateForm ? (
            <button type="submit" disabled={loadingUpdate}>
              {loadingUpdate ? "Updating..." : "Update"}
            </button>
          ) : (
            <button type="submit" disabled={loadingAddCategory}>
              {loadingAddCategory ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
