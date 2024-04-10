import css from "../../pages/sales/SalesForms.module.css";
import { DeleteIcon3, MoveIcon } from "../../assets/Icons/ReactIcons";

import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { Menu, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";

const WithOutGstItemRow = memo(
  ({ ind, item, currItemIndex, setCurrItemIndex, handleDeleteRow }) => {
    const dispatch = useDispatch();
    const [foundItems, setFoundItems] = useState([]);
    const isLoading = useSelector((state) => state.ExpenseReducer.isLoading);
    const itemsList = useSelector((state) => state.ExpenseReducer.itemsData);

    return (
      <tr
        onClick={() => setCurrItemIndex(ind)}
        style={{
          background: ind % 2 == 0 ? "var(--greyishBlue)" : "var(--greyB)",
        }}
      >
        <td
          className={css.serialNumberBody}
          onClick={() => setCurrItemIndex(ind)}
        >
          <div>
            <MoveIcon className={css.serialIconsBody} />
            <p>{ind + 1}</p>
            <DeleteIcon3
              onClick={(e) => handleDeleteRow(e, ind)}
              className={css.serialIconsBody}
            />
          </div>
        </td>
      </tr>
    );
  }
);

export default WithOutGstItemRow;
