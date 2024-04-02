import css from "../../Page/Items/Items.module.css";
import UnitForm from "../addForm/UnitForm";
import {
  FilterIcon,
  BasicSpinnerIcon,
  SearchIconBlackBg,
  VerticalDotsIcon,
} from "../../assets/Icons/ReactIcons";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function UnitsTable({ showAddForm }) {
  // Unit
  const unitList = useSelector((store) => store.ItemReducer.unit);
  // Loading Get Selected Unit Data
  const loadingGetSelectedItemData = false;

  const [showUnitForm, setShowUnitForm] = useState(false);
  const [editUnitData, setEditUnitData] = useState({});

  return (
    <div className={css.ContentOuter}>
      {/* Edit Unit Form */}
      {showUnitForm && (
        <UnitForm
          usedAsEditForm={true}
          func={setShowUnitForm}
          editUnitData={editUnitData}
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
            + Add Unit
          </button>
        </div>

        {/* Left Side Parties Table */}
        <div className={css.leftSideTableCss}>
          <table>
            <thead>
              <tr>
                <th>
                  <div>FULLNAME</div>
                </th>
                <th>
                  <div>SHORTNAME</div>
                </th>
              </tr>
            </thead>

            <tbody>
              {unitList?.map((unitItem, index) => (
                <tr
                  key={index + unitItem?._id}
                  onClick={() => {
                    setEditUnitData(unitItem);
                  }}
                >
                  <td>{unitItem?.unitName}</td>
                  <td>
                    <span>
                      {unitItem?.shortName}
                      <VerticalDotsIcon
                        onClick={() => {
                          setShowUnitForm(true);
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
        {!loadingGetSelectedItemData && editUnitData?.unitName && (
          <div className={css.PartyDetailsOuter}>
            <div>
              <p>{editUnitData?.unitName}</p>
            </div>
          </div>
        )}

        <div className={css.transactionHeadingContDiv}>
          <h3>UNITS</h3>
        </div>

        <div className={css.rightSideTableCss}>
          <table>
            <thead>
              <tr>
                <th>
                  <div style={{ minWidth: "30px", height: "31px" }}></div>
                </th>
                <th>
                  <div>
                    Conversion
                    <FilterIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr id={css.noDataCell}>
                {!loadingGetSelectedItemData && (
                  <td colSpan="3">No Rows To Show</td>
                )}
              </tr>
              {/* {!loadingGetSelectedItemData &&
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
              )} */}
            </tbody>
          </table>
          {loadingGetSelectedItemData && (
            <div className={css.rightSideTableSpinnerCss}>
              <BasicSpinnerIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
