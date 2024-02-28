import React from "react";

const TableDeliveryChallan = ({
  invoiceDate,
  partyName,
  challanNumber,
  dueDate,
  amount,
  status,
  action,
}) => {
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
    <tr>
      <td>
        <div>{formatDate(invoiceDate)}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div>{challanNumber}</div>
      </td>
      <td>
        <div>{formatDate(dueDate)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{amount}</div>
      </td>
      <td>
        <div>{status}</div>
      </td>
      <td>
        <div>{action}</div>
      </td>

      <td></td>
    </tr>
  );
};

export default TableDeliveryChallan;
