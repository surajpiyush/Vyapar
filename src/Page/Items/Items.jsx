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
import { GetAllCategories, getitems } from "../../Redux/items/actions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Items() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.ItemReducer.items);
  const category = useSelector((store) => store.ItemReducer.category);
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const newCategoryAddedToggle = useSelector(
    (store) => store.ItemReducer.newCategoryAddedToggle
  );
  const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
  const [openForm, setOpenForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [unitForm, setUnitForm] = useState(false);
  const [adjustItem, setAdjustItem] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [currPage, setCurrPage] = useState("Products");

  // To Fetch All Items
  useEffect(() => {
    getitems(dispatch);
  }, [dispatch, toggleItems]);

  // To Fetch All Items
  useEffect(() => {
    GetAllCategories(dispatch);
  }, [newCategoryAddedToggle]);

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
            setCurrPage("Products");
          }}
        >
          Products
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrPage("Category");
          }}
        >
          Category
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            setCurrPage("Unit");
          }}
        >
          Unit
        </div>
      </div>

      {currPage == "Products" ? (
        // Products
        <div className="d-cen b-cont">
          {!items.length ? (
            <FirstTimeFormToggle
              img={party}
              onClick={() => setOpenForm(true)}
              BtnText="Add Your First Item"
              MiddleText="Add Products/Items you sell or purchase to manage your full Stock Inventory."
            />
          ) : (
            <ProductsTable func={dataFromChild} />
          )}
        </div>
      ) : currPage == "Category" ? (
        // Category
        <div className="d-cen b-cont">
          {!category.length ? (
            <FirstTimeFormToggle
              img={party}
              onClick={() => openCategoryForm()}
              BtnText="Add Your First Category"
              MiddleText="Add Category you sell or purchase to manage your full Stock Inventory."
            />
          ) : (
            <div className="" style={{ width: "100%" }}>
              <CategoryTable func={openCategoryForm} />
            </div>
          )}
        </div>
      ) : (
        // Unit
        <div className="d-cen b-cont">
          {!(data.length > 0) ? (
            <div className="">
              <div className="">
                <img src={party} alt="" className="party-img" />
                <p>
                  Add your customers & suppliers. Manage your business with
                  them.
                </p>
                <button className="party-button" onClick={openUnitForm}>
                  Add Your First Units
                </button>
              </div>
            </div>
          ) : (
            <div className="" style={{ width: "100%" }}>
              <UnitsTable func={openUnitForm} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
