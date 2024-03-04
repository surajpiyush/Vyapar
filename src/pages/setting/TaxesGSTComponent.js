import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './tax.css';

//sidebar
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './taxsidebar.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

//scrolling
// import Aos from 'aos';
// import 'aos/dist/aos.css'

function TaxesGSTComponent() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    // Here you can perform additional actions before opening the modal if needed
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // Here you can perform additional actions after closing the modal if needed
  };


  // sidebar
  useEffect(() => {
    $(document).ready(function () {
      $('#menu-btn').click(function () {
        $('#menu').toggleClass("active");
      });
    });
  }, []);

//scroll bar
// useEffect(() => {
//  Aos.init(2000);
// }, []); 

  return (
    <div className="main">
      <div className="bar">
      {/* data-aos = "fade-down" */}
        <section id="menu">
          <div className="logo">

            <h2>Settings</h2>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>

          </div>

          <div className="items">
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
          <div className="navigation">
            <div className="n1">
              <div>
                <i id="menu-btn" class="fas fa-bars"></i>

                <div className="container">
                  <div className="section">
                    <h2>GST Settings</h2>

                    <input type="checkbox" className="checkbox" name="checkbox"></input>
                    <label htmlFor="checkbox">Enable GST</label>
                    <br /><br />
                    <input type="checkbox" className="checkbox" name="checkbox"></input>
                    <label htmlFor="checkbox">Enable HSN/SAC Code</label>
                    <br /><br />
                    <input type="checkbox" className="checkbox" name="checkbox"></input>
                    <label htmlFor="checkbox">Additional Cess On Item</label>
                    <br /><br />
                    <input type="checkbox" className="checkbox" name="checkbox"></input>
                    <label htmlFor="checkbox">Reverse Charge</label>
                    <br /><br />
                    <input type="checkbox" className="checkbox" name="checkbox"></input>
                    <label htmlFor="checkbox">Enable Place of Supply</label>
                    <br /><br />
                    <input type="checkbox" className="checkbox" name="checkbox"></input>
                    <label htmlFor="checkbox">Composite Scheme</label>
                    {/* dropdown */}
                    <input type="checkbox" className="checkbox" name="checkbox"></input>
                    <label htmlFor="checkbox">Enable TCS</label>
                    {/* button/anchor */}

                    <div>
                      <button onClick={openModal} className="modal-button">Tax List &gt;</button>
                      {isModalOpen && (
                        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', zIndex: '9999' }}>
                          <h2>Modal Content</h2>
                          {/* Add content for the modal */}
                          <button onClick={closeModal}>Close Modal</button>

                          {/* anchor/button */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

export default TaxesGSTComponent;