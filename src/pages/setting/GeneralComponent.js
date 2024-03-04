import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './setting.css';

import { Link } from 'react-router-dom';
import $ from 'jquery';
import './sidebar.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

function GeneralComponent() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    // Here you can perform additional actions before opening the modal if needed
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // Here you can perform additional actions after closing the modal if needed
  };



  useEffect(() => {
    $(document).ready(function() {
        $('#menu-btn').click(function(){
            $('#menu').toggleClass("active");
        });
    });
}, []);

  return (
    <div className="main">

<div className="bar">
<section id="menu">
        <div class="logo">
            
            <h2>Settings</h2>
           &nbsp; &nbsp; &nbsp; &nbsp; 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            
        </div>

        <div class="items">
        <li><i className="fa-solid fa-gauge"></i><Link to="/GeneralComponent">GENERAL</Link></li>
        <li><i className="fa-solid fa-gauge"></i><Link to="/Setting">TRANSACTION</Link></li>
        {/* i did not created transaction component */}
        <li><i className="fa-solid fa-gauge"></i><Link to="/GeneralComponent">PRINT</Link></li>
        {/*i did not created print component create first compont*/}
        <li><i className="fa-solid fa-gauge"></i><Link to="/TAXESGSTComponent">TAXES & GST</Link></li>
        <li><i className="fa-solid fa-gauge"></i><Link to="/GeneralComponent">TRANSACTION MESSAGE</Link></li>
        <li><i className="fa-solid fa-gauge"></i><Link to="/GeneralComponent">PARTY</Link></li>
        <li><i className="fa-solid fa-gauge"></i><Link to="/GeneralComponent">ITEM</Link></li>
        {/* i did not created transaction , party, item components */}
        </div>
    </section>

    <section id="interface">
        <div class="navigation">
            <div class="n1">
                <div>
                    <i id="menu-btn" class="fas fa-bars"></i>
                    <div className="container">
        <div className="section">
          <h2>Application</h2>

          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Enable Passcode</label>
          <br /><br />
          <label htmlFor="checkbox">Business Currency</label>
          {/* dropdown */}
          <br /><br />
          <label htmlFor="checkbox">Amount <br/> <p class="lowercase">(upto Decimal Places) </p></label>
          {/* number */}
          <br /><br />
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">GSTIN Number</label>
          <br /><br />
          
        </div>

        {/* <!-- Item Table --> */}
        <div className="section">
          <span>
        <input type="checkbox" className="checkbox" name="checkbox"></input>
          <h2>Multi Firm</h2>
          </span>
          
          <input type="radio" className="radio" name="radio"></input>
          <label htmlFor="radio">Name</label>
          {/* Edit name icon */}
          <br /><br />
        
        </div>

        {/* <!-- Taxes, Discount & Totals --> */}
        <div className="section">
          <h2>Backup</h2>

          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Auto Backup</label>
          <br /><br />
          {/* date when take you backup */}
          
        </div>
      </div>


      {/* <!-- More Transaction Features --> */}
      <div className="container1">
        <div className="section1">
          <h2>More Transactions</h2>
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Estimate/Quotation</label>
          <br /><br />
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Sale/Purchase Order</label>
          <br /><br />
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Other Income</label>
          <br /><br />
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Fixed Assets(FA)</label>
          <br /><br />
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Delivery Challan</label>
          <br /><br />
          {/* inside delivery challan */}
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Goods return on <b>Delivery Challan</b></label>
          <br /><br />
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Print amount in <b>Delivery Challan</b></label>
          <br /><br />
          
        </div>

        {/* <!-- Transaction Prefixes --> */}
        <div className="section1">
          <h2>Stock Transfer Between Godowns</h2>
          <br/>
          <p>Manage all your stores/godowns and transfer stock seamlessly between them. Using this feature, you can transfer stock between stores/godowns and manage your inventory more efficiently.</p>
          <br />
          <input type="checkbox" className="checkbox" name="checkbox"></input>
          <label htmlFor="checkbox">Godown management & Stock transfer</label>


        </div>
      </div>
      <button onClick={openModal} className="modal-button">Additional Fields &gt;</button>
      {isModalOpen && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', zIndex: '9999' }}>
          <h2>Modal Content</h2>
          {/* Add content for the modal */}
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}

                </div>
            </div>
        </div>
    </section>
    </div>



      
    </div>
  );
}

export default GeneralComponent;
