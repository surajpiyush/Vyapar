import React from 'react'
import Thismonth from '../../Component/Purchase/Thismonth'
import Paymentouts from '../../Component/Purchase/paymentouts/Paymentouts'
import Purchasereturn from '../../Component/Purchase/Purchasereturn/Purchasereturn'

const Purchasereturnpage = () => {

    const optionsItems = ["Debit note", "other items"]

  return (
    <div className='purchase-bill-container'>
        <Thismonth isshowcards={false} ishowPayment={true} selectoptions={optionsItems} />
        <Purchasereturn />
    </div>
  )
}

export default Purchasereturnpage