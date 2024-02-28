import { FormatDate } from "../../../Redux/sales/action";

const TableSaleOrder = ({
  ind,
  partyName,
  no,
  date,
  dueDate,
  total,
  balance,
  type,
  status,
  action,
  // paymentType,
}) => {
  return (
    <tr>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div>{no}</div>
      </td>
      <td>
        <div>{FormatDate(date)}</div>
      </td>
      <td>
        <div>{FormatDate(dueDate)}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{total}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>{balance}</div>
      </td>
      <td>
        <div>{type}</div>
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

export default TableSaleOrder;
