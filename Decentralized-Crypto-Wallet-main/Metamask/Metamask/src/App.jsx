import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Import your components/pages
import Navbar from "./Navbar";
import Features from "./Features";
import Developer from "./Developer";
import Metamask from "./Metamask";
import Wallets from "./Wallets";
import Register from "./Register";
import Login from "./Login";
import Buy from "./Buy";
import Earn from "./Earn";
import Swaps from "./Swaps";
import Snaps from "./Snaps";
import Card from "./Card";
import Perps from "./Perps";
import Platforms from "./Platforms";
import Cryptocurrencies from "./Cryptocurrencies";
import Security from "./Security";
import Blog from "./Blog";
import Learn from "./Learn";
import Faqs from "./FAQs";
import Support from "./Support";
import Careers from "./Careers";
import Sdk from "./Sdk";
import Web3 from "./Web3";
import Dashboard from "./Dashboard";
import Toolkit from "./Toolkit";
import Community from "./Community";
import CryptoManagement from "./CryptoManagement";
import OwnerDashboard from "./OwnerDashboard";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar receives user info */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Features />} />
        <Route path="/Developer" element={<Developer />} />
        <Route path="/Metamask" element={<Metamask />} />
        <Route path="/Wallets" element={<Wallets />} />

        {/* Authentication */}
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Feature subpages */}
        <Route path="/Buy" element={<Buy />} />
        <Route path="/Earn" element={<Earn />} />
        <Route path="/Swaps" element={<Swaps />} />
        <Route path="/Snaps" element={<Snaps />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/Perps" element={<Perps />} />

        {/* Explore more */}
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/security" element={<Security />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/learn" element={<Learn />} />

        {/* About MetaMask */}
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/careers" element={<Careers />} />

        {/* Developer cards */}
        <Route path="/Sdk" element={<Sdk />} />
        <Route path="/Web3" element={<Web3 />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Toolkit" element={<Toolkit />} />

        {/* Community */}
        <Route path="/Community" element={<Community />} />
        <Route path="/crud" element={< CryptoManagement/>} />
        <Route path="/admin-dashboard" element={<OwnerDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;