import React from "react";
import "./Card.css";

function Card() {
  const cardFeatures = [
    {
      title: "Instant Payments",
      description: "Use your crypto balance to pay anywhere, anytime with ease.",
    },
    {
      title: "Global Acceptance",
      description: "Accepted at millions of merchants worldwide.",
    },
    {
      title: "Secure Transactions",
      description: "Protected with MetaMask’s top-tier security protocols.",
    },
    {
      title: "Real-time Conversion",
      description: "Automatically convert crypto to fiat at the best rates.",
    },
  ];

  return (
    <div className="card-page">
      <div className="card-header">
        <h1>Crypto Card</h1>
        <p>Spend your crypto easily with the MetaMask debit card integration.</p>
      </div>

      <div className="card-grid">
        {cardFeatures.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
