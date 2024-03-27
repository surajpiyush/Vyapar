// import "../../styles/Items.css";
import css from "./Items.module.css";
import party from "../../assets/Images/party.jpg";
import Setting from "../../Component/Setting/Setting";
import UnitForm from "../../components/addForm/UnitForm";
import ItemsForm from "../../components/addForm/ItemsForm";
import UnitsTable from "../../components/TableData/UnitsTable";
import CategoryForm from "../../components/addForm/CategoryForm";
import ProductsTable from "../../components/TableData/ProductsTable";
import ServicesTable from "../../components/TableData/ServicesTable";
import CategoryTable from "../../components/TableData/CategoryTable";
import StockAdjustment from "../../components/addForm/StockAdjustment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FirstTimeFormToggle from "../../Component/FirmTimeForm/FirstTimeFormToggle";
import { getCategory, getitems } from "../../Redux/items/actions";

export default function Items() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.ItemReducer.items);
  const category = useSelector((store) => store.ItemReducer.category);
  const isLoading = useSelector((store) => store.ItemReducer.isLoading);
  const toggleItems = useSelector((store) => store.ItemReducer.toggleItems);
  const [firstSec, setFirstSec] = useState(true);
  const [secondSec, setSecondSec] = useState(false);
  const [thirdSec, setThirdSec] = useState(false);
  const [fourthSec, setFourthSec] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [unitForm, setUnitForm] = useState(false);
  const [adjustItem, setAdjustItem] = useState(false);
  const [opt, setOpt] = useState(true);
  const [toggleSetting, setToggleSetting] = useState(false);

  useEffect(() => {
    getitems(dispatch);
  }, [toggleItems]);

  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch, categoryForm]);

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

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

  const openAdjustForm = () => {
    setAdjustItem(true);
  };

  const closeAdjustForm = () => {
    setAdjustItem(false);
  };

  const data = [1];

  const openSection = (val) => {
    console.log("working val", val);
    if (val === 0) {
      setFirstSec(true);
      setSecondSec(false);
      setThirdSec(false);
      setFourthSec(false);
    } else if (val === 1) {
      setFirstSec(false);
      setSecondSec(true);
      setThirdSec(false);
      setFourthSec(false);
    } else if (val === 2) {
      setFirstSec(false);
      setSecondSec(false);
      setThirdSec(true);
      setFourthSec(false);
    } else {
      setFirstSec(false);
      setSecondSec(false);
      setThirdSec(false);
      setFourthSec(true);
    }
  };

  // setting icon click function
  const handleSettingClick = () => {
    setOpenForm(false);
    setToggleSetting(true);
  };
  console.log(category);
  return (
    <div>
      {toggleSetting && <Setting setToggleSetting={setToggleSetting} />}
      {openForm && (
        <ItemsForm
          handleSettingClick={handleSettingClick}
          closeForm={() => setOpenForm(false)}
        />
      )}
      {categoryForm && <CategoryForm func={closeCategoryForm} />}
      {unitForm && <UnitForm func={closeUnitForm} />}
      {adjustItem && <StockAdjustment func={closeAdjustForm} />}
      <div className={css.navOuter}>
        <div
          className={css.navOptions}
          onClick={() => {
            openSection(0);
          }}
        >
          Products
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            openSection(2);
          }}
        >
          Category
        </div>
        <div
          className={css.navOptions}
          onClick={() => {
            openSection(3);
          }}
        >
          Unit
        </div>
      </div>

      <div>
        <div>
          {firstSec && (
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
          )}
          {/*           
               {secondSec && (
                  <div>
                     {!(data.length > 0) ? (
                      <FirstTimeFormToggle
                           img={party}
                           onClick={() => setOpenForm(true)}
                           BtnText="Add Your First Category"
                           MiddleText="Add Category you sell or purchase to manage your full Stock Inventory."
                        />
                     ) : (
                        <div className="" style={{ width: "100%" }}>
                           <ServicesTable func={dataFromChild} />
                        </div>
                     )}
                  </div>
               )} */}
          {thirdSec && (
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
          )}
          {fourthSec && (
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
      </div>
    </div>
  );
}
