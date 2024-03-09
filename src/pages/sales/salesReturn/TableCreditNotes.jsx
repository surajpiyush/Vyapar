import { FormatDate } from "../../../Redux/sales/action";

import { MdLocalPrintshop as PrintIcon } from "react-icons/md";
import { IoIosShareAlt as ShareIcon } from "react-icons/io";
import { DeleteIcon,EditIcon} from "../../../Component/utils/reactIcons";

const TableCreditNotes = ({
   _id,
   handleDelete,
   ind,
   date,
   refNo,
   partyName,
   categoryName,
   type,
   total,
   paidAmount,
   balance,
   // paymentType,
   status,
   handleEdit  
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
         <td>
            <DeleteIcon onClick={() => handleDelete(_id)} />
      <EditIcon onClick={() => handleEdit(_id)} />

         </td>
      </tr>
   );
};

export default TableCreditNotes;
