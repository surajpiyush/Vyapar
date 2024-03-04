import css from "../../../styles/SalesStyles/CreditNotes.module.css";
import FormCreditNote from "./FormCreditNote";
import TableCreditNotes from "./TableCreditNotes";
import { GetAllCreditNotes } from "../../../Redux/sales/action";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

export default function SalesReturn() {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleCreditNote = useSelector(
    (state) => state.SalesReducer.toggleCreditNote
  );
  const creditNotesList = useSelector(
    (state) => state.SalesReducer.creditNotesList
  );

  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    GetAllCreditNotes(dispatch, startDate, endDate);
  }, [toggleCreditNote, startDate, endDate]);

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Credit Note #1</span>
                <CrossIcon />
              </p>
            </div>
            <div>
              <CalculatorIcon
                onClick={() =>
                  toast({
                    title: "Feature currently in development",
                    status: "info",
                    position: "top",
                  })
                }
              />
              <SettingIcon
                onClick={() =>
                  navigate("/setting", {
                    state: { redirectTo: location.pathname },
                    replace: true,
                  })
                }
              />
              <CloseIcon onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <FormCreditNote setOpenForm={setOpenForm} />
        </div>
      )}

      {/* Top Nav */}
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

      {/* Data Part */}
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
                <PlusIcon /> Add Credit Note
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
                  creditNotesList?.map((item, ind) => (
                    <TableCreditNotes
                      {...item}
                      ind={ind}
                      key={ind + item?._id}
                    />
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
                Loading Credit Notes Data...
              </h2>
            )}
            {!isLoading && creditNotesList?.length <= 0 && (
              <h2
                style={{
                  textAlign: "center",
                  margin: "20px auto",
                  color: "red",
                }}
              >
                No Credit Notes data available for the specified dates
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
