import React from "react";

import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../assets/img/logo_header.png";

const HeaderLogo = () => {
  return (
    <header className="header">
      <Navbar collapseOnSelect expand="lg" bg="light" className="navbar-login">
        <Nav.Link as={Link} to="/home" className="navbar-brand">
          <img src={logo} alt="logo" />
        </Nav.Link>
      </Navbar>
    </header>
  );
};

export default HeaderLogo;
