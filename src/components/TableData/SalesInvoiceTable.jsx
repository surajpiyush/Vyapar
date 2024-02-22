import React, { useEffect, useState } from "react";
import "../../styles/parties.css";
import "../../styles/sales.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSalesInvoice } from "../../Redux/sales/action";

export default function SalesInvoiceTable(Props) {
  const isError = useSelector((state) => state.SalesReducer.isError);
  const invoicesList = useSelector((state) => state.SalesReducer.invoicesList);

  const openForm = () => {
    console.log("Working");
    Props.func(true);
  };

  function formatDate(dateString) {
    // Convert the string to a Date object
    const date = new Date(dateString);

    // Extract the year, month, and day from the Date object
    const year = date.getFullYear();
    // Note: getMonth() returns 0-indexed months, so you need to add 1 to get the correct month
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Format the date in the desired form
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  }

  return (
    <div className="" style={{ width: "100vw" }}>
      <div className="d-flex">
        <div className="grp-cont2">
          <div className="grp-cont2b">
            <div className="d-between">
              <h3>Transactions</h3>
              <button className="add-party-btn add-sale-btn" onClick={openForm}>
                + Add Sale
              </button>
            </div>
            <div style={{ textAlign: "start" }}>
              <input
                type="text"
                placeholder="Search"
                className="search-party"
                style={{ width: "200px" }}
              />
            </div>
            <div className="" style={{ marginTop: "30px" }}>
              {isError ? (
                <p
                  style={{
                    color: "red",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  No invoice data available for the specified dates!
                </p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>
                        Date <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Invoice Number <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Party Name <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Transaction Type <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Payment Type <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Amount <i className="fa fa-filter"></i>
                      </th>
                      <th>
                        Balance Due <i className="fa fa-filter"></i>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoicesList?.map((item, ind) => (
                      <tr key={ind + item?._id}>
                        <th>{formatDate(item?.invoiceDate)}</th>
                        <th>{item?.invoiceNumber}</th>
                        <th>{item?.partyName}</th>
                        <th>{item?.transactionType}</th>
                        {/* <th>{item?.paymentType[0]}</th> */}
                        <th>{item?.amount}</th>
                        <th>{item?.balanceDue}</th>
                      </tr>
                    ))}

                    {/* 
                  
                  amount
: 
195
balanceDue
: 
-155
dueDate
: 
"2024-03-10T00:00:00.000Z"
invoiceDate
: 
"2024-02-09T00:00:00.000Z"
invoiceNumber
: 
"INV123"
partyName
: 
"ajay"
paymentType
: 
[]
status
: 
"Partial"
transactionType
: 
"Credit"
_id
: 
"65d772b69b77ac88b7fff575"
                  
                  */}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
