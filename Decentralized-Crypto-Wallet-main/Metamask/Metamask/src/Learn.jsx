import React from "react";
import "./Learn.css";

function Learn() {
  const resources = [
    {
      title: "Getting Started with MetaMask",
      description: "Step-by-step guide to set up your MetaMask wallet and connect to platforms.",
      link: "#"
    },
    {
      title: "Understanding Ethereum",
      description: "Learn the basics of Ethereum, smart contracts, and how it powers DeFi.",
      link: "#"
    },
    {
      title: "Crypto Trading 101",
      description: "Beginner-friendly tutorials on buying, selling, and managing cryptocurrencies.",
      link: "#"
    },
    {
      title: "Security Best Practices",
      description: "Keep your crypto assets safe with essential security tips.",
      link: "#"
    },
  ];

  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1>Learn</h1>
        <p>Access tutorials, guides, and resources to get started with crypto and MetaMask.</p>
      </div>

      <div className="learn-grid">
        {resources.map((res, index) => (
          <div key={index} className="learn-card">
            <h3>{res.title}</h3>
            <p>{res.description}</p>
            <a href={res.link} className="learn-link">Read More →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learn;
