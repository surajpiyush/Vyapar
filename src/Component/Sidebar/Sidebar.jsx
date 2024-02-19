import "./Sidebar.css";
import Logo from "../../assets/Shop.svg";
import { SidebarItems } from "./SidebarMenus";
import { USER_DETAILS } from "../../Redux/business/actionTypes";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const toggleUpdate = useSelector(
    (state) => state.BusinessReducer.toggleUpdate
  );
  const [activeItems, setActiveItems] = useState("Home");
  const [toggleNavItems, setToggleNavItems] = useState(false);
  const [activeNestedItems, setActiveNestedItems] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const UserDetails = JSON.parse(localStorage.getItem(USER_DETAILS));
    setProfileData(UserDetails);
  }, [toggleUpdate]);

  const handleNestedSibarItems = () => {
    setToggleNavItems(!toggleNavItems);
  };

  const handleActiveItems = (item) => {
    if (item === "Home") {
      navigate("/");
    }
    setActiveItems(item);
    handleNestedSibarItems();
  };

  const handleActiveNestedItems = (index) => {
    setActiveNestedItems(index);
  };

  const handleLayout = (item) => {
    if (item === "Parties") {
      navigate("/parties");
    } else if (item === "Items") {
      navigate("/items");
    }
  };

  return (
    <div className="sidebar-container">
      <section className="sidebar-top-section">
        <div className="sidebar-top-logo-div">
          <img src={Logo} alt="logo" className="sidebar-top-img" />
          <span className="sidebar-top-img-plus">+</span>
        </div>
        <h3 className="sidebar-top-heading">
          {profileData?.companyName ? profileData.companyName : "Loading..."}
        </h3>
        <div className="sidebar-left-icon">
          <button onClick={() => navigate("/formpage")}>
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </section>

      <div className="sidebar-main">
        {SidebarItems.map((items, index) => (
          <div
            onClick={() => handleActiveItems(items.name)}
            className={`sidebar-items-div ${
              activeItems === items.name && "active-nav-border"
            }`}
            key={index}
          >
            <aside>
              <div
                className="sidevar-items-aside1"
                onClick={() => handleLayout(items.name)}
              >
                <div className="sidebar-items-con">{items.Icon}</div>
                <div className="sidebar-items-text">{items.name}</div>
              </div>
              {activeItems === items.name &&
                toggleNavItems &&
                items.purchaseToggle && (
                  <div
                    className="nested-items-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {items.purchaseToggle.map((nestedItems, nestedindex) => (
                      <aside
                        key={nestedindex}
                        onClick={() => {
                          handleActiveNestedItems(nestedindex);
                          navigate(nestedItems.navigateurl);
                        }}
                        className={`sidevar-nested-items ${
                          activeNestedItems === nestedindex &&
                          "active-nav-border"
                        }`}
                      >
                        <div className="sidebar-items-con">
                          {nestedItems.name}
                        </div>
                        <div className="sidebar-items-text">
                          {nestedItems.Icon}
                        </div>
                      </aside>
                    ))}
                  </div>
                )}
            </aside>

            {items.extraIcon && (
              <div className="sidebar-items-extra-icon">{items.extraIcon}</div>
            )}
          </div>
        ))}
      </div>

      <div className="profile-container">
        {profileData?.token ? (
          <>
            <div className="profile-name">{profileData.name}</div>
            <div className="profile-email">{profileData.email}</div>
          </>
        ) : (
          <p className="error-message">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
