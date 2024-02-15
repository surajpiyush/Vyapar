import React, { useState } from 'react';
import { FaRupeeSign } from "react-icons/fa";
import "./Stockinventory.css";
import { PiToggleLeftFill as OpenToggle } from "react-icons/pi";
import { PiToggleRightThin as CloseToogle } from "react-icons/pi";



const Stockinventory = () => {

    const [openToggle, setopenToggle] = useState(false);

  return (
    <div className='stock-privacy-container'>
        <section className="stock-privacy-card">
            <p>privacy</p>
            <div onClick={() => setopenToggle(!openToggle)} > {openToggle ? (<OpenToggle className='toggleicon' />) : (<CloseToogle className='toggleicon'  />)}</div>
        </section>
        <h3 className='stock-headers'>Stock Inventory</h3>
        <section className="stock-stock-value-section">
            <h4>Stock Value</h4>
            <div className="purchase-amount-div">
                <FaRupeeSign/>
                <h3>00</h3>
                <span>.00</span>
            </div>
        </section>
        <section className="low-stocks-section">
            <h4>Low Stcoks</h4>
            <p>None of your stocks has low value</p>
        </section>
        <section className="cash-bank-section">
        <h4 className='stock-headers'>Cash & Banks</h4>
        {["Bank Accounts", "Loan Amounts"].map((items) => (
            <div className="cash-bank-card">
                <h4>{items}</h4>
                <div className="purchase-amount-div">
                <FaRupeeSign/>
                <h3>00</h3>
                <span>.00</span>
            </div>
            </div>
        ))}
        </section>
        <section className="stock-sale-section">
            <h4>Sale</h4>
            {["Sale Orders", "Delivery Challan"].map((item) => (
                <div className="stock-sale-card">
                    <h4>{item}</h4>
                    <div>
                        <p>No. of Open Orders</p>
                        <p>0</p>
                    </div>
                    <div>
                        <p>Open sale Order Amount</p>
                        <p>0</p>
                    </div>
                </div>
            ))}
        </section>
        <div className="purchanse-stokc-orders">
        <h4 className='stock-headers'>Purchase</h4>
        <section className="stock-purchase-orders-card">
                <h4>Purchase Orders</h4>
                <div>
                    <p>No. of purchase Orders</p>
                    <p>0</p>
                </div>
                <div>
                    <p>Purchase Orders Amount</p>
                    <p>0</p>
                </div>
        </section>
        </div>
    </div>
  )
}

export default Stockinventory