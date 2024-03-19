import "../../styles/Items.css";
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

import { useState } from "react";

export default function Items() {
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
         <div className="nav">
            <div
               className="nav-opt"
               style={{
                  width: "100%",
                  borderBottom: !opt
                     ? "4px solid var(--greyA)"
                     : "4px solid var(--blueB)",
               }}
               onClick={() => {
                  openSection(0);
               }}
            >
               Products
            </div>
            {/* <div
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
        </div> */}
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
                                 Add Products/Items you sell or purchase to
                                 manage your full Stock Inventory.
                              </p>
                              <button
                                 className="party-button"
                                 onClick={toggleForm}
                              >
                                 Add Your First Product
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className="" style={{ width: "100%" }}>
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
                                 Add your customers & suppliers. Manage your
                                 business with them.
                              </p>
                              <button
                                 className="party-button"
                                 onClick={toggleForm}
                              >
                                 Add Your First Service
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className="" style={{ width: "100%" }}>
                           <ServicesTable func={dataFromChild} />
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
                                 Add your customers & suppliers. Manage your
                                 business with them.
                              </p>
                              <button
                                 className="party-button"
                                 onClick={openCategoryForm}
                              >
                                 Add Your First Category
                              </button>
                           </div>
                        </div>
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
                                 Add your customers & suppliers. Manage your
                                 business with them.
                              </p>
                              <button
                                 className="party-button"
                                 onClick={openUnitForm}
                              >
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
