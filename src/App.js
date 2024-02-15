import { useState } from 'react'
import "./Css/styles.css" ; 
import "./Css/styles1.css";
import "./App.css";
import Navbar from './Component/Navbar/Navbar.jsx'
import Sidebar from './Component/Sidebar/Sidebar.jsx';
import Header from './Component/Layourt/Header.jsx';
import Home from './Component/Layourt/Home/Home.jsx';
import Stockinventory from './Component/Stockinventory/Stockinventory.jsx';
import { Outlet, Route, Routes } from 'react-router-dom'
import Items from "./Page/Items/Items.jsx"
import Parties from "./Page/parties/Parties.jsx"
import SalesDeliveryChallan from "./pages/sales/salesDeliveryChallan/SalesDeliveryChallan.jsx"



function App() {
  

  return (
    <div className='app-container'>
      {/* <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/items' element={<Items />}></Route>
        <Route path='/parties' element={<Parties />}></Route>
        <Route path='/saledeliverychallan' element={<SalesDeliveryChallan/>}></Route>
      </Routes> */}
      <Navbar/>
      <div className="app-page-div">
        <section className="app-sidebar">
          <Sidebar/>
        </section>
        <section className="app-Home">
          <div className="header-div-fixed">
          <Header/>
          </div>
          {/* <div className="home-layout">
            <div className="app-home-section">
          <Home/>
            </div>
          <div className="app-right-sidebar">
          <Stockinventory/>
          </div>
          </div> */}
          <div className='outlet-layout'>
          <Outlet/>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
