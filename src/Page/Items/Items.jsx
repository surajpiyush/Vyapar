import React, { useState } from "react";
                                             import "../../Css/Items.css"
import ItemsForm from "../../Component/addForm/ItemsForm";
import ProductsTable from "../../Component/TableData/ProductsTable";
import ServicesTable from "../../Component/TableData/ServicesTable";
import party from "../../assets/Images/party.jpg";
import CategoryTable from "../../Component/TableData/CategoryTable";
import UnitsTable from "../../Component/TableData/UnitsTable";
import CategoryForm from "../../Component/addForm/CategoryForm";
import UnitForm from "../../Component/addForm/UnitForm";
import StockAdjustment from "../../Component/addForm/StockAdjustment";

export default function Items() {
  const [firstSec, setFirstSec] = useState(true);
  const [secondSec, setSecondSec] = useState(false);
  const [thirdSec, setThirdSec] = useState(false);
  const [fourthSec, setFourthSec] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);
  const [unitForm, setUnitForm] = useState(false);
  const [adjustItem, setAdjustItem] = useState(false);

  const toggleForm = () => {
    setOpenForm(!openForm);
  };

  const dataFromChild = (val) => {
    setOpenForm(val);
  };

  const closeServiceProductForm = () => {
    setOpenForm(false);
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

  return (
    <div>
      {openForm && <ItemsForm func={closeServiceProductForm} />}
      {categoryForm && <CategoryForm func={closeCategoryForm} />}
      {unitForm && <UnitForm func={closeUnitForm} />}
      {adjustItem && <StockAdjustment func={closeAdjustForm} />}
      <div className="nav">
        <div
          className="nav-opt"
          onClick={() => {
            openSection(0);
          }}
        >
          Products
        </div>
        <div
          className="nav-opt"
          onClick={() => {
            openSection(1);
          }}
        >
          Services
        </div>
        <div
          className="nav-opt"
          onClick={() => {
            openSection(2);
          }}
        >
          Category
        </div>
        <div
          className="nav-opt"
          onClick={() => {
            openSection(3);
          }}
        >
          Units
        </div>
      </div>
      <div className="">
        <div className="">
          {firstSec && (
            <div className="d-cen b-cont">
              {!(data.length > 0) ? (
                <div className="">
                  <div className="">
                    <img src={party} alt="" className="party-img" />
                    <p>
                      Add Products/Items you sell or purchase to manage your
                      full Stock Inventory.
                    </p>
                    <button className="party-button" onClick={toggleForm}>
                      Add Your First Product
                    </button>
                  </div>
                </div>
              ) : (
                <div className="" style={{width:"100%"}}>
                  <ProductsTable
                    func={dataFromChild}
                    adjustForm={openAdjustForm}
                  />
                </div>
              )}
            </div>
          )}
          {secondSec && (
            <div className="d-cen b-cont">
              {!(data.length > 0) ? (
                <div className="">
                  <div className="">
                    <img src={party} alt="" className="party-img" />
                    <p>
                      Add your customers & suppliers. Manage your business with
                      them.
                    </p>
                    <button className="party-button" onClick={toggleForm}>
                      Add Your First Service
                    </button>
                  </div>
                </div>
              ) : (
                <div className="" style={{width:"100%"}}>
                  <ServicesTable func={dataFromChild}  />
                </div>
              )}
            </div>
          )}
          {thirdSec && (
            <div className="d-cen b-cont">
              {!(data.length > 0) ? (
                <div className="">
                  <div className="">
                    <img src={party} alt="" className="party-img" />
                    <p>
                      Add your customers & suppliers. Manage your business with
                      them.
                    </p>
                    <button className="party-button" onClick={openCategoryForm}>
                      Add Your First Category
                    </button>
                  </div>
                </div>
              ) : (
                <div className="" style={{width:"100%"}}>
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
                <div className="" style={{width:"100%"}}>
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
