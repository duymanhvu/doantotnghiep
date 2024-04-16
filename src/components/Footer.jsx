import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Row, Col } from "react-bootstrap";

import logo from "../assets/img/logo_footer.svg";
import contact_email from "../assets/img/ic_contact_email.svg";
import contact_location from "../assets/img/ic_contact_location.svg";
import ic_phone from "../assets/img/ic_phone.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <Navbar
        expand="lg"
        className="flex-column p-0"
        style={{ borderTop: "1px solid #D8D8E2" }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar>
            <Row>
              <Nav as={Col} xxl xl lg md sm xs className="flex-column">
                <h3 className="nav-head">About the 25th AGM</h3>
                <Link className="nav-link" to="/overview">
                  Overview
                </Link>
                <Link className="nav-link" to="/message">
                  Message from the Host
                </Link>
              </Nav>
              <Nav as={Col} xxl xl lg md sm xs className="flex-column">
                <h3 className="nav-head">Agenda</h3>
                <Link className="nav-link" to="/program">
                  Program
                </Link>
                <Link className="nav-link" to="/speakers">
                  Speakers
                </Link>
                <Link className="nav-link" to="/tour">
                  Optional Tour
                </Link>
              </Nav>
              <Nav as={Col} xxl xl lg md sm className="flex-column">
                <h3 className="nav-head">Resources</h3>
                <Link className="nav-link" to="/photos">
                  Conference Photos
                </Link>
                <Link className="nav-link" to="/local">
                  Local Information
                </Link>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </Nav>
            </Row>
            <Row>
              <Nav as={Col} xxl={8} xl={8} lg={8} className="flex-column">
                <h3 className="nav-head">Contact us</h3>
                <Link to="mailto:ACG25contact@vsd.vn" className="nav-link">
                  <img src={contact_email} alt="email" />
                  ACG25contact@vsd.vn (The 25th AGM Organizing Team)
                </Link>
                <Link
                  to="https://goo.gl/maps/qBeW1r2WGUrUzeTg9"
                  target="_blank"
                  className="nav-link"
                >
                  <img src={contact_location} alt="location" />
                  112 Hoang Quoc Viet, Nghia Tan ward, Cau Giay district, Hanoi,
                  Vietnam
                </Link>
                <Link
                  to="https://goo.gl/maps/qBeW1r2WGUrUzeTg9"
                  target="_blank"
                  className="nav-link"
                >
                  <img src={ic_phone} alt="phone" />
                  (+84) 2439740870
                </Link>
              </Nav>
            </Row>
          </Navbar>
        </Container>
        <div className="copyright">
          <div className="copyright__text">
            Copyright (c) The 25th General Meeting of Asia-Pacific Central
            Securities Depository Group. All Rights Reserved
          </div>
        </div>
      </Navbar>
    </footer>
  );
};

export default Footer;
