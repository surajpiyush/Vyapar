import css from "./FormItemsRowTable.module.css";
import { MoveIcon, DeleteIcon3 } from "../assets/Icons/ReactIcons";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Menu, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";

const FormItemsRowTable = ({
  ind,
  item,
  tableRowsArr,
  setTableRowsArr,
  activeRowIndex,
  setActiveRowIndex,
  showItemsListMenu,
  setShowItemsListMenu,
  setShowAddItemsForm,
  stateChanged = false,
}) => {
  const loadingAllItems = useSelector(
    (state) => state.ItemReducer.getAllItemsLoading
  );
  const itemsList = useSelector((state) => state.ItemReducer.items);

  const [foundItems, setFoundItems] = useState([]);

  // Itemslist Suggestions
  useEffect(() => {
    const regex = new RegExp(item?.mainName, "i");
    const itemsArr = Array.isArray(itemsList) ? itemsList : [];
    const found = itemsArr?.filter((ite) => regex.test(ite?.itemName));
    if (item?.mainName.length < 1) {
      return setFoundItems(itemsArr);
    }
    setFoundItems(found);
  }, [item?.mainName, itemsList]);

  //   Calculator useEffect
  useEffect(() => {
    const { amount, taxAmount, discountPercent, discountAmount } =
      Calculator(item);
    let currSaleItem = {
      ...tableRowsArr[ind],
      amount,
      taxAmount,
      discountAmount,
      discountpersant: discountPercent,
    };
    let newSaleData = tableRowsArr.map((ite, index) =>
      index == ind ? currSaleItem : ite
    );
    setTableRowsArr(newSaleData);
  }, [
    item?.qty,
    item?.priceUnit,
    item?.discountpersant,
    item?.discountpersant,
    item?.taxPersant,
    stateChanged,
  ]);

  // Inputs Change Function
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    let currSaleItem = { ...tableRowsArr[index], [name]: value };
    let newSaleData = tableRowsArr.map((ite, ind) =>
      ind == index ? currSaleItem : ite
    );
    setTableRowsArr(newSaleData);
  };

  useEffect(() => {
    if (stateChanged) {
      item.taxPersant = `I${item.taxPersant}`;
    }
    // console.log(item.taxPersant)
  }, [stateChanged]);

  // Found items list click handler
  const handleMenuItemClick = (itemDetail) => {
    // console.log("itemDetails", itemDetail);

    let currSaleItem = {
      ...tableRowsArr[ind],
      itemName: itemDetail?._id,
      mainName: itemDetail?.itemName,
      taxPersant: stateChanged
        ? `I${itemDetail?.taxRate.split("%")[0] || ""}`
        : itemDetail?.taxRate.split("%")[0] || "",
      // qty: itemDetail?.stock?.openingQuantity || 0,
      priceUnit: itemDetail?.stock?.atPrice || 0,
      unit: itemDetail?.seleteUnit?.baseUnit || "",
      itemHsn: itemDetail?.itemHsn || "",
    };
    // console.log("itemDetail", currSaleItem.taxPersant);
    let newSaleData = tableRowsArr?.map((ite, index) =>
      ind == index ? currSaleItem : ite
    );
    setTableRowsArr(newSaleData);
    setShowItemsListMenu(false);
  };

  //   Delete Row Function
  const handleDeleteRow = (e) => {
    e.stopPropagation();
    const deletedRowdata = tableRowsArr?.filter(
      (_, rowIndex) => rowIndex != ind
    );
    setTableRowsArr(deletedRowdata);
  };
  // console.log(item.taxPersant)
  return (
    <tr
      onClick={() => setActiveRowIndex(ind)}
      style={{
        background: ind % 2 == 0 ? "var(--greyishBlue)" : "var(--greyB)",
      }}
    >
      <td
        className={css.serialNumberBody}
        onClick={() => setActiveRowIndex(ind)}
      >
        <div>
          <MoveIcon className={css.serialIconsBody} />
          <p>{ind + 1}</p>
          <DeleteIcon3
            onClick={handleDeleteRow}
            className={css.serialIconsBody}
          />
        </div>
      </td>
      <td
        onFocus={() => {
          setShowItemsListMenu(true);
          setActiveRowIndex(ind);
        }}
        onBlur={() => {
          setShowItemsListMenu(false);
        }}
        onClick={() => setActiveRowIndex(ind)}
        className={css.itemNameBody}
      >
        <input
          type="text"
          name="mainName"
          value={item?.mainName}
          onChange={(e) => {
            handleInputChange(e, ind);
          }}
          onBlur={() => {
            setShowItemsListMenu(false);
          }}
          className={css.tableInputs}
          required
        />
        <Menu isOpen={ind == activeRowIndex && showItemsListMenu}>
          <MenuList
            style={{
              marginTop: `${foundItems.length > 0 ? 240 : 160}px`,
              maxHeight: "150px",
              marginLeft: "180px",
              zIndex: 2500,
              overflow: "auto",
              position: "absolute",
            }}
            onClick={() => setShowItemsListMenu(true)}
          >
            <MenuItem onClick={() => setShowAddItemsForm(true)}>
              Add Item
            </MenuItem>
            <MenuDivider />
            {loadingAllItems && (
              <MenuItem style={{ color: "green" }}>Loading Items</MenuItem>
            )}
            {!loadingAllItems && foundItems.length <= 0 && (
              <MenuItem style={{ color: "red" }}>No Items Found!</MenuItem>
            )}
            {!loadingAllItems &&
              foundItems?.map((foundItem) => (
                <MenuItem
                  key={foundItem?._id}
                  onClick={() => {
                    handleMenuItemClick(foundItem);
                  }}
                >
                  {foundItem?.itemName} ({foundItem?.stock?.openingQuantity})
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </td>
      <td className={css.qtyBody} onClick={() => setActiveRowIndex(ind)}>
        <input
          type="number"
          name="qty"
          // value={item?.qty}
          onChange={(e) => handleInputChange(e, ind)}
          placeholder="0"
          className={css.tableInputs}
          required
        />
      </td>
      <td className={css.unitBody} onClick={() => setActiveRowIndex(ind)}>
        <select
          name="unit"
          value={item.unit}
          onChange={(e) => handleInputChange(e, ind)}
          placeholder="None"
          required
        >
          <option value="">None</option>
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
        </select>
      </td>
      <td className={css.qtyBody} onClick={() => setActiveRowIndex(ind)}>
        <input
          type="number"
          name="priceUnit"
          value={item.priceUnit}
          onChange={(e) => handleInputChange(e, ind)}
          placeholder="0"
          className={css.tableInputs}
          required
        />
      </td>
      <td className={css.DiscountBody} onClick={() => setActiveRowIndex(ind)}>
        <input
          type="number"
          name="discountpersant"
          value={Calculator(item)?.discountPercent}
          onChange={(e) => handleInputChange(e, ind)}
          placeholder="0"
          className={css.tableInputs}
        />
        <input
          type="number"
          name="discountAmount"
          value={Calculator(item)?.discountAmount}
          onChange={(e) => handleInputChange(e, ind)}
          placeholder="0"
          className={css.tableInputs}
        />
      </td>
      <td className={css.ItemTaxBody} onClick={() => setActiveRowIndex(ind)}>
        <span>
          <div>
            <select
              name="taxPersant"
              value={item.taxPersant}
              onChange={(e) => handleInputChange(e, ind)}
            >
              {stateChanged ? (
                <>
                  <option value="">None</option>
                  <option value="IGST@0">IGST@0%</option>
                  <option value="IGST@0.25">IGST@0.25%</option>
                  <option value="IGST@3">IGST@3%</option>
                  <option value="IGST@5">IGST@5%</option>
                  <option value="IGST@12">IGST@12%</option>
                  <option value="IGST@18">IGST@18%</option>
                  <option value="IGST@28">IGST@28%</option>
                </>
              ) : (
                <>
                  <option value="">None</option>
                  <option value="GST@0">GST@0%</option>
                  <option value="GST@0.25">GST@0.25%</option>
                  <option value="GST@3">GST@3%</option>
                  <option value="GST@5">GST@5%</option>
                  <option value="GST@12">GST@12%</option>
                  <option value="GST@18">GST@18%</option>
                  <option value="GST@28">GST@28%</option>
                </>
              )}
            </select>
          </div>
          <input
            type="number"
            value={Calculator(item)?.taxAmount}
            name="taxAmount"
            onChange={(e) => handleInputChange(e, item)}
            placeholder="0"
            className={css.tableInputs}
            readOnly
            disabled
          />
        </span>
      </td>
      <td className={css.qtyBody} onClick={() => setActiveRowIndex(ind)}>
        <input
          type="number"
          value={Calculator(item)?.amount}
          name="amount"
          onChange={(e) => handleInputChange(e, ind)}
          placeholder="0"
          className={css.tableInputs}
          readOnly
          disabled
        />
      </td>
    </tr>
  );
};
export default FormItemsRowTable;

// Calculator Function
const Calculator = (item) => {
  //  console.log(item);
  const parseToNumber = (value) => (value ? parseFloat(value) : 0);

  let amount = parseToNumber(item?.amount) || 0;
  let taxAmount = parseToNumber(item?.taxAmount) || 0;
  let discountPercent = parseToNumber(item?.discountpersant) || 0;
  let discountAmount = parseToNumber(item?.discountAmount) || 0;
  let taxPercent = 0;

  if (item && item.taxPersant) {
    const parts = item.taxPersant.split("@");
    if (parts.length === 2) {
      const numericValue = parseFloat(parts[1].trim());
      if (!isNaN(numericValue)) {
        taxPercent = numericValue;
      }
    }
  }
  let pricePerUnit = parseToNumber(item?.priceUnit) || 0;
  let qty = parseToNumber(item?.qty) || 0;

  amount = qty * pricePerUnit;

  if (discountPercent > 0) {
    discountAmount = (amount * discountPercent) / 100;
    amount -= discountAmount;
  } else if (discountAmount > 0) {
    discountPercent = (discountAmount / amount) * 100;
    amount -= discountAmount;
  }

  if (taxPercent > 0) {
    taxAmount = (amount * taxPercent) / 100;
    amount += taxAmount;
  } else if (taxPercent == 0) {
    taxAmount = 0;
    amount += taxAmount;
  } else if (taxAmount > 0) {
    taxPercent = (taxAmount / amount) * 100;
    amount += taxAmount;
  }

  return {
    amount:
      parseFloat(amount.toFixed(2)) == 0 ? "" : parseFloat(amount.toFixed(2)),
    taxAmount:
      parseFloat(taxAmount.toFixed(2)) == 0
        ? ""
        : parseFloat(taxAmount.toFixed(2)),
    discountPercent:
      parseFloat(discountPercent.toFixed(2)) == 0
        ? ""
        : parseFloat(discountPercent.toFixed(2)),
    discountAmount:
      parseFloat(discountAmount.toFixed(2)) == 0
        ? ""
        : parseFloat(discountAmount.toFixed(2)),
  };
};
