import css from "./Expenses.module.css";
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
import CategoryForm from "./CategoryForm";

const Item = ({ showAddForm }) => {
  const dispatch = useDispatch();
  const itemsData = useSelector((store) => store.ExpenseReducer.itemsData);
  const isLoading = useSelector((store) => store.ExpenseReducer.isLoading);

  // const clickedItemData = useSelector(
  //   (store) => store.ItemReducer.clickedItemData
  // );
  const selectedItemTransactionData = useSelector(
    (store) => store.ItemReducer.selectedItemTransactionData
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
                      //   if (!loadingGetSelectedItemData) {
                      //     GetSelectedItemData(dispatch, e?._id);
                      //   }
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

        {/* <div className={css.rightSideTableCss}>
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
          {!loadingGetSelectedItemData &&
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
              {!loadingGetSelectedItemData && (
                <td colSpan="6">No Transaction Data Available</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
      {loadingGetSelectedItemData && (
        <div className={css.rightSideTableSpinnerCss}>
          <BasicSpinnerIcon />
        </div>
      )}
    </div> */}
      </div>
    </div>
  );
};

export default Item;
