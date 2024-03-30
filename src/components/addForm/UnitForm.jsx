import css from "../../Page/Items/edit.module.css";
import { AddNewUnit, DeleteUnit, UpdateUnit } from "../../Redux/items/actions";
import {
  CloseIcon,
  DeleteIcon,
  BasicSpinnerIcon,
} from "../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UnitForm({
  func,
  editUnitData = {},
  usedAsEditForm = false,
}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const loadingUpdate = useSelector((state) => state.ItemReducer.loadingUpdate);
  const loadingDelete = useSelector((state) => state.ItemReducer.loadingDelete);
  const loadingAddUnit = useSelector(
    (state) => state.ItemReducer.loadingAddUnit
  );
  const [formData, setFormData] = useState({
    unitName: "",
    shortName: "",
  });

  useEffect(() => {
    if (usedAsEditForm) {
      setFormData((prev) => {
        return { ...prev, ...editUnitData };
      });
    }
  }, []);

  //   Input Change Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeForm = () => {
    func(false);
  };

  //   Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (usedAsEditForm) {
      if (!loadingUpdate) {
        // console.log("Update Unit Data:", formData);
        UpdateUnit(dispatch, formData?._id, formData, closeForm, toast);
      }
    } else {
      if (!loadingAddUnit) {
        // console.log("Add Unit Data:", formData);
        AddNewUnit(dispatch, formData, closeForm, toast);
      }
    }
  };

  //   Delete Item Function
  const handleDelete = () => {
    DeleteUnit(dispatch, formData?._id, closeForm, toast);
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
          <h3>{usedAsEditForm ? "Edit" : "Add"} Unit</h3>
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
                  name="unitName"
                  value={formData?.unitName}
                  onChange={handleChange}
                  placeholder="Unit Name"
                  style={{ width: "93%" }}
                  className="inp-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="#">
                  Short Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="shortName"
                  value={formData?.shortName}
                  onChange={handleChange}
                  placeholder="Short Name"
                  style={{ width: "93%" }}
                  className="inp-field"
                  required
                />
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
            <button type="submit" disabled={loadingUpdate}>
              {loadingUpdate ? "Updating..." : "Update"}
            </button>
          ) : (
            <button type="submit" disabled={loadingAddUnit}>
              {loadingAddUnit ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
