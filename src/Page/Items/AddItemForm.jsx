import css from "./AddItem.module.css";
import { AddItem, GetAllCategories } from "../../Redux/items/actions";
import { SettingsIconFilled, CrossIcon } from "../../assets/Icons/ReactIcons";

import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AddItemForm = ({ CloseForm, OpenSettings }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const categoriesList = useSelector((store) => store.ItemReducer.category);
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const [formData, setFormData] = useState({
    itemName: "",
    itemHsn: "",

    category: "",
    itemCode: "",
    description: "",
    seleteUnit: { baseUnit: "", secondaryUnit: "" },
    salePrice: {
      salePrice: "",
      tax: false,
      disOnSale: "",
      discountType: "",
    },
    wholesalePrice: {
      wholesalePrice: "",
      tax: false,
      minimumWholesaleQty: "",
    },
    purchasePrice: { purchasePrice: "", tax: false },
    taxRate: "",
    stock: {
      openingQuantity: "",
      atPrice: "",
      asOfDate: new Date().toISOString().split("T")[0],
      minStockToMaintain: "",
      location: "",
    },
    // tracking: {
    //   type: "",
    //   // enum:["Batch Tracking","Serial No. Tracking"]
    // },
    // mrp: {
    //   mrp: 0,
    //   disOnMrpForSalePersent: "",
    //   disOnMrpForWholesalePersent: "",
    // },
    // manufacturing: {
    //   rawMaterial: [
    //     {
    //       rawMaterial: "",
    //       quanity: "",
    //       unit: "",
    //       priceperUnit: "",
    //       estimateCost: "",
    //       total: "",
    //     },
    //   ],
    //   additionalCost: [
    //     {
    //       cahrges: "",
    //       estimateCost: "",
    //       totalEstimateCost: "",
    //     },
    //   ],
    // },
  });

  //   For fetching Categories List
  useEffect(() => {
    GetAllCategories(dispatch);
  }, []);

  // Input change handler
  const handleInpChange = (e) => {
    const { name, value } = e.target;
    if (name == "seleteUnit") {
      const seletedUnit = { baseUnit: value, secondaryUnit: value };
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: seletedUnit,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  //   Submit Function
  const handleSubmit = (e) => {
    console.log("Add Item Data", formData);
    // AddItem(dispatch, formData, CloseForm, toast);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        CloseForm(false);
      }}
      className={css.FormOuterParent}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className={css.actualFormOuter}
      >
        {/* Header */}
        <div className={css.formHeaderOuterDiv}>
          <h3>Add Item</h3>
          <div>
            <SettingsIconFilled onClick={() => OpenSettings(true)} />
            <CrossIcon onClick={() => CloseForm(false)} />
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
            {/* Select Unit */}
            <div className={css.inputDiv}>
              <input
                type="text"
                name="seleteUnit"
                value={formData?.seleteUnit?.baseUnit}
                onChange={handleInpChange}
                className={css.input}
                list="unitsList"
              />
              <label
                className={
                  formData?.seleteUnit?.baseUnit
                    ? css.activeLabel
                    : css.inactiveLabel
                }
              >
                Select Unit
              </label>
              <datalist id="unitsList">
                <option value="">Select Unit</option>
                <option value="BAGS">BAGS (BAG)</option>
                <option value="BOTTLES">BOTTLES (BTL)</option>
                <option value="BOX">BOX (BOX)</option>
                <option value="BUNDLES">BUNDLES (BUNDLE)</option>
                <option value="CANS">CANS (CAN)</option>
                <option value="CARTONS">CARTONS (CTN)</option>
                <option value="DOZENS">DOZENS (DZN)</option>
                <option value="GRAMMES">GRAMMES (GM)</option>
                <option value="KILOGRAMS">KILOGRAMS (KG)</option>
                <option value="LITRE">LITRE (LTR)</option>
                <option value="METERS">METERS (MTR)</option>
                <option value="MILILITRE">MILILITRE (ML)</option>
                <option value="NUMBERS">NUMBERS (NOS)</option>
                <option value="PACKS">PACKS (PAC)</option>
                <option value="PAIRS">PAIRS (PRS)</option>
                <option value="PIECES">PIECES (PCS)</option>
                <option value="QUINTAL">QUINTAL (QTL)</option>
                <option value="ROLLS">ROLLS (ROL)</option>
                <option value="SQUARE FEET">SQUARE FEET (SQF)</option>
                <option value="SQUARE METERS">SQUARE METERS (SQM)</option>
                <option value="TABLETS">TABLETS (TBS)</option>
              </datalist>
            </div>
          </div>
          <div className={css.upperInpCont}>
            {/* Category */}
            <div className={css.inputDiv}>
              <input
                type="text"
                name="seleteUnit"
                value={formData?.seleteUnit?.baseUnit}
                onChange={handleInpChange}
                className={css.input}
                list="cateList"
              />
              <label
                className={
                  formData?.seleteUnit?.baseUnit
                    ? css.activeLabel
                    : css.inactiveLabel
                }
              >
                Category
              </label>
              <datalist id="cateList">
                <option value="">Loading Categories</option>
                {isLoading ? (
                  <option value="">Loading Categories</option>
                ) : (
                  categoriesList?.map((item, ind) => (
                    <option value={item._id} key={ind + item._id}>
                      {item?.categoryName}
                    </option>
                  ))
                )}
              </datalist>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={css.footerOuter}>
          <button
            type="submit"
            style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            disabled={isLoading}
            className={css.saveBtn}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
