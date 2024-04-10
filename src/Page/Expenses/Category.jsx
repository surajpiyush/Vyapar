import css from "./Expenses.module.css";
import CategoryForm from "./CategoryForm";
import AddItemForm from "../Items/AddItemForm";
import { GetSelectedItemData } from "../../Redux/items/actions";
import {
  FilterIcon,
  BasicSpinnerIcon,
  SearchIconBlackBg,
  VerticalDotsIcon,
  PlusIcon2,
} from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSelectedCateData } from "../../Redux/expenses/actions";

const Category = ({ showAddForm }) => {
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (store) => store.ExpenseReducer.categoryData
  );
  const isLoading = useSelector((store) => store.ExpenseReducer.isLoading);
  const loadingGetSelectedCategory = useSelector(
    (store) => store.ExpenseReducer.loadingGetSelectedCategory
  );

  const [showEditItemForm, setShowEditItemForm] = useState(false);
  const [clickedItemData, setClickedItemData] = useState({});

  return (
    <div className={css.ContentOuter}>
      {/* Edit Item Form */}
      {showEditItemForm && (
        <AddItemForm
          clickedItemData={clickedItemData}
          usedAsEditForm={true}
          CloseForm={setShowEditItemForm}
        />
      )}

      {/* Left Side Content */}
      <div className={css.partiesLeftSideDiv}>
        <div className={css.addBtnDivOuter}>
          <SearchIconBlackBg />
          <button
            onClick={() => {
              showAddForm(true);
            }}
            className={css.addBtnCss}
          >
            <PlusIcon2 /> Add Expense
          </button>
        </div>

        {/* Left Side Parties Table */}
        <div className={css.leftSideTableCss}>
          <table>
            <thead>
              <tr>
                <th>
                  <div style={{ padding: "0px 25px" }}>CATEGORY</div>
                </th>
                <th>
                  <div style={{ padding: "0px 25px" }}>AMOUNT</div>
                </th>
              </tr>
            </thead>
            {!isLoading && (
              <tbody>
                {categoryData?.map((e, index) => (
                  <tr
                    key={e?._id + index}
                    onClick={() => {
                      setClickedItemData(e);
                      if (!loadingGetSelectedCategory) {
                        GetSelectedCateData(dispatch, e?._id);
                      }
                    }}
                  >
                    <td>{e?.expName}</td>
                    <td>
                      <span>
                        {e?.count || 0}
                        <VerticalDotsIcon
                          onClick={() => {
                            // setShowEditItemForm(true);
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Right Side Content */}
      <div className={css.RightSideDivOuter}>
        {clickedItemData?.expName && (
          <div className={css.PartyDetailsOuter}>
            <div>
              <h5>{clickedItemData?.expName || ""}</h5>
              <p>{clickedItemData?.expType}</p>
            </div>
            <div>
              <p>
                Total :{" "}
                <span>
                  ₹
                  {clickedItemData?.count
                    ? Number(clickedItemData?.count).toFixed(2)
                    : Number(0).toFixed(2)}
                </span>
              </p>
              <p>
                Total :{" "}
                <span>
                  ₹
                  {clickedItemData?.balance
                    ? Number(clickedItemData?.balance).toFixed(2)
                    : Number(0).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className={css.rightSideTableCss}>
          <table>
            <thead>
              <tr>
                <th>
                  <div>
                    Type <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Invoice/Ref <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Name <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Date <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Quantity <FilterIcon />
                  </div>
                </th>
                <th>
                  <div>
                    Status <FilterIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {!loadingGetSelectedCategory &&
              selectedItemTransactionData?.purchaseBill ? (
                Object.keys(selectedItemTransactionData).map((key, index) =>
                  selectedItemTransactionData[key].map((e, innerIndex) => (
                    <tr key={index + e?.type + innerIndex}>
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
                  {!loadingGetSelectedCategory && (
                    <td colSpan="6">No Transaction Data Available</td>
                  )}
                </tr>
              )} */}
            </tbody>
          </table>
          {loadingGetSelectedCategory && (
            <div className={css.rightSideTableSpinnerCss}>
              <BasicSpinnerIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
