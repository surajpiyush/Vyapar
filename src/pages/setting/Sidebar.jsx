import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <section id="menu">
      <div className="logo">
        <h2>Settings</h2>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </span>
      </div>
      <div className="items">
        <li>
          <Link to="/GeneralComponent" className="nav-link">
            GENERAL
          </Link>
        </li>
        <li>
          <Link to="/Setting" className="nav-link">
            TRANSACTION
          </Link>
        </li>
        <li>
          <Link to="/GeneralComponent" className="nav-link">
            PRINT
          </Link>
        </li>
        <li>
          <Link to="/TAXESGSTComponent" className="nav-link">
            TAXES & GST
          </Link>
        </li>
        <li>
          <Link to="/GeneralComponent" className="nav-link">
            TRANSACTION MESSAGE
          </Link>
        </li>
        <li>
          <Link to="/GeneralComponent" className="nav-link">
            PARTY
          </Link>
        </li>
        <li>
          <Link to="/GeneralComponent" className="nav-link">
            ITEM
          </Link>
        </li>
      </div>
    
    </section>
  );
}

export default Sidebar;
