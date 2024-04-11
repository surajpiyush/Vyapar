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
  SearchIcon,
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
  const selectedCateExpenseData = useSelector(
    (store) => store.ExpenseReducer.selectedCateExpenseData
  );
  // const selectedCateExpenseData = [{ amount: 500 }, { amount: 500 }];

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

        <div className={css.leftSideDivSaleOuter}>
          <div className={css.saleOrderSearchDiv}>
            <SearchIcon />
            <div>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className={css.rightSideTableCss}>
          <table>
            <thead>
              <tr>
                {[
                  "DATE",
                  "PARTY",
                  "PAYMENT TYPE",
                  "AMOUNT",
                  "BALANCE",
                  "DUE DATE",
                  "STATUS",
                ].map((headItem, headInd) => (
                  <th key={headItem + headInd}>
                    <div>{headItem}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loadingGetSelectedCategory &&
                selectedCateExpenseData.length > 0 &&
                selectedCateExpenseData?.map((item, index) => (
                  <tr key={item?._id + index}>
                    <td>
                      {item?.date
                        ? new Date(item?.date).toLocaleDateString()
                        : ""}
                    </td>
                    <td>{item?.partyName || ""}</td>
                    <td>{item?.paymentType?.types || ""}</td>
                    <td style={{ textAlign: "right" }}>
                      {item?.amount ? `₹${item?.amount}` : ""}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {item?.balance ? `₹${item?.balance}` : ""}
                    </td>
                    <td>
                      {item?.dueDate
                        ? new Date(item?.dueDate).toLocaleDateString()
                        : ""}
                    </td>
                    <td>{item?.status || ""}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {loadingGetSelectedCategory ? (
            <div className={css.rightSideTableSpinnerCss}>
              <BasicSpinnerIcon />
            </div>
          ) : (
            !loadingGetSelectedCategory &&
            selectedCateExpenseData.length <= 0 && (
              <div className={css.rightSideTableSpinnerCss}>
                <h2>No Transaction Data Available</h2>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
