import React from 'react';
import "./purchaseorder.css";
import { DotsIcon, FilterIcon, PrinterIcon, ShareIcon } from '../utils/reactIcons'
import { useNavigate } from 'react-router-dom';

const Pourchaseorder = () => {
    const navigate = useNavigate();
  return (
    <div className='payment-out-container'>
        <h4>Transactions</h4>
        <div className="transactions-buttons">
        <input type="text" />
        <button onClick={() => navigate("/addpurchaseorder")} >
           <span>+</span> Add Purchase order
        </button>
        </div>

        <table className='table'>
            {/* <thead className='table-head'> */}
                <tr className='tabel-row'>
                    <th className='table-h'>
                    <div className='table-items'>Party</div><div></div>
                    </th>
                    <th className='table-h'>
                       <div className='table-items'>No.</div><FilterIcon/>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'>Date</div><FilterIcon/>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'>Due Date</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Total Amount</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Balance</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Type</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Status</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Action</div><FilterIcon/>
                        </th>
                </tr>
            {/* </thead> */}
            {/* <tbody> */}
            <tr className='tabel-row tale-data purchase-order'>
                    <th className='table-h'>
                    <div className='table-items'>err</div><div></div>
                    </th>
                    <th className='table-h'>
                       <div className='table-items'>1</div>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'>10/02/2024</div>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'>10/02/2024</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>₹0.00</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>₹0.00</div>
                        </th>
                        <th className='table-h'>
                       <div className=' table-items'>Purchase Or</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items-purcahse-order'>Order Overdue</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items table-items-purcahse-convert'>Convert To Purchase</div><DotsIcon/>
                        </th>
                       
                </tr>
            {/* </tbody> */}
        </table>
    
    </div>
  )
}

export default Pourchaseorder