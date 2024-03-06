import "./App.css";
// import "./Css/styles.css";
// import "./Css/styles1.css";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Sidebar from "./Component/Sidebar/Sidebar.jsx";
import Header from "./Component/Layourt/Header.jsx";

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth", {
        state: { redirectTo: location.pathname },
        replace: true,
      });
    }
  }, []);

  const ignoreRoutes = [
    "/auth",
    "/company",
    "/business",
    "/setting",
    "/general",
    "/taxesgst"
  ];

  return (
    <div id="App">
      {!ignoreRoutes.includes(location.pathname) && <Navbar />}
      {!ignoreRoutes.includes(location.pathname) && (
        <div className="app-page-div">
          <section className="app-sidebar">
            <Sidebar />
          </section>
          <section className="app-Home">
            <div className="header-div-fixed">
              <Header />
            </div>
            <div className="outlet-layout">
              <Outlet />
            </div>
          </section>
        </div>
      )}

      {ignoreRoutes.includes(location.pathname) && <Outlet />}
    </div>
  );
}

export default App;
