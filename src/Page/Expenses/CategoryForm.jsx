import css from "../Items/edit.module.css";
import {
  CloseIcon,
  DeleteIcon,
  BasicSpinnerIcon,
} from "../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddExpenseCategory } from "../../Redux/expenses/actions";

const CategoryForm = ({
  usedAsEditForm = false,
  setShowForm,
  clickedItem = {},
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const loadingUpdate = useSelector((state) => state.ItemReducer.loadingUpdate);
  const loadingDelete = useSelector((state) => state.ItemReducer.loadingDelete);
  const loadingAddCategory = useSelector(
    (state) => state.ExpenseReducer.loadingAddCategory
  );
  const [formData, setFormData] = useState({
    expName: "",
    expType: "Indirect Expense",
  });

  useEffect(() => {
    if (usedAsEditForm) {
      setFormData((prev) => {
        return { ...prev, ...clickedItem };
      });
    }
  }, []);

  // Delete Category
  const handleDelete = () => {
    // DeleteCategory(dispatch, formData?._id, setShowForm, toast);
  };

  //   Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData?.expName) {
      if (usedAsEditForm) {
        //   UpdateCategory(dispatch, formData?._id, formData, setShowForm, toast);
      } else {
        //  console.log("Category Data:", formData);
        AddExpenseCategory(dispatch, formData, setShowForm, toast);
      }
    } else {
      toast({ title: "Category Name cannot be empty!", status: "warning" });
    }
  };

  return (
    <div onClick={() => setShowForm(false)} className={css.Overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.OuterEditProfile}
      >
        {/* Top Nav */}
        <div className={css.topNavDiv}>
          <h2>{usedAsEditForm ? "Edit" : "Add"} Expenses Category</h2>
          <CloseIcon onClick={() => setShowForm(false)} />
        </div>

        {/* FormInputs */}
        <div className={css.actualFormContDiv}>
          <div className={css.TopSectionInputOuter}>
            <div className={css.rightSideTopDivOuter}>
              <div>
                <label>
                  Category Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="expName"
                  value={formData?.expName}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: e.target.value,
                      };
                    })
                  }
                  placeholder="Category name"
                  required
                />
              </div>

              <div>
                <label>
                  Expense Type <span style={{ color: "red" }}>*</span>
                </label>

                <select
                  name="expType"
                  value={formData?.expType}
                  onChange={(e) =>
                    setFormData((prev) => {
                      return {
                        ...prev,
                        [e.target.name]: e.target.value,
                      };
                    })
                  }
                >
                  <option value="Direct Expense">Direct Expense</option>
                  <option value="Indirect Expense">Indirect Expense</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={css.footerDivOuter}>
          {usedAsEditForm && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loadingDelete}
              id={css.deleteBtn}
            >
              {loadingDelete ? <BasicSpinnerIcon /> : <DeleteIcon />}
            </button>
          )}
          {usedAsEditForm ? (
            <button onClick={handleSubmit} disabled={loadingUpdate}>
              {loadingUpdate ? "Updating..." : "Update"}
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loadingAddCategory}>
              {loadingAddCategory ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
