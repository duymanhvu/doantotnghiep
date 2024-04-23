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
                <h3 className="nav-head">Về Sen Center</h3>
                <Link className="nav-link" to="/overview">
                  Overview
                </Link>
                <Link className="nav-link" to="/message">
                  Message from the Host
                </Link>
              </Nav>
              <Nav as={Col} xxl xl lg md sm xs className="flex-column">
                <h3 className="nav-head">Thông tin</h3>
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
                <h3 className="nav-head">Khóa Học</h3>
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
                <h3 className="nav-head">Liên hệ với chúng tôi</h3>
                <Link to="mailto:ACG25contact@vsd.vn" className="nav-link">
                  <img src={contact_email} alt="email" />
                  senenglishcenter@gmail.com
                </Link>
                <Link
                  to="https://www.google.com/maps/place/SEN+English+Center/@20.9788841,105.8302392,17z/data=!3m1!4b1!4m6!3m5!1s0x3135adf98071d895:0xb4bbe1f4acc1def5!8m2!3d20.9788791!4d105.8328141!16s%2Fg%2F11jszln6sp?hl=vi-VN&entry=ttu"
                  target="_blank"
                  className="nav-link"
                >
                  <img src={contact_location} alt="location" />
                  Số 36, ngõ 245, ngách 96, Định Công, Hoàng Mai, Hà Nội,
                  Việt Nam
                </Link>
                <Link
                  to="https://www.google.com/maps/place/SEN+English+Center/@20.9788841,105.8302392,17z/data=!3m1!4b1!4m6!3m5!1s0x3135adf98071d895:0xb4bbe1f4acc1def5!8m2!3d20.9788791!4d105.8328141!16s%2Fg%2F11jszln6sp?hl=vi-VN&entry=ttu"
                  target="_blank"
                  className="nav-link"
                >
                  <img src={ic_phone} alt="phone" />
                  090 329 52 18
                </Link>
              </Nav>
            </Row>
          </Navbar>
        </Container>
        <div className="copyright">
          <div className="copyright__text">
            Copyright (c) Duymanhvu. All Rights Reserved
          </div>
        </div>
      </Navbar>
    </footer>
  );
};

export default Footer;
