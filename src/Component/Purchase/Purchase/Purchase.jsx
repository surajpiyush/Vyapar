import css from "../../../styles/SalesStyles/SalesForms.module.css";

import { useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { Menu, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { MdDelete as DeleteIcon } from "react-icons/md";
import { TbArrowsMove as MoveIcon } from "react-icons/tb";

const ItemsTableBody = memo(
   ({
      ind,
      item,
      invoiceItems,
      setInvoiceItems,
      handleDeleteRow,
      handleMenuItemClick,
      showItemsListMenu,
      indexSaleItem,
      setShowItemsListMenu,
      setIndexSaleItem,
      setShowItemForm,
      getAllItemsLoading,
      items,
   }) => {

      const loadingAllItems = useSelector(
         (state) => state.ItemReducer.getAllItemsLoading
       );
       const itemsList = useSelector((state) => state.ItemReducer.items);

      const [foundItems, setFoundItems] = useState([]);
      
  // Itemslist Suggestions
      useEffect(() => {
         const regex = new RegExp(item?.itemName, "i");
    const itemsArr = Array.isArray(itemsList) ? itemsList : [];
         const found = itemsArr?.filter((ite) => regex.test(ite.itemName));
         if (item?.itemName.length < 1) {
            return setFoundItems(items);
         }

         setFoundItems(found);
      }, [item?.itemName,itemsList]);


  
   

      function AmountCalculator() {
         const parseToNumber = (value) => (value ? parseFloat(value) : 0);

         let amount = parseToNumber(item?.amount) || 0;
         let taxAmount = parseToNumber(item?.taxAmount) || 0;
         let discountPercent = parseToNumber(item?.discountpersant) || 0;
         let discountAmount = parseToNumber(item?.discountAmount) || 0;
         let taxPercent = parseToNumber(item?.taxPersant) || 0;
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

       // Sale Items Change Function
       const handleTableInputChange = (e, index) => {
         const { name, value } = e.target;
         let currSaleItem = { ...invoiceItems[index], [name]: value };
         let newSaleData = invoiceItems.map((ite, ind) =>
            ind == index ? currSaleItem : ite
         );
         setInvoiceItems(newSaleData);
      };

      useEffect(() => {
         AmountCalculator();
         const { amount, taxAmount, discountPercent, discountAmount } =
            AmountCalculator();
         let currSaleItem = {
            ...invoiceItems[ind],
            amount,
            taxAmount,
            discountAmount,
            discountpersant: discountPercent,
         };
         let newSaleData = invoiceItems.map((ite, index) =>
            index == ind ? currSaleItem : ite
         );
         setInvoiceItems(newSaleData);
      }, [
         item.qty,
         item.priceUnit,
         item.discountpersant,
         item.discountpersant,
         item.taxPersant,
      ]);
console.log(item)
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
                  <DeleteIcon
                     onClick={(e) => handleDeleteRow(e, ind)}
                     className={css.serialIconsBody}
                  />
               </div>
            </td>
            <td className={css.itemNameBody}>
               <select name="category" id="" value={item?.category}>
                  <option value="">Category</option>
                  <option value="show">Show</option>
                  <option value="tab">Tab</option>
                  <option value="medicine">medicine</option>
                  <option value="cloths">Cloths</option>{" "}
               </select>
            </td>
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
                  name="itemName"
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
                     {getAllItemsLoading && <MenuItem>Loading Items...</MenuItem>}
                     {!getAllItemsLoading && foundItems.length <= 0 && (
              <MenuItem style={{ color: "red" }}>No Items Found!</MenuItem>
            )}
                     {!getAllItemsLoading &&
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

            <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
               <input
                  type="text"
                  className={css.tableInputs}
                  name="itemCode"
                  onChange={(e) => handleTableInputChange(e, ind)}
                  disabled
               />
            </td>
            <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
               <input
                  required
                  type="text"
                  name="hsnCode"
                  value={item?.hsnCode}
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder=""
                  className={css.tableInputs}
               />
            </td>
            {/* <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
               <input
                  type="text"
                  className={css.tableInputs}
                  name="description"
                  // value={item?.desciption}
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="0"
               />
            </td> */}
            <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
               <input
                  type="number"
                  className={css.tableInputs}
                  name="count"
                  // value={item?.count}
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="0"
               />
            </td>
            <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
               <input
                  required
                  type="number"
                  name="qty"
                  value={item?.qty}
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="0"
                  className={css.tableInputs}
               />
            </td>
            <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
               <input
                  type="number"
                  name="freeqty"
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="0"
                  className={css.tableInputs}
               />
            </td>
            <td className={css.unitBody} onClick={() => setIndexSaleItem(ind)}>
               <select
                  required
                  name="unit"
                  value={item?.unit}
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="None"
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

            <td
               className={css.DiscountBody}
               onClick={() => setIndexSaleItem(ind)}
            >
               <input
                  type="number"
                  name="discountpersant"
                  value={AmountCalculator()?.discountPercent}
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="0"
                  className={css.tableInputs}
               />
               <input
                  type="number"
                  name="discountAmount"
                  value={AmountCalculator()?.discountAmount}
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="0"
                  className={css.tableInputs}
               />
            </td>
            <td
               className={css.ItemTaxBody}
               onClick={() => setIndexSaleItem(ind)}
            >
               <span>
                  <div>
                     <select
                        name="taxPersant"
                        // value={item.taxPersant}
                        onChange={(e) => handleTableInputChange(e, ind)}
                     >
                        <option value="">None</option>
                        <option value="0">IGST@0%</option>
                        <option value="0">GST@0%</option>
                        <option value="0.25">IGST@0.25%</option>
                        <option value="0.25">GST@0.25%</option>
                        <option value="3">IGST@3%</option>
                        <option value="3">GST@3%</option>
                        <option value="5">IGST@5%</option>
                        <option value="5">GST@5%</option>
                        <option value="12">IGST@12%</option>
                        <option value="12">GST@12%</option>
                        <option value="18">IGST@18%</option>
                        <option value="18">GST@18%</option>
                        <option value="28">IGST@28%</option>
                        <option value="28">GST@28%</option>
                     </select>
                  </div>
                  <input
                     type="number"
                     value={AmountCalculator()?.taxAmount}
                     // value={item.taxAmount}
                     name="taxAmount"
                     onChange={(e) => handleTableInputChange(e, item)}
                     placeholder="0"
                     className={css.tableInputs}
                     readOnly
                     disabled
                  />
               </span>
            </td>
            <td className={css.qtyBody} onClick={() => setIndexSaleItem(ind)}>
               <input
                  type="number"
                  value={AmountCalculator()?.amount}
                  //  value={(item?.qty * item?.priceUnit).toFixed(2)}
                  name="amount"
                  onChange={(e) => handleTableInputChange(e, ind)}
                  placeholder="0"
                  className={css.tableInputs}
                  readOnly
                  disabled
               />
            </td>
         </tr>
      );
   }
);

export default ItemsTableBody;
