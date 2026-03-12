import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import "./App.css";

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const navigate = useNavigate();

  const languages = ["English", "English(UK)", "Русский", "日本語", "한국어", "Español"];

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
    setLangOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo-section">
        <h3>MetaMask</h3>
      </div>

      {/* Hamburger menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* Links */}
      <div className={`nav-links-container ${menuOpen ? "active" : ""}`}>
        {/* ✅ OWNER Access */}
        {user?.role === "owner" ? (
          <>
            <Link to="/admin-dashboard" className="nav-links">Dashboard</Link>
            <Link to="/crud" className="nav-links">crypto Management</Link>
          </>
        ) : (
          // ✅ Normal User Access
          <>
            <Link to="/" className="nav-links">Features</Link>
            <Link to="/Developer" className="nav-links">Developer</Link>
            <Link to="/Metamask" className="nav-links">MetaMask USD</Link>
          </>
        )}
      </div>

      {/* Right section: language + wallet/user */}
      <div className="icon-wallet">
        <div className="language-selector" onClick={() => setLangOpen(!langOpen)}>
          <FaGlobe className="browser-icon" />
          <span>{selectedLang}</span>
          {langOpen && (
            <div className="language-dropdown">
              {languages.map((lang, idx) => (
                <div key={idx} className="language-item" onClick={() => handleLanguageSelect(lang)}>
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ If NOT logged in */}
        {!user ? (
          <button className="wallet-btn" onClick={() => navigate("/register")}>
            GET METAMASK
          </button>
        ) : (
          // ✅ Logged in (User or Owner)
          <div className="user-section">
            <span
              style={{ cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("/Dashboard")}
            >
              {/* ✅ Always shows name (owner/user) */}
              {user.userName || user.ownerName}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
