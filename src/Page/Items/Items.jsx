// import "../../styles/Items.css";
import css from "./Items.module.css";
import party from "../../assets/Images/party.jpg";
import Setting from "../../Component/Setting/Setting";
import ItemsForm from "../../components/addForm/ItemsForm";
import ProductsTable from "../../components/TableData/ProductsTable";
import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import { getitems } from "../../Redux/items/actions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Items() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.ItemReducer.items);
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
  const [openForm, setOpenForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);

  useEffect(() => {
    getitems(dispatch);
  }, [toggleItems]);

  const dataFromChild = (val) => {
    setOpenForm(val);
  };
  // setting icon click function
  const handleSettingClick = () => {
    setOpenForm(false);
    setToggleSetting(true);
  };
  return (
    <div>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}
      {openForm && (
        <ItemsForm
          handleSettingClick={handleSettingClick}
          closeForm={() => setOpenForm(false)}
        />
      )}

      <div className={css.navOuter}>
        <div className={css.navOptions}>Products</div>
      </div>

      {items.length != 0 && <ProductsTable func={dataFromChild} />}

      {items.length == 0 && (
        <FirstTimeFormToggle
          img={party}
          onClick={() => setOpenForm(true)}
          BtnText="Add Your First Item"
          MiddleText="Add Products/Items you sell or purchase to manage your full Stock Inventory."
        />
      )}
    </div>
  );
}
