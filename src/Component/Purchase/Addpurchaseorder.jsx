import React from 'react'
// import "./Addpurchase.css";
import Addpurchaseorderitem from './Addpurchaseorderitems';

const Purchase = () => {
  return (
    <div className='addpurchase-container'>
      <section className='addpurchase-section-top'>
         <h4>Purchase </h4>
        <section className='addpurchase-section-top-section'>
        <aside className='addpurchase-section-top-section-select'>
            <select name="" className='addpurchase-section-select' >
              <option value="">party</option>
              <option value="">#</option>
              <option value="">#</option>
            </select>
            <input type="text" name="#" placeholder='Phone no.' />
          </aside>
          <aside className='addpurchasebill-aside'>
            <div className='addpurchasebill-aside-items'>
              <p className='addpurchasebill-aside-items-bill'>Bill Number</p>
              <p className='addpurchasebill-aside-items-p'></p>
            </div>
            <div className='addpurchasebill-aside-items'>
              <p className='addpurchasebill-aside-items-bill'>Bill Date Date:</p>
              <input type="date" name="" className='addpurchasebill-aside-items-bill-date' />
            </div>
           
            <div className='addpurchasebill-aside-items'>
              <label htmlFor="#" className='addpurchasebill-aside-items-bill'>State Of supply</label>
              <select name="#" className='addpurchasebill-aside-items-bill-select'>
                <option value="#">Items</option>
                <option value="#">Items</option>
              </select>
            </div>
          </aside>
        </section>
        </section>
        <section>
          <Addpurchaseorderitem/>
        </section>
        <section className="addpurchase-footer">
          <div>
          <select name="" id="">
            <option value="">
              Share
            </option>
          </select>
          </div>
          <div>
            <button>Save</button>
          </div>
         
        </section>
    </div>
  )
}

export default Purchase