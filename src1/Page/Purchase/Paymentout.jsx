import React from 'react'
import Thismonth from '../../Component/Purchase/Thismonth'
import Paymentouts from '../../Component/Purchase/paymentouts/Paymentouts'

const Paymentout = () => {
  return (
    <div className='purchase-bill-container'>
        <Thismonth isshowcards={false} ishowPayment={true} />
        <Paymentouts/>
    
    </div>
  )
}

export default Paymentout