// src/HomePage.jsx
import React from 'react';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">A</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Contact us</li>
          <li>Team</li>
        </ul>
      </nav>
      <div className="content">
        <div className="intro">
          <h1>Hello, <br /> I'm Aqsam</h1>
          <p>UI/UX Designer, Flutter developer</p>
          <div className="buttons">
            <button className="hire-me">Hire me</button>
            <button className="download-cv">Download CV</button>
          </div>
        </div>
        <div className="profile-pic">
          <img src="profile-pic.png" alt="Profile" />
        </div>
      </div>
      <div className="social-icons">
        <div className="icon">IG</div>
        <div className="icon">FB</div>
        <div className="icon">TW</div>
      </div>
    </div>
  );
};

export default App;