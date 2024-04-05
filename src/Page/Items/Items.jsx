import css from "./Items.module.css";
import AddItemForm from "./AddItemForm";
import party from "../../assets/Images/party.jpg";
import Loader3 from "../../Component/Loaders/Loader3";
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
  GetAllItems,
  GetAllUnits,
} from "../../Redux/items/actions";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Items() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [adjustItem, setAdjustItem] = useState(false);
  const [currPage, setCurrPage] = useState(
    searchParams.get("true") || "PRODUCTS"
  );
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  // Items
  const itemsList = useSelector((store) => store.ItemReducer.items);
  const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
  const getAllItemsLoading = useSelector(
    (store) => store.ItemReducer.getAllItemsLoading
  );

  // Category
  const categoriesList = useSelector((store) => store.ItemReducer.category);
  const newCategoryAddedToggle = useSelector(
    (store) => store.ItemReducer.newCategoryAddedToggle
  );
  const loadingGetAllCategories = useSelector(
    (store) => store.ItemReducer.loadingGetAllCategories
  );

  // Unit
  const unitList = useSelector((store) => store.ItemReducer.unit);
  const newUnitAddedToggle = useSelector(
    (store) => store.ItemReducer.newUnitAddedToggle
  );
  const loadingGetAllUnits = useSelector(
    (store) => store.ItemReducer.loadingGetAllUnits
  );

  // Fetch Items Data
  useEffect(() => {
    GetAllItems(dispatch);
  }, [toggleItems]);

  // To Fetch All Categories
  useEffect(() => {
    GetAllCategories(dispatch);
  }, [newCategoryAddedToggle]);

  // To Fetch All Units
  useEffect(() => {
    GetAllUnits(dispatch);
  }, [newUnitAddedToggle]);

  useEffect(() => {
    setSearchParams({ true: currPage });
  }, [currPage]);

  return (
    <div>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}
      {showAddItemForm && <AddItemForm CloseForm={setShowAddItemForm} />}
      {showAddCategoryForm && <CategoryForm func={setShowAddCategoryForm} />}
      {showUnitForm && <UnitForm func={setShowUnitForm} />}
      {adjustItem && <StockAdjustment func={setAdjustItem} />}

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
        <div className={css.Outer}>
          {getAllItemsLoading ? (
            <Loader3 text="Loading Products" />
          ) : itemsList.length > 0 ? (
            <ProductsTable showAddForm={setShowAddItemForm} />
          ) : (
            <FirstTimeFormToggle
              height="100%"
              img={party}
              onClick={() => setShowAddItemForm(true)}
              BtnText="Add Your First Item"
              MiddleText="Add Products/Items you sell or purchase to manage your full Stock Inventory."
            />
          )}
        </div>
      ) : currPage == "CATEGORY" ? (
        // CATEGORY
        <div className={css.Outer}>
          {loadingGetAllCategories ? (
            <Loader3 text="Loading Categories" />
          ) : categoriesList.length > 0 ? (
            <CategoryTable showAddForm={setShowAddCategoryForm} />
          ) : (
            <FirstTimeFormToggle
              height="100%"
              img={party}
              onClick={() => setShowAddCategoryForm(true)}
              BtnText="Add Your First Category"
              MiddleText="Add Categories you sell or purchase to manage your full Stock Inventory."
            />
          )}
        </div>
      ) : (
        // UNIT
        <div className={css.Outer}>
          {loadingGetAllUnits ? (
            <Loader3 text="Loading Units" />
          ) : unitList.length > 0 ? (
            <UnitsTable showAddForm={setShowAddCategoryForm} />
          ) : (
            <FirstTimeFormToggle
              height="100%"
              img={party}
              onClick={() => setShowUnitForm(true)}
              BtnText="Add Your First Unit"
              MiddleText="Add your customers & suppliers. Manage your business with them."
            />
          )}
        </div>
      )}
    </div>
  );
}
