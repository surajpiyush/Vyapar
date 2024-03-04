import css from "../../../styles/SalesStyles/Estimate.module.css";
import party from "../../../assets/Images/party.jpg";
import EstimateForm from "./EstimateForm";
import FirstTimeFormToggle from "../../../Component/FirstTimeFormToggle";
import { GetAllEstimates } from "../../../Redux/sales/action";

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
import TableEstimates from "./TableEstimates";
import { useLocation, useNavigate } from "react-router-dom";

export default function SalesEstimates() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const toggleEstimates = useSelector(
    (state) => state.SalesReducer.toggleEstimates
  );
  const estimatesList = useSelector(
    (state) => state.SalesReducer.estimatesList
  );

  useEffect(() => {
    GetAllEstimates(dispatch, startDate, endDate);
  }, [toggleEstimates, startDate, endDate]);

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
                <span>Estimate #1</span>
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
          <EstimateForm setOpenForm={setOpenForm} />
        </div>
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
          </div>
        </div>
      </div>

      <div className="d-cen b-cont text-center text-center">
        <div className={css.TableOuter}>
          <div className={css.saleOrderUpperNav}>
            <div className={css.leftSideDivSaleOuter}>
              <p>TRANSACTIONS</p>
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
                <PlusIcon /> Add Sale Order
              </button>
            </div>
          </div>
          <div className={css.TabelOuterDivSaleOrder}>
            <table>
              <thead>
                <tr>
                  <th>
                    <div>
                      DATE <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      REFERENCE NO <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      NAME <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      TOTAL AMOUNT <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      BALANCE <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      STATUS <FilterIcon />
                    </div>
                  </th>
                  <th>
                    <div>
                      ACTION <FilterIcon />
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {!isLoading &&
                  estimatesList?.map((item, ind) => (
                    <TableEstimates {...item} ind={ind} key={ind + item?._id} />
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
                Loading Estimates Data...
              </h2>
            )}
          </div>
        </div>
      </div>

      {estimatesList.length <= 0 && !isLoading && (
        <div style={{ marginTop: "-500px" }}>
          <FirstTimeFormToggle
            img={party}
            onClick={() => setOpenForm(true)}
            BtnText="Add Your First Estimate"
            MiddleText="Make Estimates/Quotations/Proforma Invoices and share with your parties by WhatsApp, Email or Printed copies."
            BelowText="You can convert them to Sale invoices later by just click of a button"
          />
        </div>
      )}
    </div>
  );
}
