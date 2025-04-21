import React from "react";
import "./AboutUs.css"; // Ensure this file contains the updated CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import teamImage from "/pic/logo.png";

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to M.Line Fashion</h1>
          <p>
            Discover our journey, mission, and the values that set us apart in
            the fashion industry.
          </p>
        </div>
      </section>

      <section className="info-sections">
        <div className="info-card fade-in">
          <h2>Our Vision</h2>
          <p>
            Our vision is to be the leading fashion brand that sets the standard for
            excellence in the industry. We strive to be the first choice for fashion enthusiasts by offering innovative designs, maintaining high-quality standards, and fostering a culture of creativity and style.
          </p>
        </div>
        <div className="info-card fade-in">
          <h2>Our Mission</h2>
          <p>
            At M.Line Fashion, our mission is to inspire and empower individuals through fashion. We are committed to providing trendy, sustainable, and affordable clothing while contributing to the fashion community. Our team of dedicated professionals is focused on delivering a seamless shopping experience from start to finish.
          </p>
        </div>
      </section>

      <section className="values">
        <h2 className="section-title">Our Values</h2>
        <div className="values-grid">
          {[
            { icon: faHeart, title: "Fashion-Forward", description: "We stay ahead of the fashion curve, offering the latest trends and styles to our customers." },
            { icon: faHeart, title: "Creativity", description: "We embrace creativity and encourage self-expression through our fashion designs." },
            { icon: faHeart, title: "Quality", description: "We maintain high-quality standards to ensure our customers receive durable and well-crafted clothing." },
            { icon: faHeart, title: "Authenticity", description: "We believe in being true to ourselves and our customers, providing authentic fashion experiences." },
            { icon: faHeart, title: "Community", description: "We are committed to building a fashion community, supporting local initiatives and fostering inclusivity." },
          ].map((value, index) => (
            <div key={index} className="value-item scale-hover">
              <FontAwesomeIcon icon={value.icon} className="value-icon" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="meet-team info-card">
        <h2 className="section-title">Meet Our Team</h2>
        <img src={teamImage} alt="Team" className="team-image" />
        <p>
          Our team is the driving force behind M.Line Fashion. From our talented designers to our dedicated staff, each member plays a crucial role in delivering exceptional fashion experiences. We are proud of our diverse and passionate team, who share a common goal of providing you with the latest fashion trends and outstanding customer service.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
