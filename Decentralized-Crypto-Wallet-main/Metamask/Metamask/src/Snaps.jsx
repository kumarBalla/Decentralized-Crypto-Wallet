import React from "react";
import "./Snaps.css";

function Snaps() {
  const snapsList = [
    {
      title: "DeFi Integrations",
      description: "Connect your wallet with decentralized finance apps for seamless transactions.",
      link: "#"
    },
    {
      title: "NFT Plugins",
      description: "Add NFT management tools to enhance your MetaMask experience.",
      link: "#"
    },
    {
      title: "Analytics Tools",
      description: "Get insights into your wallet activity and portfolio performance.",
      link: "#"
    },
    {
      title: "Security Enhancements",
      description: "Install plugins to strengthen wallet security and alerts.",
      link: "#"
    },
  ];

  return (
    <div className="snaps-page">
      <div className="snaps-header">
        <h1>Snaps</h1>
        <p>Enhance your MetaMask wallet by adding third-party features and plugins.</p>
      </div>

      <div className="snaps-grid">
        {snapsList.map((snap, index) => (
          <div key={index} className="snap-card">
            <h3>{snap.title}</h3>
            <p>{snap.description}</p>
            <a href={snap.link} className="learn-link">Learn More →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Snaps;
