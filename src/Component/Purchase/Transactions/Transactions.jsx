import React from 'react';
import "./Transactions.css";
import { DotsIcon, FilterIcon, PrinterIcon, ShareIcon } from '../../utils/reactIcons';
import { useNavigate } from 'react-router-dom';

const transactionFilterItems = [
    {
  name: "DATE",
  Icon: <FilterIcon/>,
//   nestedItems  
}
];

const transcationsItems = [
    "11/01/2024", "", "gg", "cash", "0", "0", <PrinterIcon/>, <ShareIcon/>, <DotsIcon/>
];

const Transactions = () => {
    const navigate = useNavigate();
  return (
    <div className='transactions-container'>
        <h4>Transactions</h4>
        <div className="transactions-buttons">
        <input type="text" />
        <button onClick={() => navigate("/addpurchase")}>
           <span>+</span> Add Purchase
        </button>
        </div>
        <section className="transaction-tables">
                <div className='transaction-table'>
                    <p>DATE</p>
                    <FilterIcon/>
                </div>
                <div className='transaction-table'>
                    <p>INVOICE NO.</p>
                    <FilterIcon/>
                </div>
                <div className='transaction-table'>
                    <p>PARTY NAME</p>
                    <FilterIcon/>
                </div>
                <div className='transaction-table'>
                    <p>PAYMENT TYPE</p>
                    <FilterIcon/>
                </div>
                <div className='transaction-table'>
                    <p>AMOUNT</p>
                    <FilterIcon/>
                </div>
                <div className='transaction-table'>
                    <p>BALANCE DUE</p>
                    <FilterIcon/>
                </div>
                <div className='transaction-table'>
                    <p></p>
                    <FilterIcon/>
                </div>
                <div className='transaction-table'>
                    <p></p>
                    <FilterIcon/>
                </div>
           
        </section>
        <section className="transaction-tables">
                <div className='transaction-table'>
                    <p>11/02/2014</p>
                  
                </div>
                <div className='transaction-table'>
                    <p></p>
                   
                </div>
                <div className='transaction-table'>
                    <p>gg</p>
                  
                </div>
                <div className='transaction-table'>
                    <p>Cash</p>
                   
                </div>
                <div className='transaction-table'>
                    <p>0</p>
                  
                </div>
                <div className='transaction-table'>
                    <p>0</p>
                  
                </div>
                <div className='transaction-table'>
                    <p><PrinterIcon/> <ShareIcon/></p>
                    {/* <FilterIcon/> */}
                </div>
                <div className='transaction-table'>
                    <p></p>
                    <DotsIcon/>
                </div>
           
        </section>
    </div>
  )
}

export default Transactions