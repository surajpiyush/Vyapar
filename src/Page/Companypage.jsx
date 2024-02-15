import React from 'react';
import "./Companypage.css";
import { IoIosSearch } from "react-icons/io";
import { GrRefresh } from "react-icons/gr";
import { PiDesktopTowerLight } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const Companypage = () => {
    const navigate = useNavigate();
  return (
    <div className='comapny-container'>
        <div>
      <div className="company-topbar">
        <section className="comapny-top-section">
            <h4>Company List</h4>
            <div>
            <input type="text" name="" id="" placeholder='Search company' />
            <span>
                <IoIosSearch/>
            </span>
            </div>
        </section>
        <section className="compnay-top-tab">
            <div className="company-tab-items">
                Companies Shared With Me
            </div>
            <div className="company-tab-items active-tab-item">
                My Companies
            </div>
        </section>
      </div>
    <section className="comany-section-2">
        <section className="comany-section-2-top">
        <div className='comany-section-2-top-para'>
            Below are the comoany that are created by you
        </div>
        <div className="company-section-2-div">
            <input type="file" name="" id="" />
        <div className='company-section-2-div-line'></div>
        <div className='company-section-2-div-refresh'>
        <GrRefresh/>
        </div>
        </div>
        </section> 
        <section className="company-section-items">
            <aside className="company-section-items-name">
                My Company
            </aside>
            <aside className="company-section-items-middle">
                <div>
                    <PiDesktopTowerLight/>
                </div>
                <p>SYNC OFF</p>
            </aside>
            <aside className='company-section-items-right'>
                <button onClick={() => navigate("/")} >Open</button>
                <BsThreeDotsVertical className='company-section-items-right-dot' />
            </aside>
        </section>
    </section>
    <section className="comapny-bottom-section">
        <button className="comapny-bottom-section-button">Restore Backup</button>
        <button className='comapny-bottom-section-button2'>New Companay</button>
    </section>
    <section className="company-login">
        <Link to="/auth" className='company-login-link'>LogIn</Link>
        <p>Login to join or create a sync company</p>
    </section>
    </div>
    </div>
  )
}

export default Companypage
