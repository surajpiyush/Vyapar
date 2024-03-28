// import "../../styles/parties.css";
import css from "../../Page/Items/Items.module.css";
import ItemEditForm from "../addForm/ItemEditForm";
import {
  GetSelectedItemData,
  GetAllCategories,
  getitems,
} from "../../Redux/items/actions";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { IoIosArrowRoundUp as UpArrowIcon } from "react-icons/io";
import { PiDotsThreeVerticalBold as VerticalDots } from "react-icons/pi";
import { IoSearchCircleSharp as SearchIcon } from "react-icons/io5";
import CategoryEditForm from "../addForm/CategoryEditForm";

export default function ProductsTable({ func }) {
  const dispatch = useDispatch();
  const category = useSelector((store) => store.ItemReducer.category);
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

  // Item Click Handler
  const handleItemClick = (item) => {
    GetSelectedItemData(dispatch, item?._id);
  };
  useEffect(() => {
    dispatch(GetAllCategories);
  }, [dispatch]);

  const handleStatusToggle = (index) => {
    const updatedTableData = [...selectedItemTransactionData];
    updatedTableData[index].status = !updatedTableData[index].status;
  };

  const openForm = () => {
    func(true);
  };

  return (
    <div className={css.OuterDiv}>
      {showEditFirm && (
        <CategoryEditForm setShowEditFirm={setShowEditFirm} item={editItem} />
      )}

      <div className={css.flexBoxDivCont}>
        {/* Left Side Content */}
        <div className={css.itemsLeftSideDiv}>
          <div className={css.addBtnDivOuter}>
            <SearchIcon />
            <button className={css.addBtnCss} onClick={openForm}>
              + Add Category
            </button>
          </div>

          {/* Left Side Items Table */}
          <div>
            <table className={css.leftSideTableCss}>
              <thead>
                <tr>
                  <th>CATEGORY</th>
                  <th>ITEM</th>
                </tr>
              </thead>
              {!isLoading && (
                <tbody>
                  {category?.map((e, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        handleItemClick(e);
                      }}
                    >
                      <td>{e?.categoryName}</td>
                      <td>
                        <span>
                          {e?.item || 0}
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
          <div className="">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>ITEMS NOT IN ANY CATEGORY</p>
              <button className={css.addBtnCss}>Move to this Category</button>
            </div>
            <div>
              <p>0.00</p>
            </div>
          </div>

          <div className={css.transactionHeadingContDiv}>
            <h3>Item</h3>
            <input type="text" placeholder="Search" />
          </div>

          <div className={css.tableContDiv}>
            <table className={css.transactionTableCss}>
              <thead>
                <tr>
                  <th>
                    <div>
                      Name <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      Quantity <FilterIcon />
                    </div>
                  </th>

                  <th>
                    <div>
                      Stock Value <FilterIcon />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* whenevr you complet this just remove 1==2 it was just for temporay */}
                {1 == 2 &&
                !loadingGetSelectedItemData &&
                selectedItemTransactionData?.purchaseBill ? (
                  Object.keys(selectedItemTransactionData).map((key, index) =>
                    selectedItemTransactionData[key].map((e, innerIndex) => (
                      <tr key={index}>
                        <td>{e.type}</td>
                        <td>{e.invoiceOrRefNo}</td>
                        <td>{e.name}</td>
                        <td>{new Date(e.date).toLocaleDateString()}</td>
                        <td>{e.quantity}</td>
                        {/* <td>-</td> */}
                        <td>
                          <button
                            style={{ border: "none" }}
                            onClick={() => handleStatusToggle(index)}
                          >
                            {e.status ? "Paid" : "Unpaid"}
                          </button>
                        </td>
                      </tr>
                    ))
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
