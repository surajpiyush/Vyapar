import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './popup.css';


import { Link } from 'react-router-dom';
import $ from 'jquery';
import './sidebar.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


function PopupComponent() {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image.');
    }
  }

  function save() {
    // Add functionality for save button here
    alert('Save button clicked');
  }

  function share() {
    // Add functionality for share button here
    alert('Share button clicked');
  }

  function selectPaymentType(type) {
    alert('Selected payment type: ' + type);
    // You can add your code to handle the selected payment type here
  }


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
                    <div className="navigation">
        <div>
          <h4>Payment-Out</h4>
        </div>
      </div>

      <div className="navigation1">
        <div className="dropdown">
          <br/><br/><br/>
          <fieldset>
            <legend>Party *</legend>
            <select id="party" name="party">
              <option value="none">None</option>
            </select>
          </fieldset>
          <br /><br />
          <fieldset>
            <legend>Payment Type *</legend>
             <br/>
            <select id="paymentType" name="paymentType">
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
            </select>
          </fieldset>
          <br /><br />
         
         
          <div className="dropdown">
          <button className="dropbtn">Add Payment Type</button>
          <div className="dropdown-content">
            <a href="#" onClick={() => selectPaymentType('Cash')}>Cash</a>
            <a href="#" onClick={() => selectPaymentType('Cheque')}>Cheque</a>
          </div>
        </div>
<br/><br/>
<br/><br/><br/><br/>


          <textarea id="description" name="description" rows="2" cols="25">
          Add Description
        </textarea>
        <br /><br />

        {/* Image Upload */}
        <label htmlFor="imageUpload" className="custom-button">ADD IMAGE</label>
        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%' }} />}
        <br /><br />

        {/* Document Upload */}
        <label htmlFor="documentUpload" className="custom-button">ADD DOCUMENT</label>
        <input type="file" id="documentUpload" accept=".pdf,.doc,.docx" onChange={handleImageUpload} />
        {/* Preview area for the uploaded document */}
        {/* Implement preview for documents as needed */}
        <br /><br />

        {/* Save and Share Buttons */}
        <div className="last">
          <button className="button" onClick={save}>Save</button>
          <button className="button" onClick={share}>Share</button>
        </div>
        </div>
        <br /><br />

        <span>
            <form action="/action_page.php">
              <label htmlFor="receiptNumber">Receipt Number</label>
              <input type="text" id="receiptNumber" name="receiptNumber" /><br />
            </form>
            <br/>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" />
            <br/><br/>
            <label htmlFor="time">Select a time:</label>
            <input type="time" id="time" name="time" />
          </span>

        
      </div>
                </div>
            </div>
        </div>
    </section>
    </div>




      </div>
  );
}

export default PopupComponent;
