import { DeleteIcon, EditIcon } from "../../../Component/utils/reactIcons";
import { FormatDate } from "../../../Redux/sales/action";

const TableInvoice = ({
   _id,
   invoiceDate,
   invoiceNumber,
   partyname,
   transactionType,
   paymentType,
   amount,
   balanceDue,
   status,
   dueDate = new Date().toISOString().split("T")[0],
   handleDelete,
   handleEdit,
}) => {
   return (
      <tr>
         <td>
            <div>{FormatDate(invoiceDate)}</div>
         </td>
         <td>
            <div style={{ textAlign: "right" }}>{invoiceNumber}</div>
         </td>
         <td>
            <div>{partyname}</div>
         </td>
         <td>
            <div>{transactionType}</div>
         </td>
         <td>
            <div>{paymentType[0]?.types}</div>
         </td>
         <td>
            <div style={{ textAlign: "right" }}>{amount}</div>
         </td>
         <td>
            <div style={{ textAlign: "right" }}>{balanceDue}</div>
         </td>
         <td>
            <div>{dueDate}</div>
         </td>
         <td>
            <div>{status}</div>
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

export default TableInvoice;
