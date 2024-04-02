import css from "../../Page/Items/Items.module.css";
import CategoryForm from "../addForm/CategoryForm";
import {
  FilterIcon,
  BasicSpinnerIcon,
  SearchIconBlackBg,
  VerticalDotsIcon,
} from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function CategoryTable({ showAddForm }) {
  // CategoryList
  const categoryList = useSelector((store) => store.ItemReducer.category);
  // Get Selected Category Loading
  const loadingGetSelectedCategoryData = false;

  const [showEditForm, setShowEditForm] = useState(false);
  const [currCate, setCurrCate] = useState({});

  return (
    <div className={css.ContentOuter}>
      {/* Edit Category Form */}
      {showEditForm && (
        <CategoryForm
          func={setShowEditForm}
          useAsUpdateForm={true}
          clickedItem={currCate}
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
            + Add Category
          </button>
        </div>

        {/* Left Side Parties Table */}
        <div className={css.leftSideTableCss}>
          <table>
            <thead>
              <tr>
                <th>
                  <div>CATEGORY</div>
                </th>
                <th>
                  <div style={{ padding: "0px 30px" }}>ITEM</div>
                </th>
              </tr>
            </thead>

            <tbody>
              {categoryList?.map((e, index) => (
                <tr
                  key={e?._id + index}
                  onClick={() => {
                    setCurrCate(e);
                  }}
                >
                  <td>{e?.categoryName}</td>
                  <td>
                    <span>
                      {e?.stock?.openingQuantity || 0}
                      <VerticalDotsIcon
                        onClick={() => {
                          setShowEditForm(true);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side Content */}
      <div className={css.RightSideDivOuter}>
        {!loadingGetSelectedCategoryData && currCate?.categoryName && (
          <div className={css.PartyDetailsOuter}>
            <div>
              <p>{currCate?.categoryName}</p>
              <p>{currCate?.items}</p>
            </div>
          </div>
        )}

        <div className={css.transactionHeadingContDiv}>
          <h3>ITEMS</h3>
        </div>

        <div className={css.rightSideTableCss}>
          <table>
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
              <tr id={css.noDataCell}>
                {!loadingGetSelectedCategoryData && (
                  <td colSpan="3">No Rows To Show</td>
                )}
              </tr>
              {/* {!loadingGetSelectedCategoryData &&
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
                  {!loadingGetSelectedCategoryData && (
                    <td colSpan="6">No Transaction Data Available</td>
                  )}
                </tr>
              )} */}
            </tbody>
          </table>
          {loadingGetSelectedCategoryData && (
            <div className={css.rightSideTableSpinnerCss}>
              <BasicSpinnerIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
