import css from "./Expenses.module.css";
import { GetSelectedItemData } from "../../Redux/expenses/actions";
import {
  PlusIcon2,
  FilterIcon,
  SearchIcon,
  BasicSpinnerIcon,
  VerticalDotsIcon,
  SearchIconBlackBg,
} from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Item = ({ showAddForm }) => {
  const dispatch = useDispatch();
  const itemsData = useSelector((store) => store.ExpenseReducer.itemsData);
  const isLoading = useSelector((store) => store.ExpenseReducer.isLoading);
  const loadingGetSelectedItem = useSelector(
    (store) => store.ExpenseReducer.loadingGetSelectedItem
  );
  const selectedItemExpenseData = useSelector(
    (store) => store.ExpenseReducer.selectedItemExpenseData
  );
  const [clickedItemData, setClickedItemData] = useState({});

  return (
    <div className={css.ContentOuter}>
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

        {/* Left Side Item Details Table */}
        <div className={css.leftSideTableCss}>
          <table>
            <thead>
              <tr>
                <th>
                  <div style={{ padding: "0px 35px" }}>ITEM</div>
                </th>
                <th>
                  <div style={{ padding: "0px 15px" }}>AMOUNT</div>
                </th>
              </tr>
            </thead>
            {!isLoading && (
              <tbody>
                {itemsData?.map((e, index) => (
                  <tr
                    key={e?._id + index}
                    onClick={() => {
                      setClickedItemData(e);
                      if (!loadingGetSelectedItem) {
                        GetSelectedItemData(dispatch, e?._id);
                      }
                    }}
                  >
                    <td>{e?.itemName}</td>
                    <td>
                      <span>
                        {e?.total || 0}
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
        {clickedItemData?.itemName && (
          <div className={css.PartyDetailsOuter}>
            <div>
              <h5>{clickedItemData?.itemName || ""}</h5>
            </div>
            <div>
              <p>
                Total :{" "}
                <span>
                  ₹
                  {clickedItemData?.total
                    ? Number(clickedItemData?.total).toFixed(2)
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
              {!loadingGetSelectedItem &&
                selectedItemExpenseData.length > 0 &&
                selectedItemExpenseData?.map((item, index) => (
                  <tr key={item?._id + index}>
                    <td>
                      {item?.date
                        ? new Date(item?.date).toLocaleDateString()
                        : ""}
                    </td>
                    <td>{item?.partyName || ""}</td>
                    <td>{item?.paymentType[0]?.types || ""}</td>
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
          {loadingGetSelectedItem ? (
            <div className={css.rightSideTableSpinnerCss}>
              <BasicSpinnerIcon />
            </div>
          ) : (
            !loadingGetSelectedItem &&
            selectedItemExpenseData.length <= 0 && (
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

export default Item;
