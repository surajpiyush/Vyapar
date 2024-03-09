import { DeleteIcon, EditIcon } from "../../../Component/utils/reactIcons";
import { FormatDate } from "../../../Redux/sales/action";

const TableEstimates = ({
  _id,handleDelete,
  invoiceDate,
  refreanceNo,
  partyName,
  totalAmount,
  balanceDue,
  status,
  action,
  // transactionType,
  handleEdit
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
      <td>
      <DeleteIcon onClick={() => handleDelete(_id)} />
      <p style={{ fontSize: "1.5rem" }}>
               <EditIcon onClick={() => handleEdit(_id)} />
            </p>
      </td>
    </tr>
  );
};

export default TableEstimates;
