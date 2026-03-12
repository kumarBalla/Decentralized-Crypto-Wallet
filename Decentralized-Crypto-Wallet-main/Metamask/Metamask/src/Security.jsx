import React from "react";
import "./Security.css";

function Security() {
  const securityTips = [
    {
      title: "Two-Factor Authentication",
      description: "Enable 2FA to add an extra layer of security to your account.",
      icon: "🔒",
    },
    {
      title: "Secure Your Private Keys",
      description: "Never share your private keys and store them in a safe place.",
      icon: "🗝️",
    },
    {
      title: "Beware of Phishing",
      description: "Always verify URLs and never click suspicious links.",
      icon: "⚠️",
    },
    {
      title: "Use Hardware Wallets",
      description: "Store your crypto assets in hardware wallets for maximum safety.",
      icon: "💳",
    },
  ];

  return (
    <div className="security-page">
      <div className="security-header">
        <h1>Security</h1>
        <p>Learn about security best practices and how to protect your crypto assets.</p>
      </div>

      <div className="security-grid">
        {securityTips.map((tip, index) => (
          <div key={index} className="security-card">
            <div className="security-icon">{tip.icon}</div>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Security;
