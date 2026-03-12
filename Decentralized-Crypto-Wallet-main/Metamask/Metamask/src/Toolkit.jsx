import React from "react";
import "./Toolkit.css";

function Toolkit() {
  return (
    <div className="toolkit-page">
      {/* Top Section */}
      <div className="toolkit-top">
        <div className="toolkit-left">
          <img src="/delegation.png" alt="Delegation Toolkit" className="toolkit-image" />
        </div>
        <div className="toolkit-right">
          <h1>MetaMask Delegation Toolkit</h1>
          <p className="toolkit-subtitle">
            Give your users a walletless dapp experience effortlessly.
          </p>
          <p className="toolkit-description">
            The Delegation Toolkit simplifies onboarding for new users, letting developers create walletless dapps with fewer lines of code. Integrated with MetaMask’s APIs, it ensures security, speed, and seamless experience.
          </p>
          <a
            href="https://docs.metamask.io/toolkit"
            target="_blank"
            rel="noopener noreferrer"
            className="toolkit-btn"
          >
            VIEW THE DOCS
          </a>
        </div>
      </div>

      {/* Bottom Section: Features */}
      <div className="toolkit-features">
        <div className="toolkit-card">
          <h3>Easy Integration</h3>
          <p>Set up walletless dapps quickly with minimal configuration.</p>
        </div>
        <div className="toolkit-card">
          <h3>Secure by Design</h3>
          <p>Built with MetaMask security principles for safe transactions.</p>
        </div>
        <div className="toolkit-card">
          <h3>Cross-Platform</h3>
          <p>Supports web, mobile, and React Native environments.</p>
        </div>
      </div>
    </div>
  );
}

export default Toolkit;
