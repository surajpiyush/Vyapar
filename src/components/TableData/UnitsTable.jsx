import css from "../../Page/Items/Items.module.css";
import UnitForm from "../addForm/UnitForm";
import { GetAllUnits } from "../../Redux/items/actions";
import {
  FilterIcon,
  VerticalDotsIcon,
  BasicSpinnerIcon,
  SearchIconBlackBg,
} from "../../assets/Icons/ReactIcons";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UnitsTable({ func }) {
  const dispatch = useDispatch();
  const units = useSelector((store) => store.ItemReducer.unit);
  const newUnitAddedToggle = useSelector(
    (store) => store.ItemReducer.newUnitAddedToggle
  );
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const loadingGetSelectedItemData = useSelector(
    (store) => store.ItemReducer.loadingGetSelectedItemData
  );

  const [showUnitForm, setShowUnitForm] = useState(false);
  const [editUnitData, setEditUnitData] = useState({});

  // to fetch all Units
  useEffect(() => {
    GetAllUnits(dispatch);
  }, [newUnitAddedToggle]);

  const openForm = () => {
    func(true);
  };

  return (
    <div className={css.OuterDiv}>
      {/* Edit Unit Form */}
      {showUnitForm && (
        <UnitForm
          usedAsEditForm={true}
          func={setShowUnitForm}
          editUnitData={editUnitData}
        />
      )}

      <div className={css.flexBoxDivCont}>
        {/* Left Side Content */}
        <div className={css.itemsLeftSideDiv}>
          <div className={css.addBtnDivOuter}>
            <SearchIconBlackBg />
            <button className={css.addBtnCss} onClick={openForm}>
              + Add Unit
            </button>
          </div>

          {/* Left Side Items Table */}
          <div>
            <table className={css.leftSideTableCss}>
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
              {!isLoading && (
                <tbody>
                  {units?.map((unitItem, index) => (
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
              )}
            </table>
            {isLoading && <BasicSpinnerIcon className={css.miniSpinnerCss} />}
          </div>
        </div>

        {/* Right Side Content */}
        <div className={css.partiesRightSideDiv}>
          {editUnitData?.unitName && (
            <div className={css.PartyDetailsOuter}>
              <div>
                <p>{editUnitData?.unitName}</p>
              </div>
            </div>
          )}

          <div className={css.transactionHeadingContDiv}>
            <h3>UNITS</h3>
            <input type="text" placeholder="Search" />
          </div>

          <div className={css.tableContDiv}>
            <table className={css.transactionTableCss}>
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
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="3">
                    No Rows To Show
                  </td>
                </tr>
                {/* {!loadingGetSelectedItemData &&
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
            <BasicSpinnerIcon className={css.rightSideTableSpinnerCss} />
          )}
        </div>
      </div>
    </div>
  );
}
