import React from 'react';
import './Footer.css';
import { FaTwitter, FaGithub, FaYoutube, FaInstagram, FaDiscord, FaTwitch } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/">Features</a>
        <a href="/Developer">Developer</a>
        <a href="/faqs">FAQs</a>
        <a href="/platforms">Platforms</a>
        <a href="/cryptocurrencies">Cryptocurrencies</a>
        <a href="/support">Support</a>
        <a href="/careers">Careers</a>
      </div>
      
      <div className="social-icons">
        <a href="https://twitter.com/MetaMask"><FaTwitter /></a>
        <a href="https://github.com/MetaMask"><FaGithub /></a>
        <a href="https://youtube.com/MetaMask"><FaYoutube /></a>
        <a href="https://instagram.com/MetaMask"><FaInstagram /></a>
        <a href="https://discord.com/invite/MetaMask"><FaDiscord /></a>
        <a href="https://twitch.tv/MetaMask"><FaTwitch /></a>
      </div>
      <p className="footer-copyright">©2025 MetaMask · A Consensys Formation</p>
    </footer>
  );
};

export default Footer