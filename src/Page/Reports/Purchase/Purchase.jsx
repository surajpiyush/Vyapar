import css from "./Purchase.module.css";
import Loader2 from "../../../Component/Loaders/Loader2";
import Setting from "../../../Component/Setting/Setting";
import Loader3 from "../../../Component/Loaders/Loader3";
import RPLayout1 from "../../../Component/PrintLayouts/RPLayout1";
import RPLayout2 from "../../../Component/PrintLayouts/RPLayout2";
import InvoicePrint from "../../../Component/PrintLayouts/InvoicePrint";
import AddPurchaseBill from "../../Purchase/PurchaseBill/AddPurchaseBill";
import UpperControlPanel from "../../../Component/UpperControlPanel/UpperControlPanel";
import { GetAllItems } from "../../../Redux/items/actions";
import { REGULAR_PRINTER_DATA } from "../../../Redux/store";
import { TOGGLE_FALSE_INVOICE_SUCCESS } from "../../../Redux/sales/reducer";
import { FormatDate } from "../../../Redux/sales/action";
import {
  CloseIcon2,
  DeleteIcon2,
  EditIcon,
  PrintIcon2,
  PlusIcon2,
  SearchIcon,
  CalculatorIcon,
  SettingsIconOutline2,
  CrossIcon,
} from "../../../assets/Icons/ReactIcons";
import { GetPurchaseReport } from "../../../Redux/report/action";

import { useToast } from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Purchase = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  let printComponentRef = useRef();
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);
  const toggleAddPurchaseBill = useSelector(
    (store) => store.PurchaseReducer.toggleAddPurchaseBill
  );
  const LoadingGetPurchaseReport = useSelector(
    (store) => store.ReportReducer.isLoading
  );
  const purchaseReportData = useSelector(
    (store) => store.ReportReducer.purchaseReportData
  );
  const toggleGetPurchaseReportSuccess = useSelector(
    (store) => store.ReportReducer.toggleGetPurchaseReportSuccess
  );
  const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
  const loadingSingleInvoice = useSelector(
    (store) => store.SalesReducer.loadingSingleInvoice
  );
  const toggleSingleInvoiceSuccess = useSelector(
    (store) => store.SalesReducer.toggleSingleInvoiceSuccess
  );
  const SingleInvoiceData = useSelector(
    (store) => store.SalesReducer.SingleInvoiceData
  );

  //   This useEffect is written to get all items data to extract item names ********************************
  useEffect(() => {
    GetAllItems(dispatch);
  }, [toggleItems]);
  // ********************************************************************************8

  useEffect(() => {
    // console.log("purchaseReportData", purchaseReportData);
  }, [purchaseReportData]);

  // Calculate Paid and Unpaid upon successfull getting data
  useEffect(() => {
    let paid = 0;
    let unpaid = 0;
    purchaseReportData?.forEach((item) => {
      paid += item?.amount - item?.balanceDue || 0;
      unpaid += item?.balanceDue || 0;
    });
    setPaidAmount(paid);
    setUnpaidAmount(unpaid);
  }, [toggleGetPurchaseReportSuccess]);

  // To fetch Invoices data
  useEffect(() => {
    GetPurchaseReport(dispatch, startDate, endDate);
  }, [toggleAddPurchaseBill, startDate, endDate]);

  const formOpen = () => {
    setOpenForm(true);
  };

  // ***************************** Print ************************************
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onBeforePrint: () => dispatch(TOGGLE_FALSE_INVOICE_SUCCESS()),
  });
  const updateSalePrintSettings = useSelector(
    (store) => store.PurchaseReducer.updateSalePrintSettings
  );
  const [storedPrintData, setStoredPrintData] = useState(
    JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {}
  );
  // for updating printer settings
  useEffect(() => {
    const sessionStorageData =
      JSON.parse(sessionStorage.getItem(REGULAR_PRINTER_DATA)) || {};
    setStoredPrintData((prev) => {
      return { ...prev, ...sessionStorageData };
    });
  }, [updateSalePrintSettings]);
  // for updating print item details
  useEffect(() => {
    if (toggleSingleInvoiceSuccess == true) {
      handlePrint();
    }
  }, [toggleSingleInvoiceSuccess]);
  // *********************************************************************************

  return LoadingGetPurchaseReport ? (
    <Loader3 text="Loading Sale Report" />
  ) : (
    <div className={css.Outer}>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}

      {/* Print */}
      {loadingSingleInvoice ? (
        <Loader2 />
      ) : (
        <div
          style={{
            display: "none",
          }}
        >
          <div ref={printComponentRef}>
            {storedPrintData?.layoutIndex == 0 ? (
              <InvoicePrint currPrintItem={SingleInvoiceData} />
            ) : storedPrintData?.layoutIndex == 1 ? (
              <RPLayout2 currPrintItem={SingleInvoiceData} />
            ) : (
              <RPLayout1 currPrintItem={SingleInvoiceData} />
            )}
          </div>
        </div>
      )}

      {/* Add Purchase Bill Form */}
      {openForm && (
        <div className={css.formOuter}>
          <div className={css.upperNav}>
            <div>
              <p className={css.activeForm}>
                <span>Purchase Bill #1</span>
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
              <SettingsIconOutline2 onClick={() => setToggleSetting(true)} />
              <CloseIcon2 onClick={() => setOpenForm(false)} />
            </div>
          </div>
          <AddPurchaseBill
            setOpenForm={setOpenForm}
            // date={{ startDate, endDate }}
          />
        </div>
      )}

      {/* Top Nav */}
      <UpperControlPanel
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        showPaymentData={true}
        showPrintOptions={true}
        data={purchaseReportData}
        paidAmount={paidAmount}
        unpaidAmount={unpaidAmount}
        fileName={"Purchase_Report"}
      />

      {/* Middle */}
      <div className={css.ContentOuter}>
        <div className={css.contentUpperNav}>
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
            <button type="button" onClick={formOpen} className={css.addBtnCss}>
              <PlusIcon2 /> Add Purchase
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={css.contentTableOuterDiv}>
          <table>
            <thead>
              <tr>
                {[
                  "DATE",
                  "INVOICE NO.",
                  "PARTY NAME",
                  "TRANSACTION TYPE",
                  "PAYMENT TYPE",
                  "AMOUNT",
                  "BALANCE",
                ].map((item, ind) => (
                  <th key={item + ind}>
                    <div>{item}</div>
                  </th>
                ))}
              </tr>
            </thead>

            {!LoadingGetPurchaseReport && purchaseReportData?.length > 0 && (
              <tbody>
                {purchaseReportData?.map((item, ind) => (
                  <tr key={ind + item?._id}>
                    <td>
                      <div>{FormatDate(item?.invoiceDate)}</div>
                    </td>
                    <td>
                      <div>{item?.invoiceNumber}</div>
                    </td>
                    <td>
                      <div>{item?.partyName}</div>
                    </td>
                    <td>
                      <div>{item?.transactionType}</div>
                    </td>
                    <td>
                      <div>
                        {Array.isArray(item?.paymentType)
                          ? item?.paymentType
                              ?.map((payItem) =>
                                payItem.types ? payItem.types : "-"
                              )
                              .join(", ")
                          : "-"}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>₹{item?.amount}</div>
                    </td>
                    <td>
                      <div style={{ textAlign: "right" }}>
                        ₹{item?.balanceDue}
                      </div>
                    </td>
                    {/* <td>
                      <div>{item?.status}</div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!LoadingGetPurchaseReport && purchaseReportData?.length <= 0 && (
            <div className={css.noDataDiv}>
              <p>No transactions to show</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
