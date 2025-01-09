import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          At <span className="store-name">ElectronicHub</span>, we bring you the latest and greatest in electronics,
          handpicked for quality and reliability. Our mission is to simplify your tech shopping experience by offering products
          that cater to every need—be it work, entertainment, or innovation.
        </p>
        <h2 className="about-subtitle">Why Choose Us?</h2>
        <ul className="about-list">
          <li>Quality You Can Trust</li>
          <li>Affordable Prices</li>
          <li>Exceptional Support</li>
        </ul>
        <h2 className="about-subtitle">What We Offer</h2>
        <p className="about-text">
          Explore our diverse range of products, including smartphones, laptops, gaming gear, home appliances, and more!
        </p>
        <h2 className="about-subtitle">Our Vision</h2>
        <p className="about-text">
          We envision a world where technology is accessible to everyone. By offering a seamless shopping experience and
          unparalleled service, we aim to become your go-to destination for all things electronics.
        </p>
        <h2 className="about-subtitle">Stay Connected</h2>
        <p className="about-text">
          Follow us on social media and subscribe to our newsletter for the latest deals, product launches, and tech insights.
        </p>
        <div className="social-links">
          <a href="#" className="social-link">Instagram</a>
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Twitter</a>
        </div>
        <h2 className="about-subtitle">Contact Us</h2>
        <p className="about-text">
          Have questions? Need assistance? We’re here to help.  
          <br /> <strong>Email:</strong> support@electronichub.com  
          <br /> <strong>Phone:</strong> +91 98765 43210 
        </p>
      </div>
    </div>
  );
};

export default About;
