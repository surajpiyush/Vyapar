import css from "./EditForm.module.css";

import { useState } from "react";

const EditableRow = ({ display, data, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState(data);
  // console.log("editedAbleData; -", editedData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className={css.EditableOuter}
      // className="transaction-tables edit-mode"
    >
      {display.includes("#") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="#"
            value={"#"}
            readOnly
            className={css.inputCss}
            // style={{
            //   backgroundColor: "#f4f4f4",
            //   color: "#888",
            //   border: "1px solid #ddd",
            //   cursor: "not-allowed",
            // }}
          />
        </div>
      ) : (
        ""
      )}
      {/* sale */}
      {display.includes("invoiceDate") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="invoiceDate"
            value={new Date(editedData?.invoiceDate).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            )}
            //    onChange={handleInputChange}
            className={css.inputCss}
            readOnly
            // style={{
            //   backgroundColor: "#f4f4f4",
            //   color: "#888",
            //   border: "1px solid #ddd",
            //   cursor: "not-allowed",
            // }}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("invoiceNumber") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="invoiceNumber"
            value={editedData.invoiceNumber}
            className={css.inputCss}
            readOnly
            // style={{
            //   backgroundColor: "#f4f4f4",
            //   color: "#888",
            //   border: "1px solid #ddd",
            //   cursor: "not-allowed",
            // }}
          />
        </div>
      ) : (
        ""
      )}

      {display.includes("billDate") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="billDate"
            value={new Date(editedData.billDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            //    onChange={handleInputChange}
            className={css.inputCss}
            readOnly
            // style={{
            //   backgroundColor: "#f4f4f4",
            //   color: "#888",
            //   border: "1px solid #ddd",
            //   cursor: "not-allowed",
            // }}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("date") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="date"
            value={new Date(editedData.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            className={css.inputCss}
            //    onChange={handleInputChange}
            readOnly
            // style={{
            //   backgroundColor: "#f4f4f4",
            //   color: "#888",
            //   border: "1px solid #ddd",
            //   cursor: "not-allowed",
            // }}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("orderNumber") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="orderNumber"
            value={editedData.orderNumber}
            readOnly
            className={css.inputCss}
            // style={{
            //   backgroundColor: "#f4f4f4",
            //   color: "#888",
            //   border: "1px solid #ddd",
            //   cursor: "not-allowed",
            // }}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("refNo") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="refNo"
            value={
              editedData?.refNo ||
              editedData?.refreanceNo ||
              editedData?.receiptNo ||
              editedData.no
            }
            className={css.inputCss}
            handleInputChange={handleInputChange}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("billNumber") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="invoice"
            value={editedData.billNumber}
            onChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("duedatee") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="date"
            value={new Date(editedData.dueDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            className={css.inputCss}
            //    onChange={handleInputChange}
            readOnly
            style={{
              backgroundColor: "#f4f4f4",
              color: "#888",
              border: "1px solid #ddd",
              cursor: "not-allowed",
            }}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("partyName") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="partyName"
            value={editedData.partyName || editedData.partyname}
            onChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("challanNo") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="challanNumber"
            value={editedData.challanNumber}
            onChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("transactionType") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="transactionType"
            value={editedData.transactionType}
            onChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("dueDate") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="dueDate"
            value={new Date(editedData.dueDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            onChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("categoryName") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="categotyName"
            value={editedData.categotyName}
            handleInputChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}

      {display.includes("type") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="type"
            value={editedData.type}
            handleInputChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("total") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="total"
            value={editedData.total}
            handleInputChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("recieved") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="recieved"
            value={editedData.recieved || editedData.recived}
            handleInputChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("balance") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="balance"
            value={editedData.balance}
            handleInputChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("paymentType") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="paymentType"
            value={editedData.paymentType[0].type || "cash"}
            onChange={handleInputChange}
            readOnly
            className={css.inputCss}
            // style={{
            //   backgroundColor: "#f4f4f4",
            //   color: "#888",
            //   border: "1px solid #ddd",
            //   cursor: "not-allowed",
            // }}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("amount") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="amount"
            value={editedData.amount || editedData?.totalAmount}
            onChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("balanceDue") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="balanceDue"
            value={
              editedData.status === "Paid"
                ? 0
                : (editedData.amount || editedData.totalAmount) -
                  (editedData.balanceAmount || 0)
            }
            className={css.inputCss}
            // value={editedData.balanceDue}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        ""
      )}

      {display.includes("duedate") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="dueDate"
            value={new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            className={css.inputCss}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        ""
      )}
      {display.includes("typee") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="type"
            value={editedData.type}
            handleInputChange={handleInputChange}
            className={css.inputCss}
          />
        </div>
      ) : (
        ""
      )}

      {display.includes("statuss") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <input
            type="text"
            name="status"
            value={editedData.status}
            className={css.inputCss}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        ""
      )}

      {display.includes("status") ? (
        <div
          className={css.inputContDiv}
          //className="transaction-table"
        >
          <select
            name="status"
            value={editedData.status}
            onChange={handleInputChange}
            className={css.inputCss}
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      ) : (
        ""
      )}
      <div
        className={css.BtnCont}
        // className="transaction-table"
      >
        {/* Save and Cancel buttons */}
        <button
          onClick={() => {
            editedData.partyName = "65f03dbfea4408e949bac492";
            onSave(editedData);
          }}
          className={css.updateBtn}
        >
          Update
        </button>
        <button
          //className="cancel"
          onClick={onCancel}
          className={css.deleteBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditableRow;
