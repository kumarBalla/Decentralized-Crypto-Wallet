import React from "react";
import "./Wallets.css";

function Wallets() {
  return (
    <div className="wallets-page">
      {/* Top Section */}
      <div className="wallets-top">
        <div className="wallets-left">
          <img src="/wallet.jpeg" alt="Embedded Wallets" className="wallets-image" />
        </div>
        <div className="wallets-right">
          <h1>MetaMask Embedded Wallets</h1>
          <p className="wallets-subtitle">
            Build on-chain experiences without requiring external wallets.
          </p>
          <p className="wallets-description">
            Embedded wallets allow your users to interact with dapps seamlessly,
            without leaving your platform. Secure, fast, and user-friendly, these
            wallets are fully integrated with MetaMask’s ecosystem.
          </p>
          <a
            href="https://docs.metamask.io/wallets"
            target="_blank"
            rel="noopener noreferrer"
            className="wallets-btn"
          >
            VIEW THE DOCS
          </a>
        </div>
      </div>

      {/* Bottom Section: Features */}
      <div className="wallets-features">
        <div className="wallets-card">
          <h3>Secure Transactions</h3>
          <p>Keep user assets safe with MetaMask-grade security and cryptography.</p>
        </div>
        <div className="wallets-card">
          <h3>Seamless Integration</h3>
          <p>Integrate wallets directly into your app or platform with minimal code.</p>
        </div>
        <div className="wallets-card">
          <h3>Cross-Platform Support</h3>
          <p>Works on web, mobile, and React Native for a consistent experience.</p>
        </div>
      </div>
    </div>
  );
}

export default Wallets;
