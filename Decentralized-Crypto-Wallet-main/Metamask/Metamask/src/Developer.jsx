import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import "./Developer.css";

const developerData = [
  { title: "MetaMask SDK", desc: "Integrate with MetaMask", link: "/Sdk" },
  { title: "Web3 Services", desc: "Trusted dapp infrastructure", link: "/Web3" },
  { title: "Dashboard", desc: "Manage API keys and endpoints", link: "/Dashboard" },
  { title: "Delegation Toolkit", desc: "Create walletless dapps", link: "/Toolkit" },
  { title: "Embedded Wallets", desc: "Design on-chain experiences", link: "/Wallets" },
  { title: "Snaps", desc: "Extend MetaMask", link: "/Snaps" },
];

const exploreMoreLinks = [
  { name: "Home", path: "/" },
  { name: "Community Calls", path: "/Community" },
  { name: "GitHub", path: "https://github.com/MetaMask" },
  { name: "Blog", path: "/Blog" },
];

const aboutMetaMaskLinks = [
  { name: "Support", path: "/Support" },
  { name: "Careers", path: "/Careers" },
];

function Developer() {
  const navigate = useNavigate();

  return (
    <div className="developer-page">
      <div className="developer-container">
        {/* Left: Developer Feature Cards */}
        <div className="developer-grid">
          {developerData.map((dev, idx) => (
            <div
              key={idx}
              className="developer-card"
              onClick={() => navigate(dev.link)}
            >
              <div className="developer-info">
                <h2>{dev.title}</h2>
                <p>{dev.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Links Section */}
        <div className="developer-right-links">
          {/* Explore More */}
          <h3>Explore More</h3>
          <ul>
            {exploreMoreLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* About MetaMask */}
          <div className="about-section">
            <h3>About MetaMask</h3>
            <ul>
              {aboutMetaMaskLinks.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} style={{ textDecoration: "none" }}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <hr />

          {/* Social Icons */}
          <h3>Follow</h3>
          <div className="social-icons">
            <FaTwitter size={22} />
            <FaYoutube size={22} />
            <FaFacebook size={22} />
            <FaInstagram size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developer;
