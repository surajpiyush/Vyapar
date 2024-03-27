// import "../../styles/parties.css";
import css from "../../Page/Items/Items.module.css";
import { GetSelectedItemData, getUnit } from "../../Redux/items/actions";
import { USER_DETAILS } from "../../Redux/business/actionTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { IoIosArrowRoundUp as UpArrowIcon } from "react-icons/io";
import { PiDotsThreeVerticalBold as VerticalDots } from "react-icons/pi";
import { IoSearchCircleSharp as SearchIcon } from "react-icons/io5";
import UnitEditForm from "../addForm/UnitEditForm";

export default function ProductsTable({ func }) {
   const dispatch = useDispatch();
   const units = useSelector((store) => store.ItemReducer.unit);
   const isLoading = useSelector((store) => store.ItemReducer.isLoading);
   const loadingGetSelectedItemData = useSelector(
      (store) => store.ItemReducer.loadingGetSelectedItemData
   );
   const selectedItemData = useSelector(
      (store) => store.ItemReducer.selectedItemData
   );
   const selectedItemTransactionData = useSelector(
      (store) => store.ItemReducer.selectedItemTransactionData
   );
   const [editItem, setEditItem] = useState([]);
   const [showEditFirm, setShowEditFirm] = useState(false);
   console.log(units);
   // Item Click Handler
   const handleItemClick = (item) => {
      GetSelectedItemData(dispatch, item?._id);
   };

   const handleStatusToggle = (index) => {
      const updatedTableData = [...selectedItemTransactionData];
      updatedTableData[index].status = !updatedTableData[index].status;
   };

   const openForm = () => {
      func(true);
   };

   useEffect(() => {
      getUnit(dispatch);
   }, []);

   return (
      <div className={css.OuterDiv}>
         {showEditFirm && (
            <UnitEditForm setShowEditFirm={setShowEditFirm} item={editItem} />
         )}

         <div className={css.flexBoxDivCont}>
            {/* Left Side Content */}
            <div className={css.itemsLeftSideDiv}>
               <div className={css.addBtnDivOuter}>
                  <SearchIcon />
                  <button className={css.addBtnCss} onClick={openForm}>
                     + Add Unit
                  </button>
               </div>

               {/* Left Side Items Table */}
               <div>
                  <table className={css.leftSideTableCss}>
                     <thead>
                        <tr>
                           <th>FULLNAME</th>
                           <th>SHORTNAME</th>
                        </tr>
                     </thead>
                     {!isLoading && (
                        <tbody>
                           {units?.map((e, index) => (
                              <tr
                                 key={index}
                                 onClick={() => {
                                    handleItemClick(e);
                                 }}
                              >
                                 <td>{e?.unitName}</td>
                                 <td>
                                    <span>
                                       {e?.shortName}
                                       <VerticalDots
                                          onClick={() => {
                                             setEditItem(e);
                                             setShowEditFirm(true);
                                          }}
                                       />
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     )}
                  </table>
                  {isLoading && <BasicSpinner className={css.miniSpinnerCss} />}
               </div>
            </div>

            {/* Right Side Content */}
            <div className={css.partiesRightSideDiv}>
               {!loadingGetSelectedItemData && selectedItemData?.itemName && (
                  <div className={css.PartyDetailsOuter}>
                     <div>
                        <h5>
                           {selectedItemData?.itemName
                              ? selectedItemData?.itemName
                              : ""}
                        </h5>
                        <p>
                           {selectedItemData?.salePrice?.price &&
                              `Sales Price: ₹${selectedItemData?.salePrice?.price}`}
                        </p>
                        <p>
                           Stock Quantity:{" "}
                           {selectedItemData?.stock?.openingQuantity ||
                              selectedItemData?.ReservedQuantity ||
                              1}
                        </p>
                     </div>
                     <div>
                        <p>
                           {selectedItemData?.purchasePrice?.price &&
                              `Purchase Price: ₹${selectedItemData?.purchasePrice?.price}`}
                        </p>
                        <p>
                           {selectedItemData?.StockValue &&
                              `Stock Value: ₹${selectedItemData?.StockValue}`}
                        </p>
                     </div>
                  </div>
               )}

               <div className={css.transactionHeadingContDiv}>
                  <h3>Units</h3>
                  <input type="text" placeholder="Search" />
               </div>

               <div className={css.tableContDiv}>
                  <table className={css.transactionTableCss}>
                     <thead>
                        <tr>
                           <th>
                              <div> </div>
                           </th>
                           <th>
                              <div>
                                 Conversation
                                 <FilterIcon />
                              </div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {!loadingGetSelectedItemData &&
                        selectedItemTransactionData?.purchaseBill ? (
                           Object.keys(selectedItemTransactionData).map(
                              (key, index) =>
                                 selectedItemTransactionData[key].map(
                                    (e, innerIndex) => (
                                       <tr key={index}>
                                          <td>{e.type}</td>
                                          <td>{e.invoiceOrRefNo}</td>
                                          <td>{e.name}</td>
                                          <td>
                                             {new Date(
                                                e.date
                                             ).toLocaleDateString()}
                                          </td>
                                          <td>{e.quantity}</td>
                                          {/* <td>-</td> */}
                                          <td>
                                             <button
                                                style={{ border: "none" }}
                                                onClick={() =>
                                                   handleStatusToggle(index)
                                                }
                                             >
                                                {e.status ? "Paid" : "Unpaid"}
                                             </button>
                                          </td>
                                       </tr>
                                    )
                                 )
                           )
                        ) : (
                           <tr id={css.noDataCell}>
                              {!loadingGetSelectedItemData && (
                                 <td colSpan="7">No Item Data Available</td>
                              )}
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>

               {loadingGetSelectedItemData && (
                  <BasicSpinner className={css.rightSideTableSpinnerCss} />
               )}
            </div>
         </div>
      </div>
   );
}
