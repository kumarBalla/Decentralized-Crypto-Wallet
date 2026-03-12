import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import './Features.css';

const featuresData = [
  { title: "Buy", desc: "Turn cash to crypto", amount: "$4,000 USD", bgColor: "#ff6b35", icon: "+", link: "/Buy" },
  { title: "Earn", desc: "Receive rewards", amount: "3.00254 ETH", bgColor: "#b46aff", icon: "🌱", link: "/Earn" },
  { title: "Swaps", desc: "Safely exchange any token", amount: "USD Coin / Ethereum", bgColor: "#1f3d3d", icon: "🔁", link: "/Swaps" },
  { title: "Snaps", desc: "Enhance your wallet with third-party features", amount: "", bgColor: "#1d1464", icon: "✨", link: "/Snaps" },
  { title: "Card", desc: "Spend crypto", amount: "", bgColor: "#5c1a72", icon: "💳", link: "/Card" },
  { title: "Perps", desc: "Long or short tokens", amount: "+$777 (36.4%)", bgColor: "#c9ff4f", icon: "📈", link: "/Perps" }
];

const exploreMoreLinks = [
  { name: "Platforms", path: "/platforms" },
  { name: "Cryptocurrencies", path: "/cryptocurrencies" },
  { name: "Security", path: "/security" },
  { name: "Blog", path: "/blog" },
  { name: "Learn", path: "/learn" }
];

const aboutMetaMaskLinks = [
  { name: "FAQs", path: "/faqs" },
  { name: "Support", path: "/support" },
  { name: "Careers", path: "/careers" }
];

function Features() {
  const navigate = useNavigate();

  return (
    <div className="features-page">
      <div className="features-container">
        {/* Left side grid */}
        <div className="features-grid">
          {featuresData.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card"
              style={{ backgroundColor: feature.bgColor }}
              onClick={() => navigate(feature.link)}
            >
              <div className="feature-info">
                <h2>{feature.title}</h2>
                <p>{feature.desc}</p>
              </div>
              <div className="feature-amount">
                <span>{feature.icon}</span>
                <span>{feature.amount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right side links */}
        <div className="features-right-links">
          {/* Explore More Section */}
          <h3 style={{color:"lightblue"}}>Explore More</h3>
          <ul>
            {exploreMoreLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} style={{ textDecoration: "none", color: "#333"}}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <br></br>
          <br></br>

          {/* About MetaMask Section */}
          <h3 style={{color:"lightblue"}}>About MetaMask</h3>
          <ul>
            {aboutMetaMaskLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} style={{ textDecoration: "none", color: "#333" }}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

        

          {/* Divider line + Follow section */}
          <hr style={{
            margin: "5px 0",
            border: "none",
            borderTop: "1px solid #3a3030ff"
          }} />

          <h3 style={{ marginBottom: "1px" ,color:"lightblue"}}>Follow</h3>

          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={22} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={22} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={22} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Features;
