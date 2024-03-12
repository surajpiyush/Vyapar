import css from "../../../styles/SalesStyles/Invoice.module.css";
import party from "../../../assets/Images/party.jpg";
import InvoiceForm from "./InvoiceForm";
import TableInvoice from "./TableInvoice";
import EditableRow from "../../../Component/EditForm";
import Setting from "../../../Component/Setting/Setting";
import FirstTimeFormToggle from "../../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllSalesInvoice,
  deleteSalesInvoice,
} from "../../../Redux/sales/action";

import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCalculator as CalculatorIcon } from "react-icons/io5";
import { MdOutlineSettings as SettingIcon } from "react-icons/md";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { IoCloseOutline as CrossIcon } from "react-icons/io5";
import { IoSearch as SearchIcon } from "react-icons/io5";
import { FiPlusCircle as PlusIcon } from "react-icons/fi";
import { CiFilter as FilterIcon } from "react-icons/ci";
import ReactToPrint from "react-to-print";

export default function SalesInvoice() {
  let componentRef = useRef();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const toggleSalesSuccess = useSelector(
    (state) => state.SalesReducer.toggleSalesSuccess
  );
  const isLoading = useSelector((state) => state.SalesReducer.isLoading);
  const invoicesList = useSelector((state) => state.SalesReducer.invoicesList);

  useEffect(() => {
    GetAllSalesInvoice(dispatch, startDate, endDate);
  }, [toggleSalesSuccess, startDate, endDate, dispatch]);

  const formOpen = () => {
    setOpenForm(true);
  };

  // delete
  const handleDelete = (id) => {
    deleteSalesInvoice(dispatch, id);
  };

  const handleEdit = (_id) => {
    const data = invoicesList.filter((e) => e._id === _id);
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
    GetAllSalesInvoice(dispatch, startDate, endDate);
  };

  const handleCancel = () => {
    // If the user cancels, reset the state without saving
    setIsEditing(false);
    setEditedData(null);
  };
  const display = [
    "invoiceDate",
    "invoiceNumber",
    "partyName",
    "transactionType",
    "paymentType",
    "amount",
    "balanceDue",
    "duedate",
    "status",
    "hariom",
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      {/* <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef}
      />
      <div ref={(el) => (componentRef = el)} id="printForm">
        Hello
      </div> */}

      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Sale #1</span>
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
              <SettingIcon onClick={() => setToggleSetting(true)} />
              <CloseIcon onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <InvoiceForm
            setToggleSetting={setToggleSetting}
            setOpenForm={setOpenForm}
          />
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
                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                <span>Graph</span>
              </div>
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

      {/* Top Nav */}
      {invoicesList?.length ? (
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
                  <PlusIcon /> Add Sale
                </button>
              </div>
            </div>

            <div className={css.TabelOuterDivSaleOrder}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <div>
                        DATE
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        INVOICE NO.
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        PARTY NAME.
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        TRANSACTION TYPE
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        PAYMENT TYPE
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        AMOUNT
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        BALANCE DUE
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        DUE DATE
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>
                      <div>
                        STATUS
                        {/*  <FilterIcon /> */}
                      </div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {!isLoading &&
                    invoicesList?.map((item, ind) =>
                      isEditing && editedData?._id === item._id ? (
                        <tr
                          style={{
                            width: "82%",
                            position: "absolute",
                          }}
                        >
                          <EditableRow
                            display={display}
                            data={editedData}
                            onSave={handleSave}
                            onCancel={handleCancel}
                          />
                        </tr>
                      ) : (
                        <TableInvoice
                          {...item}
                          ind={ind}
                          item={item}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          key={ind + item?._id}
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
                  Loading Invoices...
                </h2>
              )}
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <h2
          style={{
            color: "green",
            textAlign: "center",
            margin: "20px auto",
          }}
        >
          Loading Invoices...
        </h2>
      ) : (
        <div>
          <FirstTimeFormToggle
            img={party}
            onClick={() => setOpenForm(true)}
            BtnText="Add Your First Sale Invoice"
            MiddleText="Make Sale invoices & Print or share with your customers directly via WhatsApp or Email."
          />
        </div>
      )}
    </div>
  );
}
