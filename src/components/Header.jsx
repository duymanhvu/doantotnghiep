import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "../assets/logoSen.png";
import navbar from "../assets/img/ic_navbar.svg";
import close from "../assets/img/ic_close.svg";

import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const {
    logoutUser,
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  const location = useLocation();

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  const handleRegistrationClick = () => {
    if (!showRegistration) {
      setShowRegistration(true);
      setShowAbout(false);
      setShowAgenda(false);
      setShowResources(false);
    } else {
      setShowRegistration(false);
    }
  };

  const handleAboutClick = () => {
    if (!showAbout) {
      setShowAbout(true);
      setShowAgenda(false);
      setShowRegistration(false);
      setShowResources(false);
    } else {
      setShowAbout(false);
    }
  };

  const handleAgendaClick = () => {
    if (!showAgenda) {
      setShowAbout(false);
      setShowRegistration(false);
      setShowAgenda(true);
      setShowResources(false);
    } else {
      setShowAgenda(false);
    }
  };

  const handleResourcesClick = () => {
    if (!showResources) {
      setShowAbout(false);
      setShowRegistration(false);
      setShowAgenda(false);
      setShowResources(true);
    } else {
      setShowResources(false);
    }
  };

  const handleLinkClick = () => {
    setShowAbout(false);
    setShowAgenda(false);
    setShowResources(false);
    setShowRegistration(false);
    const email = JSON.parse(localStorage.getItem("email"));
    const userType = JSON.parse(localStorage.getItem("userTypel"));
    if (email !== "teacher2@gmail.com") {
      // Nếu email không phải là "aomathe@gmail.com", ẩn các tab "TabNew" và "Teacher"
      const resourcesLinks = document.querySelectorAll('a[href="/student"], a[href="/teacher"],a[href="/parent"],a[href="/calendar"],a[href="/subject"],a[href="/classroom"],a[href="/speakers"]');
      resourcesLinks.forEach((link) => {
        link.style.display = "none";
      });
    }
  };

  const setHeader = () => {
    if (window.scrollY >= 700) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  };

  window.addEventListener("scroll", setHeader);

  useEffect(() => {
    handleLinkClick();
    setToggleMenu(false);
  }, [location]);

  return (
    <header className="header">
      <Navbar collapseOnSelect expand="lg" className={`fixed-top ${stickyHeader ? "bg-light" : ""} ${toggleMenu ? "is-mobile" : ""}`}>
        <Container>
          <Nav.Link as={Link} to="/home" className="navbar-brand">
            <img src={logo} alt="logo" />
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggleMenu}>
            {toggleMenu ? <img src={close} alt="close" /> : <img src={navbar} alt="open" />}
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-content-end" style={{ paddingRight: "16px" }}>
            <Nav>
              <NavDropdown title="Trang chủ" show={showRegistration} onToggle={handleRegistrationClick} renderMenuOnMount className={isNavLinkActive("") || isNavLinkActive("/registrationAccommodation") ? "active" : ""}>
                {/* <Nav.Link
                  as={Link}
                  to="/registration"
                  onClick={handleLinkClick}
                  eventKey="1"
                >
                  Conference
                </Nav.Link> */}
                <Nav.Link as={Link} to="/registrationAccommodation" onClick={handleLinkClick} eventKey="2">
                  Thông tin
                </Nav.Link>
              </NavDropdown>
              <NavDropdown title="Về Sen" show={showAbout} onToggle={handleAboutClick} renderMenuOnMount className={isNavLinkActive("/overview") || isNavLinkActive("/message") ? "active" : ""}>
                <Nav.Link as={Link} to="/overview" onClick={handleLinkClick} eventKey="3">
                  Overview
                </Nav.Link>
                <Nav.Link as={Link} to="/message" onClick={handleLinkClick} eventKey="4">
                  Message from the Host
                </Nav.Link>
              </NavDropdown>
              <NavDropdown title="Thời khóa biểu" show={showAgenda} onToggle={handleAgendaClick} renderMenuOnMount>
                <Nav.Link as={Link} to="/program" onClick={handleLinkClick} eventKey="5">
                  Thời khóa biểu của con
                </Nav.Link>
                <Nav.Link as={Link} to="/concuaban" onClick={handleLinkClick} eventKey="6">
                  Thông tin con của bạn
                </Nav.Link>
                <Nav.Link as={Link} to="/lichcuathay" onClick={handleLinkClick} eventKey="7">
                  Lịch dạy giáo viên
                </Nav.Link>
              </NavDropdown>
              <NavDropdown title="Chức năng" show={showResources} onToggle={handleResourcesClick} renderMenuOnMount>
                <Nav.Link as={Link} to="/danhsachhs" onClick={handleLinkClick} eventKey="8">
                  Danh sách học sinh
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/local" onClick={handleLinkClick} eventKey="9">
                  Local Information
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" onClick={handleLinkClick} eventKey="10">
                  Contact
                </Nav.Link> */}

                <Nav.Link as={Link} to="/test" onClick={handleLinkClick} eventKey="11">
                  Đăng ký lịch học
                </Nav.Link>
                <Nav.Link as={Link} to="/speakers" onClick={handleLinkClick} eventKey="12">
                  Quản lý thời khóa biểu
                </Nav.Link>
                <Nav.Link as={Link} to="/teacher" onClick={handleLinkClick} eventKey="13">
                  Quản lý giáo viên
                </Nav.Link>
                <Nav.Link as={Link} to="/student" onClick={handleLinkClick} eventKey="14">
                  Quản lý học sinh
                </Nav.Link>
                <Nav.Link as={Link} to="/parent" onClick={handleLinkClick} eventKey="15">
                  Quản lý phụ huynh
                </Nav.Link>
                <Nav.Link as={Link} to="/calendar" onClick={handleLinkClick} eventKey="16">
                  Thời khóa biểu
                </Nav.Link>
                <Nav.Link as={Link} to="/subject" onClick={handleLinkClick} eventKey="17">
                  Quản lý môn học
                </Nav.Link>
                <Nav.Link as={Link} to="/classroom" onClick={handleLinkClick} eventKey="18">
                  Quản lý phòng học
                </Nav.Link>
              </NavDropdown>
              {isAuthenticated ? (
                <Nav.Link onClick={logoutUser} as={Link} to="/login">
                  Đăng Xuất
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Đăng Nhập
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
