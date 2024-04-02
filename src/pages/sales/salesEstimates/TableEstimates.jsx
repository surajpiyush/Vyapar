import css from "./Estimate.module.css";
import { FormatDate } from "../../../Redux/sales/action";
import { EditIcon, DeleteIcon2 } from "../../../assets/Icons/ReactIcons";

const TableEstimates = ({
  _id,
  handleDelete,
  invoiceDate,
  refreanceNo,
  partyName,
  totalAmount,
  balanceDue,
  status,
  action,
  // transactionType,
  handleEdit,
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
        <div style={{ textAlign: "right" }}>₹{totalAmount}</div>
      </td>
      <td>
        <div style={{ textAlign: "right" }}>₹{balanceDue}</div>
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

export default TableEstimates;
