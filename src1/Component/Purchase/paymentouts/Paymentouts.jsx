import React, { useEffect, useState } from "react";
import "./Paymentouts.css";
import {
  DotsIcon,
  FilterIcon,
  PrinterIcon,
  ShareIcon,
} from "../../utils/reactIcons";
import {
  postPurchaseOut,
  getAllPurchaseOut,
  getAllPurchaseOutInvoice,
} from "../../../Redux/parties/actions.js";
import { useDispatch, useSelector } from "react-redux";

const Paymentouts = () => {
  const dispatch = useDispatch();
  const [showPostPurchaseOut, setShowPostPurchaseOut] = useState(true);
  const [showGetAllPurchaseOut, setShowGetAllPurchaseOut] = useState(false);
  const [
    showGetAllPurchaseOutInvoiceById,
    setShowGetAllPurchaseOutInvoiceById,
  ] = useState(false);

  const startDate = "2023-01-20";
  const endDate = "2024-02-24";

  const postData = {
    type: "Purchase-Out",
    status: "Pending",
    partyName: "Bhuvensh",
    receiptNumber: "RO123",
    date: "2024-02-16T00:00:00.000Z",
    time: "10:00 AM",
    description: "Purchase return of items",
    paymentType: [
      {
        cash: 0,
        cheque: {
          refreanceNo: "REF123",
          checkAmount: 150,
        },
        bankDetail: {
          accountName: "ABC Bank",
          openingBalance: 5000,
          asOfDate: "2024-02-16T00:00:00.000Z",
        },
        default: "cheque",
      },
    ],
    paid: 0,
    discount: 0,
    total: 0,
  };

  const { paymentOut } = useSelector((state) => ({ ...state }));

  const postPurchaseOutFunction = (postData) => {
    dispatch(postPurchaseOut(postData));
  };

  useEffect(() => {
    if (showPostPurchaseOut) {
      postPurchaseOutFunction(postData);
    }
  }, []);

  const getAllPurchaseOutFunction = () => {
    dispatch(getAllPurchaseOut(startDate, endDate));
  };

  useEffect(() => {
    if (showGetAllPurchaseOut) {
      getAllPurchaseOutFunction();
    }
  }, [showGetAllPurchaseOut]);

  const getAllPurchaseOutInvoiceByIdFunction = () => {
    dispatch(getAllPurchaseOutInvoice());
  };

  useEffect(() => {
    if (showGetAllPurchaseOutInvoiceById) {
      getAllPurchaseOutInvoiceByIdFunction();
    }
  }, [showGetAllPurchaseOutInvoiceById]);

  return (
    <>
      {JSON.stringify(paymentOut)}
      <div className="payment-out-container">
        <div className="transactions-buttons">
          <input type="text" />
          <button>
            <span>+</span> Add Payment-out
          </button>
          <button
            onClick={() => {
              setShowGetAllPurchaseOut(true);
            }}
          >
            setShowGetAllPurchaseOut
          </button>
          <button
            onClick={() => {
              setShowGetAllPurchaseOutInvoiceById(true);
            }}
          >
            ShowGetAllPurchaseOutInvoiceById
          </button>
        </div>

        <table className="table">
          {/* <thead className='table-head'> */}
          <tr className="tabel-row">
            <th className="table-h">
              <div className="table-items">#</div>
              <div></div>
            </th>
            <th className="table-h">
              <div className="table-items">Date</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">Ref No.</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">PartyName</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">CategoryName</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">Type</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">Total</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">Recevied</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">Balance</div>
              <FilterIcon />
            </th>
            <th className="table-h">
              <div className="table-items">Print</div>
              <FilterIcon />
            </th>
          </tr>
          {/* </thead> */}
          {/* <tbody> */}
          <tr className="tabel-row tale-data">
            <th className="table-h">
              <div className="table-items">1</div>
              <div></div>
            </th>
            <th className="table-h">
              <div className="table-items">10/02/2024</div>
            </th>
            <th className="table-h">
              <div className="table-items"></div>
            </th>
            <th className="table-h">
              <div className="table-items">jujk</div>
            </th>
            <th className="table-h">
              <div className="table-items"></div>
            </th>
            <th className="table-h">
              <div className="table-items">Payment-out</div>
            </th>
            <th className="table-h">
              <div className="table-items">₹0.00</div>
            </th>
            <th className="table-h">
              <div className="table-items">₹0.00</div>
            </th>
            <th className="table-h">
              <div className="table-items">₹0.00</div>
            </th>
            <th className="table-h">
              <div className="table-items">
                <PrinterIcon onClick={() => window.print()} />
                <ShareIcon />
                <DotsIcon />
              </div>
            </th>
          </tr>
          {/* </tbody> */}
        </table>
        <div className="payment-outs-footer">
          <p>
            Total Amount: <span>₹ 0.00</span>
          </p>
          <p>Balance: ₹0.00</p>
        </div>
      </div>
    </>
  );
};

export default Paymentouts;
