import { useState } from "react";
import "./Css/styles.css";
import "./Css/styles1.css";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Sidebar from "./Component/Sidebar/Sidebar.jsx";
import Header from "./Component/Layourt/Header.jsx";
import Home from "./Component/Layourt/Home/Home.jsx";
import Stockinventory from "./Component/Stockinventory/Stockinventory.jsx";
import { Outlet, Route, Routes } from "react-router-dom";
import Items from "./Page/Items/Items.jsx";
import Parties from "./Page/parties/Parties.jsx";
import SalesDeliveryChallan from "./pages/sales/salesDeliveryChallan/SalesDeliveryChallan.jsx";
<<<<<<< HEAD

function App() {
   return (
    // <Provider value={store} >

      <div className="app-container">
         {/* <Routes>
=======
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        {/* <Routes>
>>>>>>> 63c11ce9a353e5fa09a5d7f4788ea79ff9e18000
        <Route path='/' element={<Home />}></Route>
        <Route path='/items' element={<Items />}></Route>
        <Route path='/parties' element={<Parties />}></Route>
        <Route path='/saledeliverychallan' element={<SalesDeliveryChallan/>}></Route>
      </Routes> */}
<<<<<<< HEAD
         <Navbar />
         <div className="app-page-div">
            <section className="app-sidebar">
               <Sidebar />
            </section>
            <section className="app-Home">
               <div className="header-div-fixed">
                  <Header />
               </div>
               {/* <div className="home-layout">
=======
        <Navbar />
        <div className="app-page-div">
          <section className="app-sidebar">
            <Sidebar />
          </section>
          <section className="app-Home">
            <div className="header-div-fixed">
              <Header />
            </div>
            {/* <div className="home-layout">
>>>>>>> 63c11ce9a353e5fa09a5d7f4788ea79ff9e18000
            <div className="app-home-section">
          <Home/>
            </div>
          <div className="app-right-sidebar">
          <Stockinventory/>
          </div>
          </div> */}
<<<<<<< HEAD
               <div className="outlet-layout">
                  <Outlet />
               </div>
            </section>
         </div>
      </div>
   );
=======
            <div className="outlet-layout">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </Provider>
  );
>>>>>>> 63c11ce9a353e5fa09a5d7f4788ea79ff9e18000
}

export default App;
