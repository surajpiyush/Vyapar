import css from "../../../styles/SalesStyles/PaymentIn.module.css";
import PaymentInForm from "./PaymentInForm";
import TablePaymentIn from "./TablePaymentIn";
import { GetAllPaymentIn } from "../../../Redux/sales/action";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";

export default function SalesPaymentIn() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const togglePaymentIn = useSelector(
    (state) => state.SalesReducer.togglePaymentIn
  );
  const paymentInList = useSelector(
    (state) => state.SalesReducer.paymentInList
  );

  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    GetAllPaymentIn(dispatch, startDate, endDate);
  }, [togglePaymentIn, startDate, endDate]);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
      {openForm && <PaymentInForm closeForm={closeForm} />}

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
                      DATE <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      REF NO. <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      PARTY NAME <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      CATEGORY NAME <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      TYPE <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      TOTAL <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      RECEIVED/PAID <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      BALANCE <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      PRINT/SHARE <FilterIcon />
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  paymentInList?.map((item, ind) => (
                    <TablePaymentIn {...item} ind={ind} key={ind + item?._id} />
                  ))}
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
