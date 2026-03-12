import React from "react";
import "./Careers.css";

function Careers() {
  const jobs = [
    {
      title: "Frontend Developer",
      location: "Remote",
      description: "Work on MetaMask interfaces and enhance user experience.",
      link: "#"
    },
    {
      title: "Backend Engineer",
      location: "San Francisco, CA",
      description: "Develop secure and scalable APIs for our crypto wallet services.",
      link: "#"
    },
    {
      title: "Security Analyst",
      location: "Remote",
      description: "Protect user assets and secure MetaMask applications.",
      link: "#"
    },
    {
      title: "Product Manager",
      location: "New York, NY",
      description: "Lead projects and coordinate product development cycles.",
      link: "#"
    },
  ];

  return (
    <div className="careers-page">
      <div className="careers-header">
        <h1>Careers</h1>
        <p>Explore job opportunities and join the MetaMask team to work on crypto innovations.</p>
      </div>

      <div className="careers-grid">
        {jobs.map((job, index) => (
          <div key={index} className="career-card">
            <h3>{job.title}</h3>
            <p className="job-location">{job.location}</p>
            <p>{job.description}</p>
            <a href={job.link} className="apply-link">Apply Now →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Careers;
