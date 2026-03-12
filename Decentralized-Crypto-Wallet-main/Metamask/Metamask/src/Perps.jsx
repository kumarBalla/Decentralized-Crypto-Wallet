import React from "react";
import "./Perps.css";

function Perps() {
  const perpsFeatures = [
    {
      title: "Long & Short Positions",
      description:
        "Open long or short trades on popular tokens with leverage to maximize potential gains.",
    },
    {
      title: "Advanced Trading Tools",
      description:
        "Utilize technical analysis tools, charts, and indicators to make informed trading decisions.",
    },
    {
      title: "Risk Management",
      description:
        "Set stop-loss and take-profit levels to protect your positions from market volatility.",
    },
    {
      title: "Real-Time Market Data",
      description:
        "Access live prices, volume, and market depth to trade efficiently.",
    },
  ];

  return (
    <div className="perps-page">
      <div className="perps-header">
        <h1>Perpetuals Trading</h1>
        <p>Trade long or short positions on tokens using advanced perpetual contracts.</p>
      </div>

      <div className="perps-card-grid">
        {perpsFeatures.map((feature, index) => (
          <div key={index} className="perps-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Perps;
