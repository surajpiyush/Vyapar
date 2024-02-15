import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import "./Header.css"

const Header = () => {
    const [searchInp, setSearchInp] = useState("");



  return (
    <div className='header-container'>
        <section className="header-search-section">
            <input  onChange={(e) => setSearchInp(e.target.value)} type="text" name="searchbox" className={`header-searchbar header-searchbar-focus`} placeholder='Enter Business Name' />
            <button className={`header-search-btn header-search-btn-hide`} >Save</button>
        </section>
        <section className="header-button-section">
            <aside className="header-btn-aside">
                {["Add Sale", "Add Purchase", "Add More"].map((items, index) => (
                    <div className={`header-btn-div header-add-btn ${items == "Add Sale" && "header-add-sale-btn"} ${items == "Add Purchase" && "header-add-purchase-btn"} ${items == "Add More" && "header-add-more-btn"}`} key={index}>
                        <FaPlus className={`header-plus-btn ${items == "Add Sale" && "header-plus-btn-sale"} ${items == "Add Purchase" && "header-plus-btn-purchase"} ${items == "Add More" && "header-plus-btn-more"}`} />
                        <p>{items}</p>
                    </div>
                ))}
            </aside>
            <div className="header-line"></div>
                    <MdSettings className='heade-setting' />
        </section>
    </div>
  )
}

export default Header