import './ComponentHeader.css'; 
import Logo from "../assets/logo.webp"
import React from 'react';


const Header = () => {
  return  <div className="component-header">
    <img src={Logo} alt="Header Image" className="header-logo" />
  <h1>Ticket2Attraction</h1>
</div>;
};



export default Header;
