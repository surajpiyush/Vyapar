// import "../../styles/parties.css";
import css from "../../Page/Items/Items.module.css";
import CategoryForm from "../addForm/CategoryForm";
import {
  GetSelectedItemData,
  GetAllCategories,
  getitems,
} from "../../Redux/items/actions";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner3 as BasicSpinner } from "react-icons/im";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { IoIosArrowRoundUp as UpArrowIcon } from "react-icons/io";
import { PiDotsThreeVerticalBold as VerticalDots } from "react-icons/pi";
import { IoSearchCircleSharp as SearchIcon } from "react-icons/io5";

export default function CategoryTable({ func }) {
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

  const [showEditForm, setShowEditForm] = useState(false);
  const [currCate, setCurrCate] = useState({});

  const handleStatusToggle = (index) => {
    const updatedTableData = [...selectedItemTransactionData];
    updatedTableData[index].status = !updatedTableData[index].status;
  };

  const openForm = () => {
    func(true);
  };

  return (
    <div className={css.OuterDiv}>
      {showEditForm && (
        <CategoryForm
          func={setShowEditForm}
          useAsUpdateForm={true}
          clickedItem={currCate}
        />
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
                  <th>
                    <div>CATEGORY</div>
                  </th>
                  <th>
                    <div>ITEM</div>
                  </th>
                </tr>
              </thead>
              {!isLoading && (
                <tbody>
                  {category?.map((e, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setCurrCate(e);
                      }}
                    >
                      <td>{e?.categoryName}</td>
                      <td>
                        <span>
                          {e?.item || 0}
                          <VerticalDots
                            onClick={() => {
                              // setEditItem(e);
                              setShowEditForm(true);
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
          {currCate?.categoryName && (
            <div className={css.PartyDetailsOuter}>
              <div>
                <p>{currCate?.categoryName}</p>
                <p>{currCate?.items}</p>
              </div>
            </div>
          )}

          <div className={css.transactionHeadingContDiv}>
            <h3>ITEMS</h3>
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
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="3">
                    No Rows To Show
                  </td>
                </tr>

                {/* {1 == 2 &&
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
                )} */}
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
