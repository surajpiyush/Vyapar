import React, { useEffect, useState } from "react";
import css from "./ExportItem.module.css";
import { GetAllItems } from "../../../Redux/items/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader3 from "../../../Component/Loaders/Loader3";
import * as XLSX from "xlsx";
import { Tooltip } from "@chakra-ui/react";
import {
   BasicSpinnerIcon,
   ExcelIcon,
   ExcelIconOutline,
   JsonIconOutline,
   PrintIconOutline,
} from "../../../assets/Icons/ReactIcons";

const ExportItem = () => {
   const dispatch = useDispatch();
   const [printClickStates, setPrintClickStates] = useState({
      JsonLoading: false,
      excelLoading: false,
      printLoading: false,
   });
   const getAllItemsLoading = useSelector(
      (store) => store.ItemReducer.getAllItemsLoading
   );
   const allItems = useSelector((store) => store.ItemReducer.allItems);

   // Fetch Items Data
   useEffect(() => {
      GetAllItems(dispatch);
   }, []);

   const DownloadExcelReport = () => {
      const tableData = allItems.map((item) => ({
         "Item Name": item.itemName,
         "Item Code": item.itemCode,
         Description: item.description,
         Category: item.category,
         HSN: item.itemHsn,
         "Sale Price": item.salePrice?.salePrice,
         "Purchase Price": item.purchasePrice?.purchasePrice,
         "Discount Type": item.salePrice?.discountType,
         "Sale Discount": item.salePrice?.disOnSale,
         "Current Stock": item.stock?.openingQuantity,
         "Min Stock": item.stock?.minStockToMaintain,
         "Item Location": item.stock?.location,
         "Tax Rate": item.taxRate,
         "Base Unit": item.seleteUnit?.baseUnit,
         "Secondary Unit": item.seleteUnit?.secondaryUnit,
      }));

      const worksheet = XLSX.utils.json_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
      XLSX.writeFile(workbook, "items.xlsx");
   };

   return (
      <div>
         <div className={css.rightSideUpperPart}>
            <div>
               <h2>Excel Sheet Download</h2>
            </div>
            <Tooltip label="Excel Report">
               <div onClick={DownloadExcelReport} className={css.excelIconDiv}>
                  {printClickStates?.excelLoading ? (
                     <BasicSpinnerIcon />
                  ) : (
                     <ExcelIconOutline />
                  )}
               </div>
            </Tooltip>
         </div>
         {getAllItemsLoading ? (
            <Loader3 text="Loading data" />
         ) : (
            <div className={css.contentTableOuterDiv}>
               <table>
                  <thead>
                     <tr>
                        {[
                           "Item Name",
                           "Item Code",
                           "Description",
                           "Category",
                           "HSN",
                           "Default Mrp",
                           "Sale Price",
                           "Purchase Price",
                           "Discount Type",
                           "Sale Discount",
                           "Current Stock",
                           "Min Stock",
                           "Item Location",
                           "Tax Rate",
                           "Tax Type",
                           "Base Unit",
                           "Secondary Unit",
                           "Conv. Rate",
                        ].map((item, ind) => (
                           <th key={item + ind}>
                              <div>{item}</div>
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {allItems?.map((item, ind) => (
                        <tr key={item?._id + ind}>
                           <td>{item?.itemName}</td>
                           <td>{item?.itemCode}</td>
                           <td>{item?.description}</td>
                           <td>{item?.category}</td>
                           <td>{item?.itemHsn}</td>
                           <td></td>
                           <td>{item?.salePrice?.salePrice}</td>
                           <td>{item?.purchasePrice?.purchasePrice}</td>
                           <td>{item?.salePrice?.discountType}</td>
                           <td>{item?.salePrice?.disOnSale}</td>
                           <td>{item?.stock?.openingQuantity}</td>
                           <td>{item?.stock?.minStockToMaintain}</td>
                           <td>{item?.stock?.location}</td>
                           <td>{item?.taxRate}</td>
                           <td></td>
                           <td>{item?.seleteUnit?.baseUnit}</td>
                           <td>{item?.seleteUnit?.secondaryUnit}</td>
                           <td></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default ExportItem;
