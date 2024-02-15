import React from 'react';
import "./purchase-bill.css"
import Thismonth from '../../Component/Purchase/Thismonth';
import Transactions from '../../Component/Purchase/Transactions/Transactions';

const Purchasebill = () => {
  return (
    <div className='purchase-bill-container'>
        <Thismonth/>
        <Transactions/>
    </div>
  )
}

export default Purchasebill