import React from "react";
import "./Earn.css";

function Earn() {
  return (
    <div className="earn-page">
      <div className="earn-header">
        <h1>Earn Rewards</h1>
        <p>Receive rewards for holding or staking your tokens directly in your wallet.</p>
      </div>

      <div className="earn-cards">
        <div className="earn-card">
          <h3>Stake Tokens</h3>
          <p>Lock your tokens to earn interest or rewards over time.</p>
        </div>
        <div className="earn-card">
          <h3>Hold Rewards</h3>
          <p>Earn passive rewards just by holding eligible cryptocurrencies in your wallet.</p>
        </div>
        <div className="earn-card">
          <h3>Referral Bonus</h3>
          <p>Invite friends and earn bonus tokens when they join and trade.</p>
        </div>
      </div>
    </div>
  );
}

export default Earn;
