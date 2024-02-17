import React, { useEffect } from "react";
import "./Companypage.css";
import { IoIosSearch } from "react-icons/io";
import { GrRefresh } from "react-icons/gr";
import { PiDesktopTowerLight } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllCompanies } from "../Redux/business/action";
import {
  SET_CURRENT_COMPANY,
  USER_DETAILS,
} from "../Redux/business/actionTypes";

const Companypage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allCompaniesData = useSelector(
    (state) => state.BusinessReducer.allCompaniesData
  );
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const isLoading = useSelector((state) => state.BusinessReducer.isLoading);

  useEffect(() => {
    FetchAllCompanies(dispatch);
  }, [toggleUpdate]);

  const handleCompanyClick = (item) => {
    const previousCompanyData = JSON.parse(localStorage.getItem(USER_DETAILS));
    const newCurrentCompanyData = { ...previousCompanyData, ...item };
    localStorage.setItem(USER_DETAILS, JSON.stringify(newCurrentCompanyData));
    dispatch({ type: SET_CURRENT_COMPANY, payload: newCurrentCompanyData });
    navigate("/", {
      state: { redirectTo: location.pathname },
      replace: true,
    });
  };
  return (
    <div className="comapny-container">
      <div>
        <div className="company-topbar">
          <section className="comapny-top-section">
            <h4>Company List</h4>
            <div>
              <input type="text" name="" id="" placeholder="Search company" />
              <span>
                <IoIosSearch />
              </span>
            </div>
          </section>
          <section className="compnay-top-tab">
            <div className="company-tab-items">Companies Shared With Me</div>
            <div className="company-tab-items active-tab-item">
              My Companies
            </div>
          </section>
        </div>
        <section className="comany-section-2">
          <section className="comany-section-2-top">
            <div className="comany-section-2-top-para">
              Below are the comoany that are created by you
            </div>
            <div className="company-section-2-div">
              <input type="file" name="" id="" />
              <div className="company-section-2-div-line"></div>
              <div className="company-section-2-div-refresh">
                <GrRefresh />
              </div>
            </div>
          </section>
          {isLoading ? (
            <h2 style={{ color: "red" }}>Loading Companies List</h2>
          ) : (
            allCompaniesData?.map((item, ind) => (
              <section key={ind + item._id} className="company-section-items">
                <aside className="company-section-items-name">
                  {item.companyName}
                </aside>
                <aside className="company-section-items-middle">
                  <div>
                    <PiDesktopTowerLight />
                  </div>
                  <p>SYNC OFF</p>
                </aside>
                <aside className="company-section-items-right">
                  <button onClick={() => handleCompanyClick(item)}>Open</button>
                  <BsThreeDotsVertical className="company-section-items-right-dot" />
                </aside>
              </section>
            ))
          )}
        </section>
        <section className="comapny-bottom-section">
          <button className="comapny-bottom-section-button">
            Restore Backup
          </button>
          <button
            className="comapny-bottom-section-button2"
            onClick={() => navigate("/Busniess")}
          >
            New Companay
          </button>
        </section>
        <section className="company-login">
          <Link to="/auth" className="company-login-link">
            LogIn
          </Link>
          <p>Login to join or create a sync company</p>
        </section>
      </div>
    </div>
  );
};

export default Companypage;
