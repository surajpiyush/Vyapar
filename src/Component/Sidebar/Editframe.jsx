import React from 'react';
import { RxCross2 } from "react-icons/rx";
import "./Editframe.css";


const Editframe = () => {
  return (
    <div className='edit-firm-container'>
        <section className="edit-firm-top-section">
            <asside className="edit-firm-top-aside1">
                <h4>Edit Firm</h4>
                <div></div>
                <button>Gold Licence</button>
            </asside>
            <asside className="edit-firm-top-aside2">
                <RxCross2/>
            </asside>
        </section>
        <section className="edit-firm-middle-section">
            <aside className="edit-firm-middle-aside1">
                <div>Add <br /> Logo</div>
            </aside>
            <aside className="edit-firm-middle-aside2">
                <div>
                    <label htmlFor="#">Business Name</label>
                    <input type="text" name="businessname" placeholder='Company name' />
                </div>
                <div>
                    <label htmlFor="#">GSTIN</label>
                    <input type="text" name="businessname" placeholder='GSTIN' />
                    <p>Get GST registration at execlusive prices</p>
                </div>
                <div>
                    <label htmlFor="#">Phone No.</label>
                    <input type="text" name="businessname" placeholder='mobile number' />
                </div>
                <div>
                    <label htmlFor="#">Email ID</label>
                    <input type="text" name="businessname" placeholder='Eamil ID' />
                </div>

            </aside>
        </section>
        <section className="edit-firm-footer">
            <h4>Business details</h4>
            <div className="edit-firm-border">
            </div>
            <section className="edit-firm-footer-section">
                <aside className="edit-firm-footer-aside1">
                <div>
                    <label htmlFor="#">Business Address</label>
                    <textarea type="text" name="businessname" placeholder='Company name' />
                </div>
                <div>
                    <label htmlFor="#">pincode</label>
                    <input type="text" name="businessname" placeholder='Pincode' />
                </div>
                <div>
                    <label htmlFor="#">State</label>
                  <select name="#" >
                    <option value="">None</option>
                    <option value="">None</option>
                  </select>
                </div>
                <div>
                    <label htmlFor="#">Business Description</label>
                    <input type="text" name="businessname" placeholder='Business Description' />
                </div>
                </aside>
                <aside className="edit-firm-footer-aside2">
                <div>
                    <label htmlFor="#">Business Type</label>
                  <select name="#" >
                  <option value="">None</option>
                    <option value="">None</option>
                  </select>
                </div>
                <div>
                    <label htmlFor="#">Business Category</label>
                    <input type="text" name="businessname" placeholder='Business Category' />
                </div>
                <div className="add-signatures">
                    <p>Add <br /> Signature</p>
                </div>
                </aside>
            </section>
        </section>
        <div className='edit-firm-save-button'>
        <button className=''>Save</button>
        </div>
    </div>
  )
}

export default Editframe