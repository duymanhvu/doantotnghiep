import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import ic_arrow_up from "../assets/img/ic_arrow_up.svg";

import Header from "./Header";
import Footer from "./Footer";
import HeaderLogo from "./HeaderLogo";

const Home = () => {
  const [stickyBtnUp, setStickyBtnUp] = useState(false);
  let location = useLocation();

  const setBtnUp = () => {
    if (window.scrollY >= 150) {
      setStickyBtnUp(true);
    } else {
      setStickyBtnUp(false);
    }
  };

  window.addEventListener("scroll", setBtnUp);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="main">
      {location.pathname === "/login" || location.pathname === "/forgot" ? (
        <>
          <HeaderLogo />
        </>
      ) : (
        <Header />
      )}

      <div className="body">
        <Outlet />
      </div>

      {location.pathname === "/login" || location.pathname === "/forgot" ? (
        <></>
      ) : (
        <Footer />
      )}

      <button
        className="btn btn-up animate__animated animate__backInDown"
        style={stickyBtnUp ? { display: "flex" } : { display: "none" }}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img src={ic_arrow_up} alt="icon" />
      </button>
    </div>
  );
};

export default Home;
