import React from 'react';
import "./Paymentouts.css";
import { DotsIcon, FilterIcon, PrinterIcon, ShareIcon } from '../../utils/reactIcons';

const Paymentouts = () => {
  return (
    <div className='payment-out-container'>
        <div className="transactions-buttons">
        <input type="text" />
        <button>
           <span>+</span> Add Payment-out
        </button>
        </div>

        <table className='table'>
            {/* <thead className='table-head'> */}
                <tr className='tabel-row'>
                    <th className='table-h'>
                    <div className='table-items'>#</div><div></div>
                    </th>
                    <th className='table-h'>
                       <div className='table-items'>Date</div><FilterIcon/>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'>Ref No.</div><FilterIcon/>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'>PartyName</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>CategoryName</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Type</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Total</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Recevied</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Balance</div><FilterIcon/>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Print</div><FilterIcon/>
                        </th>
                </tr>
            {/* </thead> */}
            {/* <tbody> */}
            <tr className='tabel-row tale-data'>
                    <th className='table-h'>
                    <div className='table-items'>1</div><div></div>
                    </th>
                    <th className='table-h'>
                       <div className='table-items'>10/02/2024</div>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'></div>
                        </th>
                    <th className='table-h'>
                       <div className='table-items'>jujk</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'></div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>Payment-out</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>₹0.00</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>₹0.00</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>₹0.00</div>
                        </th>
                        <th className='table-h'>
                       <div className='table-items'>
                        <PrinterIcon onClick={() => window.print()} />
                        <ShareIcon/>
                        <DotsIcon/>
                       </div>
                        </th>
                </tr>
            {/* </tbody> */}
        </table>
        <div className="payment-outs-footer">
            <p>Total Amount: <span>₹ 0.00</span></p>
            <p>Balance: ₹0.00</p>
        </div>
    </div>
  )
}

export default Paymentouts