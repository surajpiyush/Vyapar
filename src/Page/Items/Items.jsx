import css from "./Items.module.css";
import AddItemForm from "./AddItemForm";
import party from "../../assets/Images/party.jpg";
import Setting from "../../Component/Setting/Setting";
import UnitForm from "../../components/addForm/UnitForm";
import UnitsTable from "../../components/TableData/UnitsTable";
import CategoryForm from "../../components/addForm/CategoryForm";
import ProductsTable from "../../components/TableData/ProductsTable";
import CategoryTable from "../../components/TableData/CategoryTable";
import StockAdjustment from "../../components/addForm/StockAdjustment";
import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import {
  GetAllCategories,
  GetAllUnits,
  getitems,
} from "../../Redux/items/actions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Items() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.ItemReducer.items);
  const category = useSelector((store) => store.ItemReducer.category);
  const unitList = useSelector((store) => store.ItemReducer.unit);
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const newCategoryAddedToggle = useSelector(
    (store) => store.ItemReducer.newCategoryAddedToggle
  );
  const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
  const newUnitAddedToggle = useSelector(
    (store) => store.ItemReducer.newUnitAddedToggle
  );
  const [openForm, setOpenForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [unitForm, setUnitForm] = useState(false);
  const [adjustItem, setAdjustItem] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [currPage, setCurrPage] = useState("PRODUCTS");

  // To Fetch All Items
  useEffect(() => {
    getitems(dispatch);
  }, [toggleItems]);

  // To Fetch All Categories
  useEffect(() => {
    GetAllCategories(dispatch);
  }, [newCategoryAddedToggle, toggleItems]);

  // To Fetch All Units
  useEffect(() => {
    GetAllUnits(dispatch);
  }, [newUnitAddedToggle]);

  const dataFromChild = (val) => {
    setOpenForm(val);
  };
  const openCategoryForm = () => {
    setCategoryForm(true);
  };
  const closeCategoryForm = () => {
    setCategoryForm(false);
  };
  const openUnitForm = () => {
    setUnitForm(true);
  };
  const closeUnitForm = () => {
    setUnitForm(false);
  };
  const closeAdjustForm = () => {
    setAdjustItem(false);
  };

  const data = [1];

  return (
    <div>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}
      {openForm && <AddItemForm CloseForm={setOpenForm} />}
      {categoryForm && <CategoryForm func={closeCategoryForm} />}
      {unitForm && <UnitForm func={closeUnitForm} />}
      {adjustItem && <StockAdjustment func={closeAdjustForm} />}

      {/* Toggle Current Item Page */}
      <div className={css.navOuter}>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrPage("PRODUCTS");
          }}
          style={{
            borderColor:
              currPage == "PRODUCTS" ? "var(--blueB)" : "transparent",
            color:
              currPage == "PRODUCTS" ? "var(--DeepBluishGrey)" : "var(--greyG)",
          }}
        >
          PRODUCTS
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrPage("CATEGORY");
          }}
          style={{
            borderColor:
              currPage == "CATEGORY" ? "var(--blueB)" : "transparent",
            color:
              currPage == "CATEGORY" ? "var(--DeepBluishGrey)" : "var(--greyG)",
          }}
        >
          CATEGORY
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrPage("UNIT");
          }}
          style={{
            borderColor: currPage == "UNIT" ? "var(--blueB)" : "transparent",
            color:
              currPage == "UNIT" ? "var(--DeepBluishGrey)" : "var(--greyG)",
          }}
        >
          UNIT
        </div>
      </div>

      {currPage == "PRODUCTS" ? (
        // PRODUCTS
        <div className="d-cen b-cont">
          {!items.length ? (
            <FirstTimeFormToggle
              img={party}
              onClick={() => setOpenForm(true)}
              BtnText="Add Your First Item"
              MiddleText="Add PRODUCTS/Items you sell or purchase to manage your full Stock Inventory."
            />
          ) : (
            <ProductsTable func={dataFromChild} />
          )}
        </div>
      ) : currPage == "CATEGORY" ? (
        // CATEGORY
        <div className="d-cen b-cont">
          {!category.length ? (
            <FirstTimeFormToggle
              img={party}
              onClick={() => openCategoryForm()}
              BtnText="Add Your First CATEGORY"
              MiddleText="Add CATEGORY you sell or purchase to manage your full Stock Inventory."
            />
          ) : (
            <div style={{ width: "100%" }}>
              <CategoryTable func={openCategoryForm} />
            </div>
          )}
        </div>
      ) : (
        // UNIT
        <div className="d-cen b-cont">
          {!unitList.length ? (
            <FirstTimeFormToggle
              img={party}
              onClick={() => setUnitForm(true)}
              BtnText="Add Your First Units"
              MiddleText="Add your customers & suppliers. Manage your business with them."
            />
          ) : (
            <div style={{ width: "100%" }}>
              <UnitsTable func={openUnitForm} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
