import React, { useEffect, useState } from "react";
import "./Transactions.css";
import {
  DotsIcon,
  FilterIcon,
  PrinterIcon,
  ShareIcon,
} from "../../utils/reactIcons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postPurchaseBill,
  getPurchaseBill,
  getPurchaseInvoice,
} from "../../../Redux/parties/actions";

const transactionFilterItems = [
  {
    name: "DATE",
    Icon: <FilterIcon />,
    //   nestedItems
  },
];

const transcationsItems = [
  "11/01/2024",
  "",
  "gg",
  "cash",
  "0",
  "0",
  <PrinterIcon />,
  <ShareIcon />,
  <DotsIcon />,
];

const Transactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAllPurchaseBills, setShowAllPurchaseBills] = useState(false);
  const [showPurchaseInvoiceById, setshowPurchaseInvoiceById] = useState(false);

  // const startDate = "2023-01-20";
  // const endDate = "2024-02-24";

  const data_To_Send = {
    startDate: "2023-01-20",
    endDate: "2024-02-24",
  };

  const dataPost = {
    partyName: "Bhuvensh",
    phoneNumber: 1234567890,
    poNo: "PO123",
    poDate: "2024-02-16T00:00:00.000Z",
    eWayBill: "EWB123",
    billNumber: "BILL123",
    billDate: "2024-02-16T00:00:00.000Z",
    time: "10:00 AM",
    paymentTerms: "Net 30",
    dueDate: "2024-03-17T00:00:00.000Z",
    stateOfSupply: "Some State",
    priceUnitWithTax: true,
    sale: [
      {
        category: "Category1",
        itemName: "mobile",
        itemCode: "001",
        hsnCode: "HSN001",
        serialNo: "SN001",
        description: "Description of item 1",
        batchNo: 1,
        modelNo: 123,
        expDate: "2025-02-16T00:00:00.000Z",
        mfgDate: "2023-02-16T00:00:00.000Z",
        customField: "Custom field 1",
        size: "Large",
        qty: 10,
        unit: "pcs",
        priceUnit: 100,
        discountpersant: 5,
        discountAmount: 5,
        taxPersant: "12%",
        taxAmount: 12,
        amount: 950,
      },
    ],
    paymentType: [
      {
        cash: 800,
        cheque: {
          refreanceNo: "REF123",
          checkAmount: 150,
        },
        bankDetail: {
          accountName: "ABC Bank",
          openingBalance: 5000,
          asOfDate: "2024-02-16T00:00:00.000Z",
        },
        default: "cash",
      },
    ],
    addDescription: "Additional description here",
    discount: {
      discountPersent: 2,
      discountAmount: 2,
    },
    tax: {
      tax: "GST",
      taxamount: 10,
    },
    roundOff: 0,
    total: 950,
    paid: 950,
    balance: 0,
  };

  const state = useSelector((state) => state);

  const getpostPurchaseBill = () => {
    dispatch(postPurchaseBill(dataPost));
  };

  const allPurchaseBills = (data_To_Send) => {
    dispatch(getPurchaseBill(data_To_Send));
  };

  const getPurchaseInvoiceByid = () => {
    dispatch(getPurchaseInvoice());
  };

  useEffect(() => {
    getpostPurchaseBill();
  }, [dispatch]);

  useEffect(() => {
    if (showAllPurchaseBills) {
      allPurchaseBills(data_To_Send);
    }
  }, [showAllPurchaseBills]);

  useEffect(() => {
    if (showPurchaseInvoiceById) {
      getPurchaseInvoiceByid();
    }
  }, [showPurchaseInvoiceById]);

  return (
    <>
      {JSON.stringify(state)}
      <div className="transactions-container">
        <h4>Transactions</h4>
        <button
          onClick={() => setShowAllPurchaseBills(true)}
          className="transactions-buttons"
        >
          showAllPurchaseBills
        </button>
        <button
          onClick={() => setshowPurchaseInvoiceById(true)}
          className="transactions-buttons"
        >
          showPurchaseInvoiceById
        </button>
        <div className="transactions-buttons">
          <input type="text" />
          <button onClick={() => navigate("/addpurchase")}>
            <span>+</span> Add Purchase
          </button>
        </div>
        <section className="transaction-tables">
          <div className="transaction-table">
            <p>DATE</p>
            <FilterIcon />
          </div>
          <div className="transaction-table">
            <p>INVOICE NO.</p>
            <FilterIcon />
          </div>
          <div className="transaction-table">
            <p>PARTY NAME</p>
            <FilterIcon />
          </div>
          <div className="transaction-table">
            <p>PAYMENT TYPE</p>
            <FilterIcon />
          </div>
          <div className="transaction-table">
            <p>AMOUNT</p>
            <FilterIcon />
          </div>
          <div className="transaction-table">
            <p>BALANCE DUE</p>
            <FilterIcon />
          </div>
          <div className="transaction-table">
            <p></p>
            <FilterIcon />
          </div>
          <div className="transaction-table">
            <p></p>
            <FilterIcon />
          </div>
        </section>
        <section className="transaction-tables">
          <div className="transaction-table">
            <p>11/02/2014</p>
          </div>
          <div className="transaction-table">
            <p></p>
          </div>
          <div className="transaction-table">
            <p>gg</p>
          </div>
          <div className="transaction-table">
            <p>Cash</p>
          </div>
          <div className="transaction-table">
            <p>0</p>
          </div>
          <div className="transaction-table">
            <p>0</p>
          </div>
          <div className="transaction-table">
            <p>
              <PrinterIcon /> <ShareIcon />
            </p>
            {/* <FilterIcon/> */}
          </div>
          <div className="transaction-table">
            <p></p>
            <DotsIcon />
          </div>
        </section>
      </div>
    </>
  );
};

export default Transactions;
