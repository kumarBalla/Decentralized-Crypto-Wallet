import React from "react";
import "./Platforms.css";

function Platforms() {
  const platforms = [
    { name: "Uniswap", description: "Decentralized exchange platform", icon: "🦄" },
    { name: "OpenSea", description: "NFT marketplace platform", icon: "🌊" },
    { name: "Aave", description: "Lending & borrowing platform", icon: "💰" },
    { name: "Compound", description: "Crypto lending platform", icon: "🏦" },
  ];

  return (
    <div className="platforms-page">
      <div className="platforms-header">
        <h1>Platforms</h1>
        <p>Explore all platforms integrated with MetaMask and access their services.</p>
      </div>

      <div className="platforms-grid">
        {platforms.map((platform, index) => (
          <div key={index} className="platform-card">
            <div className="platform-icon">{platform.icon}</div>
            <h3>{platform.name}</h3>
            <p>{platform.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Platforms;
