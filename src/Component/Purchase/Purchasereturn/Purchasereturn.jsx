import React from 'react'
import { DotsIcon, FilterIcon, PrinterIcon, ShareIcon } from '../../utils/reactIcons'
import { useNavigate } from 'react-router-dom'

const Purchasereturn = () => {
    const navigate = useNavigate();
  return (
    <div className='payment-out-container'>
    <div className="transactions-buttons">
    <input type="text" />
    <button onClick={(e) => navigate("/addpurchasereturn")}>
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
                   <div className='table-items'>Debit Note</div>
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
</div>
  )
}

export default Purchasereturn