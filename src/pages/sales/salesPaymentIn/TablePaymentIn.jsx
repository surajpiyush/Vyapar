import { FormatDate } from "../../../Redux/sales/action";

import { MdLocalPrintshop as PrintIcon } from "react-icons/md";
import { IoIosShareAlt as ShareIcon } from "react-icons/io";

const TablePaymentIn = ({
  ind,
  date,
  receiptNo,
  partyName,
  type,
  total,
  recived,
  balance,
  // duedate,
  // paymentType,
  //  status,
}) => {
  return (
    <tr>
      <td>
        <div>{ind + 1}</div>
      </td>
      <td>
        <div>{FormatDate(date)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{receiptNo}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div>{}</div>
      </td>
      <td>
        <div>{type}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{total}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{recived}</div>
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

export default TablePaymentIn;
