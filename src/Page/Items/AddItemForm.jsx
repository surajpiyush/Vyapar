import css from "./AddItem.module.css";
import { GetAllUnits, GetAllCategories } from "../../Redux/items/actions";
import {
  SettingsIconFilled,
  CrossIcon,
  MinusCircleIcon,
} from "../../assets/Icons/ReactIcons";

import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AddItemForm = ({ CloseForm, OpenSettings }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const newUnitAddedToggle = useSelector(
    (store) => store.ItemReducer.newUnitAddedToggle
  );
  const unitsList = useSelector((store) => store.ItemReducer.unit);
  const loadingGetAllUnits = useSelector(
    (store) => store.ItemReducer.loadingGetAllUnits
  );
  const newCategoryAddedToggle = useSelector(
    (store) => store.ItemReducer.newCategoryAddedToggle
  );
  const loadingGetAllCategories = useSelector(
    (store) => store.ItemReducer.loadingGetAllCategories
  );
  const categoriesList = useSelector((store) => store.ItemReducer.category);
  const [currInps, setCurrInps] = useState("Pricing");
  const [showWholeSalePrice, setShowWholeSalePrice] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemHsn: "",
    seleteUnit: { baseUnit: "", secondaryUnit: "" },
    category: "",
    itemCode: "",
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
  });

  //   for fetching Units List
  useEffect(() => {
    GetAllUnits(dispatch);
  }, [newUnitAddedToggle]);

  //   for fetching Categories List
  useEffect(() => {
    GetAllCategories(dispatch);
  }, [newCategoryAddedToggle]);

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
    e.preventDefault();
    if (!isLoading) {
      console.log("Add Item Data", formData);
      // AddItem(dispatch, formData, CloseForm, toast);
    }
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
              <select
                name="seleteUnit"
                value={formData?.seleteUnit?.baseUnit}
                onChange={handleInpChange}
                className={css.selectTag}
              >
                {loadingGetAllUnits ? (
                  <>
                    <option value="">Loading Units</option>
                  </>
                ) : (
                  <>
                    <option value="">None</option>
                    {unitsList?.map((item) => (
                      <option value={item?.unitName} key={item?.id}>
                        {item?.unitName}
                      </option>
                    ))}
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
                  </>
                )}
              </select>
              <label
                className={
                  formData?.seleteUnit?.baseUnit
                    ? css.activeSelectLabel
                    : css.inactiveSelectLabel
                }
              >
                Unit
              </label>
            </div>
          </div>
          <div className={css.upperInpCont}>
            {/* Category */}
            <div className={css.inputDiv}>
              <select
                name="seleteUnit"
                value={formData?.seleteUnit?.baseUnit}
                onChange={handleInpChange}
                className={css.selectTag}
              >
                {loadingGetAllUnits ? (
                  <>
                    <option value="">Loading Units</option>
                  </>
                ) : (
                  <>
                    <option value="">None</option>
                    {unitsList?.map((item) => (
                      <option value={item?.unitName} key={item?.id}>
                        {item?.unitName}
                      </option>
                    ))}
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
                  </>
                )}
              </select>
              <label
                className={
                  formData?.seleteUnit?.baseUnit
                    ? css.activeSelectLabel
                    : css.inactiveSelectLabel
                }
              >
                Category
              </label>
            </div>
            {/* Item Code */}
            <div className={css.inputDiv}>
              <input
                type="number"
                name="itemCode"
                value={formData?.itemCode}
                onChange={handleInpChange}
                className={css.input}
              />
              <label
                className={
                  formData?.itemCode ? css.activeLabel : css.inactiveLabel
                }
              >
                Item Code
              </label>
            </div>
          </div>

          {/* Changer */}
          <div className={css.changerOuter}>
            <div
              style={{
                color: currInps == "Pricing" ? "var(--redD)" : "var(--greyH)",
                borderColor:
                  currInps == "Pricing" ? "var(--redD)" : "transparent",
              }}
              onClick={() => setCurrInps("Pricing")}
              className={css.singleChangeItemDiv}
            >
              Pricing
            </div>
            <div
              style={{
                color: currInps == "Stock" ? "var(--redD)" : "var(--greyH)",
                borderColor:
                  currInps == "Stock" ? "var(--redD)" : "transparent",
              }}
              onClick={() => setCurrInps("Stock")}
              className={css.singleChangeItemDiv}
            >
              Stock
            </div>
          </div>

          {currInps == "Pricing" ? (
            // Pricing
            <div>
              <div className={css.PricingUpperDiv}>
                <h3>Sale Price</h3>
                <div className={css.rowInpCont}>
                  {/* Sale Price */}
                  <div className={css.attachedInpConts}>
                    <div className={css.inputDiv}>
                      <input
                        type="number"
                        name="salePrice"
                        value={formData?.salePrice?.salePrice}
                        onChange={handleInpChange}
                        className={css.input}
                      />
                      <label
                        className={
                          formData?.salePrice?.salePrice
                            ? css.activeLabel
                            : css.inactiveLabel
                        }
                      >
                        Sale Price
                      </label>
                    </div>
                    <div className={css.inputDiv}>
                      <select
                        name="tax"
                        value={formData?.salePrice?.tax}
                        onChange={handleInpChange}
                        className={css.input}
                      >
                        <option value={false}>Without Tax</option>
                        <option value={true}>With Tax</option>
                      </select>
                    </div>
                  </div>
                  {/* Discount On Sale Price */}
                  <div className={css.attachedInpConts}>
                    <div className={css.inputDiv}>
                      <input
                        type="number"
                        name="salePrice"
                        value={formData?.salePrice?.salePrice}
                        onChange={handleInpChange}
                        style={{ width: "140px" }}
                        className={css.input}
                      />
                      <label
                        className={
                          formData?.salePrice?.salePrice
                            ? css.activeLabel
                            : css.inactiveLabel
                        }
                      >
                        Disc. On Sale Price
                      </label>
                    </div>
                    <div className={css.inputDiv}>
                      <select
                        name="tax"
                        value={formData?.salePrice?.tax}
                        onChange={handleInpChange}
                        className={css.input}
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="Amount">Amount</option>
                      </select>
                    </div>
                  </div>
                </div>
                {showWholeSalePrice ? (
                  <div className={css.hideWholeSaleCss}>
                    WholeSale Price
                    <span onClick={() => setShowWholeSalePrice(false)}>
                      <MinusCircleIcon /> Remove
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowWholeSalePrice(true)}
                    className={css.showWholeSaleCss}
                  >
                    + Add Wholesale Price
                  </div>
                )}
                {showWholeSalePrice && (
                  <div className={css.rowInpCont}>
                    {/* Wholesale Price */}
                    <div className={css.attachedInpConts}>
                      <div className={css.inputDiv}>
                        <input
                          type="number"
                          name="wholesalePrice"
                          value={formData?.wholesalePrice?.wholesalePrice}
                          onChange={handleInpChange}
                          style={{ width: "125px" }}
                          className={css.input}
                        />
                        <label
                          className={
                            formData?.wholesalePrice?.wholesalePrice
                              ? css.activeLabel
                              : css.inactiveLabel
                          }
                        >
                          Wholesale Price
                        </label>
                      </div>
                      <div className={css.inputDiv}>
                        <select
                          name="tax"
                          value={formData?.salePrice?.tax}
                          onChange={handleInpChange}
                          className={css.input}
                        >
                          <option value={false}>Without Tax</option>
                          <option value={true}>With Tax</option>
                        </select>
                      </div>
                    </div>
                    {/*  Minimum Wholesale Qty */}
                    <div className={css.attachedInpConts}>
                      <div className={css.inputDiv}>
                        <input
                          type="number"
                          name="minimumWholesaleQty"
                          value={formData?.wholesalePrice?.minimumWholesaleQty}
                          onChange={handleInpChange}
                          style={{ width: "235px", borderRadius: "5px" }}
                          className={css.input}
                        />
                        <label
                          className={
                            formData?.wholesalePrice?.minimumWholesaleQty
                              ? css.activeLabel
                              : css.inactiveLabel
                          }
                        >
                          Minimum Wholesale Qty
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={css.PricingLowerDiv}>
                {/* Purchase Price */}
                <div className={css.lowerDivOuterInpConts}>
                  <h3>Purchase Price</h3>
                  <div className={css.rowInpCont}>
                    {/* Purchase Price */}
                    <div className={css.attachedInpConts}>
                      <div className={css.inputDiv}>
                        <input
                          type="number"
                          name="purchasePrice"
                          value={formData?.purchasePrice?.purchasePrice}
                          onChange={handleInpChange}
                          className={css.input}
                        />
                        <label
                          className={
                            formData?.purchasePrice?.purchasePrice
                              ? css.activeLabel
                              : css.inactiveLabel
                          }
                        >
                          Purchase Price
                        </label>
                      </div>
                      <div className={css.inputDiv}>
                        <select
                          name="tax"
                          value={formData?.purchasePrice?.tax}
                          onChange={handleInpChange}
                          className={css.input}
                        >
                          <option value={false}>Without Tax</option>
                          <option value={true}>With Tax</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Taxes */}
                <div className={css.lowerDivOuterInpConts}>
                  <h3>Taxes</h3>
                  <div className={css.rowInpCont}>
                    <div className={css.attachedInpConts}>
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
                </div>
              </div>
            </div>
          ) : (
            // Stock
            <div style={{ paddingBottom: "22.5px" }}>
              <div className={css.upperInpCont}>
                {/* Opening Quantity */}
                <div className={css.inputDiv}>
                  <input
                    type="number"
                    name="openingQuantity"
                    value={formData?.stock?.openingQuantity}
                    onChange={handleInpChange}
                    className={css.input}
                  />
                  <label
                    className={
                      formData?.stock?.openingQuantity
                        ? css.activeLabel
                        : css.inactiveLabel
                    }
                  >
                    Opening Quantity
                  </label>
                </div>
                {/* At Price */}
                <div className={css.inputDiv}>
                  <input
                    type="number"
                    name="atPrice"
                    value={formData?.stock?.atPrice}
                    onChange={handleInpChange}
                    className={css.input}
                  />
                  <label
                    className={
                      formData?.stock?.atPrice
                        ? css.activeLabel
                        : css.inactiveLabel
                    }
                  >
                    At Price
                  </label>
                </div>
                {/* As Of Date */}
                <div className={css.inputDiv}>
                  <input
                    type="date"
                    name="asOfDate"
                    value={formData?.stock?.asOfDate}
                    onChange={handleInpChange}
                    className={css.input}
                  />
                  <label
                    className={
                      formData?.stock?.asOfDate
                        ? css.activeLabel
                        : css.inactiveLabel
                    }
                  >
                    As Of Date
                  </label>
                </div>
              </div>
              <div className={css.upperInpCont}>
                {/* Min Stock To Maintain */}
                <div className={css.inputDiv}>
                  <input
                    type="number"
                    name="minStockToMaintain"
                    value={formData?.stock?.minStockToMaintain}
                    onChange={handleInpChange}
                    className={css.input}
                    required
                  />
                  <label
                    className={
                      formData?.stock?.minStockToMaintain
                        ? css.activeLabel
                        : css.inactiveLabel
                    }
                  >
                    Min Stock To Maintain
                  </label>
                </div>
                {/* Location */}
                <div className={css.inputDiv}>
                  <input
                    type="text"
                    name="location"
                    value={formData?.stock?.location}
                    onChange={handleInpChange}
                    className={css.input}
                  />
                  <label
                    className={
                      formData?.stock?.location
                        ? css.activeLabel
                        : css.inactiveLabel
                    }
                  >
                    Location
                  </label>
                </div>
              </div>
            </div>
          )}
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
