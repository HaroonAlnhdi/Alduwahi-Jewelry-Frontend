import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./NavBar.css";
import { AiOutlineGlobal } from "react-icons/ai";
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlinePhone, AiOutlineUser, AiOutlineLogout, AiOutlineShoppingCart, AiOutlineAppstore, AiOutlineHeart } from "react-icons/ai";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useTranslation } from "react-i18next";

const MyNavbar = ({ user, handleSignout }) => {
  const { userId } = useParams();
  const { t, i18n } = useTranslation();

  // Function to toggle language
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-light bg-gradient">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/pic/logo.png" alt="Logo" className="logo" />
          <span className="brandName">ALDOWAIHI JEWELERS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">
                  <AiOutlineHome /> <span className="font">{t("home")}</span>
                </Nav.Link>
                <Nav.Link as={Link} to={`products/`}>
                  <AiOutlineAppstore /> <span className="font">{t("collections")}</span>
                </Nav.Link>
                <Nav.Link as={Link} to="aboutus">
                  <AiOutlineInfoCircle /> <span className="font">{t("about")}</span>
                </Nav.Link>
                <Nav.Link as={Link} to={`contactUs/`}>
                  <AiOutlinePhone /> <span className="font">{t("contact")}</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  <AiOutlineHome /> <span className="font">{t("home")}</span>
                </Nav.Link>
                <Nav.Link as={Link} to={`products/`}>
                  <AiOutlineAppstore /> <span className="font">{t("collections")}</span>
                </Nav.Link>
                <Nav.Link as={Link} to="aboutus">
                  <AiOutlineInfoCircle /> <span className="font">{t("about")}</span>
                </Nav.Link>
                <Nav.Link as={Link} to={`contactUs/`}>
                  <AiOutlinePhone /> <span className="font">{t("contact")}</span>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to={`ShoppingCart/${user._id}`}>
                  <AiOutlineShoppingCart /> <span className="font">{t("cart")}</span>
                </Nav.Link>

                <Nav.Link as={Link} to={`Favorites/${user._id}`}>
                  <AiOutlineHeart /> <span className="font">{t("favorites")}</span>
                </Nav.Link>

                <NavDropdown title={t("profile")} id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to={`profile/${user._id}`}>
                    <AiOutlineUser /> {t("profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={`orders/${user._id}`}>
                    <AiOutlineShoppingCart /> {t("orders")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="" onClick={handleSignout}>
                    <AiOutlineLogout /> {t("signOut")}
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin">
                  <AiOutlineUser /> {t("signIn")}
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <AiOutlineUser /> {t("signUp")}
                </Nav.Link>
              </>
            )}
            {/* Language Switcher Button */}
           
          </Nav>
        </Navbar.Collapse>
        <Nav.Link onClick={() => handleLanguageChange(i18n.language === "en" ? "ar" : "en")} className="lang-toggle">
              <span className="lang-circle" style={{ cursor: 'pointer' }}>
                <AiOutlineGlobal style={{ marginRight: '5px' }} />
                {i18n.language === "en" ? "AR" : "EN"}
              </span>
            </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
