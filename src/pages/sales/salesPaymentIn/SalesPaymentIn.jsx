import css from "../../../styles/SalesStyles/PaymentIn.module.css";
import PaymentInForm from "./PaymentInForm";
import TablePaymentIn from "./TablePaymentIn";
import Setting from "../../../Component/Setting/Setting";
import { GetAllPaymentIn, deletePaymentIn } from "../../../Redux/sales/action";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import EditableRow from "../../../Component/EditForm";

export default function SalesPaymentIn() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const togglePaymentIn = useSelector(
    (state) => state.SalesReducer.togglePaymentIn
  );
  const paymentInList = useSelector(
    (state) => state.SalesReducer.paymentInList
  );

  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    GetAllPaymentIn(dispatch, startDate, endDate);
  }, [togglePaymentIn, startDate, endDate]);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    deletePaymentIn(dispatch, id);
  };

  const handleEdit = (_id) => {
    const data = paymentInList.filter((e) => e._id === _id);
    console.log(data);
    setIsEditing(true);
    setEditedData(data[0]);
  };

  const handleSave = (updatedData) => {
    // Implement your logic to save the updated data to the backend
    // You may use an API call or any other method here
    console.log("updatedData-", updatedData);
    const id = updatedData._id;
    // After saving, reset the state
    // dispatch(updatePurchaseBill(updatedData._id, updatedData));
    setIsEditing(false);
    setEditedData(null);
    GetAllPaymentIn(dispatch, startDate, endDate);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };
  const display = [
    "billDate",
    "billNumber",

    "paymentType",
    "amount",
    "balanceDue",
    "status",
    "hariom",
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {openForm && (
        <PaymentInForm
          setToggleSetting={setToggleSetting}
          closeForm={closeForm}
        />
      )}

      <div className="grp-cont-invoice">
        <div className="">
          <div className="d-between" style={{ alignItems: "center" }}>
            <div className="d-flex" style={{ gap: "10px" }}>
              <div className="">
                <select name="" id="" className="invoice-select">
                  <option value="">This Month</option>
                  <option value="">This Quarter</option>
                  <option value="">Last Month</option>
                  <option value="">This Year</option>
                  <option value="">Custom</option>
                </select>
              </div>
              <div className="d-flex">
                <p>Between</p>
                <div
                  className="d-flex"
                  style={{ gap: "10px", marginLeft: "10px" }}
                >
                  <input
                    type="date"
                    className="invoice-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span>To</span>
                  <input
                    type="date"
                    className="invoice-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="" style={{ marginLeft: "10px" }}>
                <select name="" id="" className="invoice-select2">
                  <option value="">All Firms</option>
                  <option value="">My Company</option>
                </select>
              </div>
            </div>
            <div className="d-flex" style={{ gap: "20px" }}>
              <div className="d-flex-col">
                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                <span>Excel Report</span>
              </div>
              <div className="d-flex-col">
                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                <span>Print</span>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ gap: "20px", marginTop: "20px" }}>
            <div className="" style={{ marginLeft: "10px" }}>
              <select name="" id="" className="invoice-select2">
                <option value="">Payment In</option>
                <option value="">All Transactions</option>
                <option value="">Sale</option>
                <option value="">Purchase</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="d-cen b-cont text-center text-center">
        <div className={css.TableOuter}>
          <div className={css.saleOrderUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <div className={css.saleOrderSearchDiv}>
                <SearchIcon />
                <div>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={formOpen}
                className={css.addSaleOrderBtn}
              >
                <PlusIcon /> Add Payment-In
              </button>
            </div>
          </div>
          <div className={css.TabelOuterDivSaleOrder}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>#</div>
                  </th>
                  <th>
                    <div>
                      DATE
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      REF NO.
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      PARTY NAME
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      CATEGORY NAME
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      TYPE
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      TOTAL
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      RECEIVED/PAID
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      BALANCE
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th>
                    <div>
                      PRINT/SHARE
                      {/*  <FilterIcon /> */}
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  paymentInList?.map((item, ind) =>
                    isEditing && editedData?._id === item._id ? (
                      <tr style={{ width: "82%", position: "absolute" }}>
                        <EditableRow
                          display={display}
                          data={editedData}
                          onSave={handleSave}
                          onCancel={handleCancel}
                        />
                      </tr>
                    ) : (
                      <TablePaymentIn
                        {...item}
                        ind={ind}
                        key={ind + item?._id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    )
                  )}
              </tbody>
            </table>
            {isLoading && (
              <h2
                style={{
                  color: "green",
                  textAlign: "center",
                  margin: "20px auto",
                }}
              >
                Loading Payment-In Data...
              </h2>
            )}
            {!isLoading && paymentInList?.length <= 0 && (
              <h2
                style={{
                  color: "Red",
                  textAlign: "center",
                  margin: "20px auto",
                  color: "red",
                }}
              >
                No Payment-In Data Available for the specified dates...
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
