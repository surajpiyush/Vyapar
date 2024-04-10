import css from "../Items/AddItem.module.css";
import CategoryForm from "./CategoryForm";
import {
  AddItem,
  GetAllUnits,
  GetAllCategories,
  UpdateItem,
  DeleteItem,
} from "../../Redux/items/actions";
import {
  CrossIcon,
  PlusIconThin,
  MinusCircleIcon,
} from "../../assets/Icons/ReactIcons";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { AddExpenseItem } from "../../Redux/expenses/actions";

const ItemForm = ({
  setShowForm,
  usedAsEditForm = false,
  clickedItemData = {},
}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const loadingAddItem = useSelector(
    (store) => store.ExpenseReducer.loadingAddItem
  );
  const loadingDelete = useSelector((store) => store.ItemReducer.loadingDelete);
  const loadingUpdate = useSelector((store) => store.ItemReducer.loadingUpdate);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    itemHsn: "",
    price: "",
    tax: false,
    taxRate: "",
  });

  useEffect(() => {
    if (usedAsEditForm) {
      setFormData((prev) => {
        return { ...prev, ...clickedItemData };
      });
    }
    // console.log("clickedItemData", clickedItemData);
  }, []);

  // Input change handler
  const handleInpChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //   Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loadingAddItem && formData?.itemName) {
      let ItemData = {
        ...formData,
        price: Number(formData?.price)
          ? Number(formData?.price)
          : formData?.price,
        tax: formData?.tax == "true",
      };

      if (usedAsEditForm) {
        // UpdateItem(dispatch, ItemData?._id, ItemData, setShowForm, toast);
        toast({ title: "Server Under Work", status: "info" });
      } else {
        AddExpenseItem(dispatch, ItemData, setShowForm, toast);
      }
      console.log("Add Expense Item Data", ItemData);
    } else {
      toast({ title: "Item Name cannot be Empty", status: "warning" });
    }
  };

  //   Delete Item Function
  const handleDelete = () => {
    //  DeleteItem(dispatch, formData?._id, setShowForm, toast);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowForm(false);
      }}
      className={css.FormOuterParent}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={css.actualFormOuter}
      >
        {/* Header */}
        <div className={css.formHeaderOuterDiv}>
          <h3>{usedAsEditForm ? "Edit" : "Add"} Expense Item</h3>
          <div>
            <CrossIcon onClick={() => setShowForm(false)} />
          </div>
        </div>

        {/* Middle  */}
        <div className={css.middleOuter}>
          <div className={css.upperInpCont}>
            {/* Item Name */}
            <div className={css.inputDiv}>
              <input
                type="text"
                name="itemName"
                value={formData?.itemName}
                onChange={handleInpChange}
                className={css.input}
                required
              />
              <label
                className={
                  formData?.itemName ? css.activeLabel : css.inactiveLabel
                }
              >
                Item Name*
              </label>
            </div>
            {/* Item HSN */}
            <div className={css.inputDiv}>
              <input
                type="number"
                name="itemHsn"
                value={formData?.itemHsn}
                onChange={handleInpChange}
                className={css.input}
              />
              <label
                className={
                  formData?.itemHsn ? css.activeLabel : css.inactiveLabel
                }
              >
                Item HSN
              </label>
            </div>
          </div>

          <div
            style={{
              color: "var(--blueB)",
              borderColor: "var(--blueB)",
            }}
            className={css.singleChangeItemDiv}
          >
            Pricing
          </div>

          <div style={{ marginTop: "25px" }} className={css.PricingLowerDiv}>
            {/* Price */}
            <div className={css.attachedInpConts}>
              <div className={css.inputDiv}>
                <input
                  type="number"
                  name="price"
                  value={formData?.price}
                  onChange={handleInpChange}
                  className={css.input}
                />
                <label
                  className={
                    formData?.price ? css.activeLabel : css.inactiveLabel
                  }
                >
                  Price
                </label>
              </div>
              <div className={css.inputDiv}>
                <select
                  name="tax"
                  value={formData?.tax}
                  onChange={handleInpChange}
                  className={css.input}
                >
                  <option value={false}>Without Tax</option>
                  <option value={true}>With Tax</option>
                </select>
              </div>
            </div>

            <div className={css.inputDiv}>
              <select
                name="taxRate"
                value={formData?.taxRate}
                onChange={handleInpChange}
                style={{ width: "230px", borderRadius: "5px" }}
                className={css.input}
              >
                <option value="">None</option>
                <option value="IGST@0">IGST@0%</option>
                <option value="GST@0">GST@0%</option>
                <option value="IGST@0.25">IGST@0.25%</option>
                <option value="GST@0.25">GST@0.25%</option>
                <option value="IGST@3">IGST@3%</option>
                <option value="GST@3">GST@3%</option>
                <option value="IGST@5">IGST@5%</option>
                <option value="GST@5">GST@5%</option>
                <option value="IGST@12">IGST@12%</option>
                <option value="GST@12">GST@12%</option>
                <option value="IGST@18">IGST@18%</option>
                <option value="GST@18">GST@18%</option>
                <option value="IGST@28">IGST@28%</option>
                <option value="GST@28">GST@28%</option>
              </select>
              <label className={css.activeLabel}>Taxes</label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={css.footerOuter}>
          {usedAsEditForm ? (
            <button
              type="button"
              onClick={handleSubmit}
              style={{ cursor: loadingUpdate ? "not-allowed" : "pointer" }}
              disabled={loadingUpdate}
              className={css.saveBtn}
            >
              {loadingUpdate ? "Updating..." : "Update"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              style={{ cursor: loadingAddItem ? "not-allowed" : "pointer" }}
              disabled={loadingAddItem}
              className={css.saveBtn}
            >
              {loadingAddItem ? "Saving..." : "Save"}
            </button>
          )}

          {usedAsEditForm && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loadingDelete}
              id={css.deleteBtn}
            >
              {loadingDelete ? <SpinnerIcon /> : <DeleteIcon />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
