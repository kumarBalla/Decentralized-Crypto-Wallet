import React from "react";
import "./Sdk.css";

function Sdk() {
  return (
    <div className="sdk-page">
      <div className="sdk-grid">
        {/* Top Left: Image */}
        <div className="sdk-image">
          <img src="/phone1.png" alt="MetaMask Phone" />
        </div>

        {/* Top Right: Title + Subtitle */}
        <div className="sdk-title">
          <h1>MetaMask <br /> SDK</h1>
          <p>Give your users a reliable, fast, and seamless wallet connection 
            on desktop and mobile with MetaMask SDK.
          </p>
          <a href="https://docs.metamask.io/sdk?utm_source=www.google.com"  target="_blank"  rel="noopener noreferrer"className="view-btn">
             VIEW THE DOCS
         </a>
         </div>

        {/* Bottom Left: Simplified Code Description */}
        <div className="sdk-description">
          <h2>Simplified Code</h2>
          <p>
            Bundles all MetaMask APIs into a single interface. One integration
            for browser extension and mobile. Smaller package size and fewer
            lines of code for dapp developers. Integrated with Wagmi and
            Web3-Onboard. Available on: React, JavaScript, Next.js, Wagmi and
            React Native.
          </p>
        </div>

        {/* Bottom Right: Example Code */}
        <div className="sdk-code">
          <h2>Example React Integration</h2>
          <pre>
{`import { MetaMaskSDK } from '@metamask/sdk';

const sdk = new MetaMaskSDK();
const provider = sdk.getProvider();

async function connectWallet() {
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  console.log('Connected:', accounts[0]);
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Sdk;
