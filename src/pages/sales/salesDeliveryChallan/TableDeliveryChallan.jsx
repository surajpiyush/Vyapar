import { DeleteIcon, EditIcon } from "../../../Component/utils/reactIcons";
import { FormatDate } from "../../../Redux/sales/action";

const TableDeliveryChallan = ({
  _id,handleDelete,
  invoiceDate,
  partyName,
  challanNumber,
  dueDate,
  amount,
  status,
  action,
  handleEdit
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

      <td>
      <DeleteIcon onClick={() => handleDelete(_id)} />
      <EditIcon onClick={() => handleEdit(_id)} />

      </td>
    </tr>
  );
};

export default TableDeliveryChallan;
