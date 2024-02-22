// import "../../../styles/parties.css";
// import "../../../styles/sales.css";
import css from "../../../styles/SalesStyles/Invoice.module.css";
import party from "../../../assets/Images/party.jpg";
import InvoiceForm from "./InvoiceForm";
import SalesInvoiceTable from "../../../components/TableData/SalesInvoiceTable";
import SalesInvoiceForm from "../../../components/addForm/SalesInvoiceForm";

import React, { useEffect, useState } from "react";
import FirstTimeFormToggle from "../../../Component/FirstTimeFormToggle";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSalesInvoice } from "../../../Redux/sales/action";
import { useToast } from "@chakra-ui/react";

export default function SalesInvoice() {
  const toast = useToast();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const toggleSalesSuccess = useSelector(
    (state) => state.SalesReducer.toggleSalesSuccess
  );
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const invoicesList = useSelector((state) => state.SalesReducer.invoicesList);
  const data = [];

  useEffect(() => {
    const startDate = "2024-02-09";
    const currentDateObj = new Date();
    const formattedCurrentDate = currentDateObj.toISOString().split("T")[0];
    GetAllSalesInvoice(dispatch, startDate, endDate);
    //  console.log("invoicesList", invoicesList);
  }, [toggleSalesSuccess, startDate, endDate]);

  useEffect(() => {
    const defaultDateString = "2024-03-10";
    setStartDate(defaultDateString);

    const currentDateObj = new Date();
    const formattedCurrentDate = currentDateObj.toISOString().split("T")[0];
    setEndDate(formattedCurrentDate);
  }, []);

  const [openForm, setOpenForm] = useState(false);

  const closeForm = () => {
    setOpenForm(false);
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  return (
    <div>
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="invoice-input"
                  />
                  <span>To</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="invoice-input"
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
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span>Graph</span>
              </div>
              <div className="d-flex-col">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span>Excel Report</span>
              </div>
              <div className="d-flex-col">
                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                <span>Print</span>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ gap: "20px", marginTop: "20px" }}>
            <div
              style={{
                backgroundColor: "Coral",
                padding: "12px 30px",
                color: "white",
                borderRadius: "10px",
              }}
            >
              <span>Paid</span>
              <br />
              <span>$ 0.00</span>
            </div>
            +
            <div
              style={{
                backgroundColor: "Pink",
                padding: "12px 30px",
                color: "white",
                borderRadius: "10px",
              }}
            >
              <span>Unpaid</span>
              <br />
              <span>$ 0.00</span>
            </div>
            =
            <div
              style={{
                backgroundColor: "lightgreen",
                padding: "12px 30px",
                color: "white",
                borderRadius: "10px",
              }}
            >
              <span>Total</span>
              <br />
              <span>$ 0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      {isLoading && <p>Loading Invoices</p>}
      <div>
        <div>
          {openForm ? (
            <div className={css.formOuter}>
              <div className={css.upperNav}>
                <div>
                  <p className={css.activeForm}>
                    <span>Sale #1</span>
                    <CrossIcon />
                  </p>
                </div>
                <div>
                  <CalculatorIcon />
                  <SettingIcon />
                  <CloseIcon onClick={() => setOpenForm(false)} />
                </div>
              </div>
              <InvoiceForm setOpenForm={setOpenForm} />
            </div>
          ) : (
            <div className="d-cen b-cont text-center">
              {!invoicesList.length > 0 ? (
                <FirstTimeFormToggle
                  img={party}
                  onClick={() => setOpenForm(true)}
                  BtnText="Add Your First Sale Invoice"
                  MiddleText="Make Sale invoices & Print or share with your customers directly via WhatsApp or Email."
                />
              ) : (
                <div className={css.Outer}>
                  {!isLoading && <SalesInvoiceTable func={formOpen} />}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
