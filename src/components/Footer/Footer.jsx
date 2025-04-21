import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaInfoCircle,
  FaQuestionCircle,
  FaShieldAlt,
  FaUsers,
  FaShoppingCart,
  FaFileAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer_area section_padding_130_0">
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-footer-widget section_padding_0_130">
              <div className="footer-logo mb-3"></div>
              <p>
                M.Line Boutique offers a unique and stylish collection of
                fashion items, carefully curated to meet the latest trends and
                timeless classics. Discover our range of clothing, accessories,
                and more, designed to elevate your style and confidence.
              </p>

              <div className="copywrite-text mb-5">
                <p className="mb-0">
                  <a className="ml-1" href="/">
                    <img src="/pic/logo.png" alt="Logo" />
                  </a>
                </p>
              </div>

              {/* Footer Social Area*/}
              <div className="footer_social_area">
                <a
                  href="https://www.facebook.com"
                  className="facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.twitter.com"
                  className="twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/m.lineboutique/"
                  className="instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com"
                  className="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">About</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li>
                    <a href="/aboutus">
                      <FaInfoCircle /> About Us
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaShoppingCart /> Corporate Sale
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaFileAlt /> Terms &amp; Policy
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaUsers /> Community
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title*/}
              <h5 className="widget-title">Support</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li>
                    <a href="#">
                      <FaQuestionCircle /> Help
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaShieldAlt /> Support
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaShieldAlt /> Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaFileAlt /> Term &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaQuestionCircle /> Help &amp; Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              <h5 className="widget-title">Contact</h5>
              {/* Footer Menu*/}
              <div className="footer_menu">
                <ul>
                  <li>
                    <a href="#">
                      <FaPhone /> Call Centre
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaEnvelope /> Email Us
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaFileAlt /> Term &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaQuestionCircle /> Help Center
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;