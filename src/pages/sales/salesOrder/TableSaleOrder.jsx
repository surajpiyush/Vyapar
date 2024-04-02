import css from "./Order.module.css";
import { FormatDate } from "../../../Redux/sales/action";
import { EditIcon, DeleteIcon2 } from "../../../assets/Icons/ReactIcons";

const TableSaleOrder = ({
  _id,
  handleDelete,
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
  handleEdit,
  // paymentType,
}) => {
  return (
    <tr>
      <td>
        <div>{FormatDate(date)}</div>
      </td>
      <td>
        <div>{no}</div>
      </td>
      <td>
        <div>{FormatDate(dueDate)}</div>
      </td>
      <td>
        <div>{partyName}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>₹{total}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>₹{balance}</div>
      </td>
      <td>
        <div>{type}</div>
      </td>
      <td>
        <div>{status}</div>
      </td>
      {/* <td>
        <div>{action}</div>
      </td> */}
      <td>
        <div className={css.actionDivContent}>
          <DeleteIcon2 onClick={() => handleDelete(_id)} />
          <EditIcon onClick={() => handleEdit(_id)} />
        </div>
      </td>
    </tr>
  );
};

export default TableSaleOrder;
