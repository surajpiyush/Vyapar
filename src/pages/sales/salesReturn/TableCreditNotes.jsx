import { MdLocalPrintshop as PrintIcon } from "react-icons/md";
import { IoIosShareAlt as ShareIcon } from "react-icons/io";

const TableCreditNotes = ({
  ind,
  dueDate,
  refNo,
  partyName,
  categoryName,
  type,
  total,
  paidAmount,
  balance,
  // paymentType,
  status,
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
        <div>{ind + 1}</div>
      </td>
      <td>
        <div>{formatDate(dueDate)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{refNo}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div>{categoryName}</div>
      </td>
      <td>
        <div>{type}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{total}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{paidAmount}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{balance}</div>
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PrintIcon />
          <ShareIcon />
        </div>
      </td>
      <td></td>
    </tr>
  );
};

export default TableCreditNotes;
