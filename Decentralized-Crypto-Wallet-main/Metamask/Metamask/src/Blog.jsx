import React from "react";
import "./Blog.css";

function Blog() {
  const blogPosts = [
    {
      title: "Crypto Market Trends 2025",
      summary: "Discover the latest trends in the crypto market and learn how to make informed decisions.",
      date: "Oct 15, 2025",
    },
    {
      title: "How to Secure Your Wallet",
      summary: "A step-by-step guide to keeping your crypto assets safe and protected from threats.",
      date: "Oct 10, 2025",
    },
    {
      title: "Top 5 Altcoins to Watch",
      summary: "An overview of promising altcoins and what makes them interesting for investors.",
      date: "Oct 8, 2025",
    },
    {
      title: "Understanding Blockchain Technology",
      summary: "Learn the fundamentals of blockchain and how it powers the crypto ecosystem.",
      date: "Oct 5, 2025",
    },
  ];

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog</h1>
        <p>Read the latest news, updates, and educational articles about crypto.</p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-card">
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <span className="blog-date">{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
