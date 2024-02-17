import React from 'react';
import { DotsIcon, FilterIcon, PrinterIcon, ShareIcon } from '../utils/reactIcons';
// import "./Addpurchaseitems.css";
import { CiFileOn } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";

const Addpurchaseorderitem = () => {
  return (
    <div>
     <table className='addpurchase-table'>
      <tr className='addpurchase-tr'>
        <td className='addpurchase-td'>#</td>
        <td className='addpurchase-td-1'>ITEM</td>
        <td>QTY</td>
        <td>UNIT</td>
        <td>PRICE/UNIT</td>
        <td>DISCOUNT</td>
        <td>TAX</td>
        <td>AMOUNT</td>
      </tr>
      <tr className='addpurchase-tr'>
        <td className='addpurchase-td'>1</td>
        <td className='addpurchase-td-1'></td>
        <td>NONE</td>
        <td></td>
        <td></td>
        <td>
        <select name="" id="">
            <option value="">Select</option>
          </select>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr className='addpurchase-tr'>
        <td className='addpurchase-td'>2</td>
        <td className='addpurchase-td-1'></td>
        <td>NONE</td>
        <td></td>
        <td></td>
        <td>
          <select name="" id="">
            <option value="">Select</option>
          </select>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr className='addpurchase-tr'>
        <td className='addpurchase-td'><button>Add Row</button></td>
        <td className='addpurchase-td-1'>Total</td>
        <td>0</td>
        <td></td>
        <td></td>
        <td>0
        </td>
        <td>0</td>
        <td>0</td>
      </tr>
     </table>
     <section className="add-purchase-items-payment">
      <aside className='add-purchase-items-payment-aside'>
        <div className='add-purchase-items-payment-div'>
        <label htmlFor="">Payment Type</label>
        <select name="" id="">
          <option value="">Casch</option>
          <option value="">Select Items</option>
          <option value="">Select Items</option>
        </select>
        </div>
        <div className='add-purchase-items-payment-div'>
          <button>+Add Payment type</button>
        </div>
        <div className='add-purchase-items-payment-div'>
          <div>
          <CiFileOn/>
          <p>Add Description</p>
          </div>
        </div>
        <div className='add-purchase-items-payment-div'>
          <div>
          <CiImageOn/>
          <p>Add Image</p>
          </div>
        </div>
      </aside>
      <aside className='add-purchase-items-payment-aside'>
        <div className='add-purchase-items-payment-div add-purchase-items-payment-div2'>
          <input className='add-purchase-items-payment-div-checkbox' type="checkbox" name="" />
          <label className='add-purchase-items-payment-div-label' htmlFor="">Roun Off</label>
          <input className='add-purchase-items-payment-div-input' type="text" name="" id="" placeholder='0' />
          <aside className='add-purchase-items-payment-div-3'>
            <label htmlFor="#">Total</label>
            <input type="text" name="" />
          </aside>
        </div>
      </aside>
     </section>
    </div>
  )
}

export default Addpurchaseorderitem