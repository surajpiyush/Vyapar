import { FormatDate } from "../../../Redux/sales/action";

const TableEstimates = ({
  invoiceDate,
  refreanceNo,
  partyName,
  totalAmount,
  balanceDue,
  status,
  action,
  // transactionType,
}) => {
  return (
    <tr>
      <td>
        <div>{FormatDate(invoiceDate)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{refreanceNo}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{totalAmount}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{balanceDue}</div>
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

export default TableEstimates;
