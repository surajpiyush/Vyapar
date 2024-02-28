import { FormatDate } from "../../../Redux/sales/action";

const TableDeliveryChallan = ({
  invoiceDate,
  partyName,
  challanNumber,
  dueDate,
  amount,
  status,
  action,
}) => {
  return (
    <tr>
      <td>
        <div>{FormatDate(invoiceDate)}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div>{challanNumber}</div>
      </td>
      <td>
        <div>{FormatDate(dueDate)}</div>
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
