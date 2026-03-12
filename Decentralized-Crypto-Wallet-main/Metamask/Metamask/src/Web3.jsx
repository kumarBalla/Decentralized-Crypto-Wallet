import React from "react";
import "./Web3.css";

function Web3() {
  return (
    <div className="web3-page">
      {/* Top Section */}
      <div className="web3-top">
        <div className="web3-top-left">
          <h1>MetaMask Web3 Services</h1>
          <p>
            Build and scale dapps with battle-tested infrastructure and powerful APIs 
            across major networks like Ethereum, Linea, Polygon, and more. Access Ethereum 
            and Linea Sepolia test networks for a controlled and risk-free testing environment.
          </p>
          <a 
            href="https://docs.metamask.io/sdk?utm_source=www.google.com"
            target="_blank" 
            rel="noopener noreferrer"
            className="web3-btn"
          >
            VIEW THE DOCS
          </a>
        </div>
        <div className="web3-top-right">
          <img src="/graph.png" alt="Web3 Services" />
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="web3-cards">
        <div className="web3-card">
          <h3>Comprehensive access to major blockchain networks</h3>
          <p>
            Connect to major networks and protocols. Build on scalable and reliable infrastructure 
            from Infura with 99.9% uptime.
          </p>
        </div>

        <div className="web3-card">
          <h3>Guarantee 100% uptime with failover support</h3>
          <p>
            Ensure your dapps never go down with redundant nodes and failover support for critical applications.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Web3;
