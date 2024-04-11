import css from "../../pages/sales/SalesForms.module.css";
import {
  DeleteIcon3,
  MoveIcon,
  PlusIconThin,
} from "../../assets/Icons/ReactIcons";

import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { Menu, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";

const WithOutGstItemRow = memo(
  ({
    ind,
    item,
    expenseItems,
    setExpenseItems,
    handleDeleteRow,
    handleMenuItemClick,
    showItemsListMenu,
    indexSaleItem,
    setShowItemsListMenu,
    setIndexSaleItem,
    setShowItemForm,
    items,
  }) => {
    const dispatch = useDispatch();
    const [foundItems, setFoundItems] = useState([]);
    const isLoading = useSelector((state) => state.ExpenseReducer.isLoading);
    const itemsList = useSelector((state) => state.ExpenseReducer.itemsData);

    useEffect(() => {
      const regex = new RegExp(item?.mainName, "i");
      const itemsArr = Array.isArray(itemsList) ? itemsList : [];
      const found = itemsArr?.filter((ite) => regex.test(ite?.itemName));
      if (item?.mainName && item?.mainName.length < 1) {
        return setFoundItems(items);
      }
      setFoundItems(found);
    }, [item?.mainName, itemsList]);

    // Sale Items Change Function
    const handleTableInputChange = (e, index) => {
      const { name, value } = e.target;
      let currSaleItem = {
        ...expenseItems[index],
        [name]: ["qty", "priceUnit", "amount"].includes(name)
          ? Number(value)
          : value,
      };
      let newSaleData = expenseItems.map((ite, ind) =>
        ind == index ? currSaleItem : ite
      );
      setExpenseItems(newSaleData);
    };

    // for Calculations
    useEffect(() => {
      AmountCalculator();
      const { amount, taxAmount, discountPercent, discountAmount } =
        AmountCalculator();
      let currSaleItem = {
        ...expenseItems[ind],
        amount,
        taxAmount,
        discountAmount,
        discountpersant: discountPercent,
      };
      let newSaleData = expenseItems.map((ite, index) =>
        index == ind ? currSaleItem : ite
      );
      setExpenseItems(newSaleData);
    }, [
      item?.qty,
      item?.priceUnit,
      item?.discountpersant,
      item?.discountpersant,
      item?.taxPersant,
    ]);

    function AmountCalculator() {
      const parseToNumber = (value) => (value ? parseFloat(value) : 0);
      let amount = parseToNumber(item?.amount) || 0;
      let taxAmount = parseToNumber(item?.taxAmount) || 0;
      let discountPercent = parseToNumber(item?.discountpersant) || 0;
      let discountAmount = parseToNumber(item?.discountAmount) || 0;
      let taxPercent = 0;
      if (item && item.taxRate) {
        const parts = item?.taxRate.split("@");
        if (parts.length == 2) {
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
      } else if (taxAmount > 0) {
        taxPercent = (taxAmount / amount) * 100;
        amount += taxAmount;
      }

      return {
        amount:
          parseFloat(amount.toFixed(2)) == 0
            ? ""
            : parseFloat(amount.toFixed(2)),
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
    }
    return (
      <tr
        onClick={() => setIndexSaleItem(ind)}
        style={{
          background: ind % 2 == 0 ? "var(--greyishBlue)" : "var(--greyB)",
        }}
      >
        <td
          className={css.serialNumberBody}
          onClick={() => setIndexSaleItem(ind)}
        >
          <div>
            <MoveIcon className={css.serialIconsBody} />
            <p>{ind + 1}</p>
            <DeleteIcon3
              onClick={(e) => handleDeleteRow(e, ind)}
              className={css.serialIconsBody}
            />
          </div>
        </td>

        {/* Item Name */}
        <td
          onFocus={() => {
            setShowItemsListMenu(true);
            setIndexSaleItem(ind);
          }}
          onBlur={() => {
            setShowItemsListMenu(false);
          }}
          onClick={() => setIndexSaleItem(ind)}
          className={css.itemNameBody}
        >
          <input
            type="text"
            name="mainName"
            value={item?.mainName}
            onChange={(e) => {
              handleTableInputChange(e, ind);
            }}
            onBlur={() => {
              setShowItemsListMenu(false);
            }}
            className={css.tableInputs}
            required
          />
          <Menu isOpen={showItemsListMenu && ind == indexSaleItem}>
            <MenuList
              style={{
                marginTop: `${foundItems.length > 0 ? 240 : 160}px`,
                maxHeight: "150px",
                marginLeft: "50px",
                zIndex: 2500,
                overflow: "auto",
                position: "absolute",
              }}
              onClick={() => setShowItemsListMenu(true)}
            >
              <MenuItem onClick={() => setShowItemForm(true)}>
                Add Item
              </MenuItem>
              <MenuDivider />
              {isLoading && <MenuItem>Loading Items...</MenuItem>}
              {isLoading && foundItems.length <= 0 && (
                <MenuItem style={{ color: "red" }}>No Items Found!</MenuItem>
              )}
              {!isLoading &&
                foundItems?.map((itemList) => (
                  <MenuItem
                    key={itemList?._id}
                    onClick={() => {
                      handleMenuItemClick(ind, itemList);
                      setShowItemsListMenu(false);
                    }}
                  >
                    {itemList?.itemName}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
        </td>

        {/* Quantity */}
        <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
          <input
            required
            type="number"
            name="qty"
            value={item?.qty}
            onChange={(e) => handleTableInputChange(e, ind)}
            className={css.tableInputs}
          />
        </td>

        {/* Price per Unit */}
        <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
          <input
            type="number"
            required
            name="priceUnit"
            value={item?.priceUnit}
            onChange={(e) => handleTableInputChange(e, ind)}
            placeholder="0"
            className={css.tableInputs}
          />
        </td>

        {/* Amount */}
        <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
          <input
            type="number"
            value={AmountCalculator()?.amount}
            name="amount"
            onChange={(e) => handleTableInputChange(e, ind)}
            className={css.tableInputs}
            readOnly
            disabled
          />
        </td>
      </tr>
    );
  }
);

export default WithOutGstItemRow;
