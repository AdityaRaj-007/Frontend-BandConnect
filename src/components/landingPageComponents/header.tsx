import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar overlay">
        <div className="logo">BandConnect</div>
        <ul className="nav-links">
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#">FIND MUSICIANS</a>
          </li>
          <li>
            <a href="#">FIND BANDS</a>
          </li>
          <li>
            <a href="#">EVENTS</a>
          </li>
          <li>
            <a href="#">CONTACT</a>
          </li>
        </ul>
        <div className="nav-actions">
          <a href="#" className="login-btn">
            Login
          </a>
          <a href="#" className="signup-btn">
            Sign Up Free
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
