import React from "react";
import "./Community.css";

function Community() {
  const communityCalls = [
    {
      title: "Monthly Dev Meetup",
      description: "Join our monthly developer meetup to discuss new features and share insights.",
    },
    {
      title: "Hackathon Highlights",
      description: "Explore projects from the latest MetaMask hackathons and get inspired.",
    },
    {
      title: "Ask Me Anything",
      description: "Engage in AMA sessions with MetaMask engineers and product leads.",
    },
    {
      title: "Web3 Workshops",
      description: "Participate in workshops to learn about smart contracts, dApps, and blockchain.",
    },
  ];

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>Community Calls</h1>
        <p>Connect with MetaMask developers, participate in events, and stay updated with the community.</p>
      </div>

      <div className="community-card-grid">
        {communityCalls.map((call, index) => (
          <div key={index} className="community-card">
            <h3>{call.title}</h3>
            <p>{call.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
