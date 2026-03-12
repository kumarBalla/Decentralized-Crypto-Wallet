import React from "react";
import "./Support.css";

function Support() {
  const supportTopics = [
    {
      title: "Account Recovery",
      description: "Step-by-step instructions to recover your MetaMask account safely.",
      link: "#"
    },
    {
      title: "Technical Issues",
      description: "Troubleshoot common technical problems in MetaMask wallet and extensions.",
      link: "#"
    },
    {
      title: "Security Concerns",
      description: "Learn how to handle phishing attempts, scams, and protect your assets.",
      link: "#"
    },
    {
      title: "FAQ",
      description: "Find answers to the most frequently asked questions about MetaMask.",
      link: "#"
    },
  ];

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>Support</h1>
        <p>Get help with MetaMask issues, account recovery, and technical support.</p>
      </div>

      <div className="support-grid">
        {supportTopics.map((topic, index) => (
          <div key={index} className="support-card">
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <a href={topic.link} className="support-link">Learn More →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Support;
