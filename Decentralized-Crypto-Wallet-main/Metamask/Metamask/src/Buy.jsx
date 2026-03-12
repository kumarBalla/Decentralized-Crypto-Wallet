// src/Buy.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCryptos,
  fetchOwners,
  fetchOwnerCryptos,
  buyCrypto,
  sellCrypto,
  setSelectedCrypto,
} from "./store/store";
import "./Buy.css";
import ProviderScroller from "./ProviderScroller";
import Footer from "./Footer";

export default function Buy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { cryptos, ownerCryptos, owners, loading } = useSelector(
    (state) => state.crypto
  );

  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [selectedCrypto, setSelectedCryptoState] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("buy");
  const [message, setMessage] = useState("");

  const walletBalance = user?.walletBalance || 0;
  const holdings = user?.cryptoHoldings || {};

  // Load data initially
  useEffect(() => {
    dispatch(fetchOwners());
    dispatch(fetchCryptos());
    return () => dispatch(setSelectedCrypto(null));
  }, [dispatch]);

  // Fetch cryptos of selected owner
  useEffect(() => {
    if (selectedOwnerId) {
      dispatch(fetchOwnerCryptos(selectedOwnerId));
    }
    setSelectedCryptoState(null);
  }, [dispatch, selectedOwnerId]);

  const ownerOptions = owners || [];
  const buyList = ownerCryptos || [];
  const sellList = cryptos.filter((c) => (holdings[c.cryptoId] || 0) > 0);

  const availableList = action === "buy" ? buyList : sellList;

  const handleCryptoSelect = (cryptoId) => {
    const crypto = availableList.find((c) => c.cryptoId === Number(cryptoId));
    setSelectedCryptoState(crypto || null);
  };

  const handleTransaction = async () => {
    if (!user) return navigate("/login");
    if (!selectedOwnerId) return setMessage("⚠️ Please select an owner.");
    if (!selectedCrypto) return setMessage("⚠️ Select a crypto.");
    const qty = Number(quantity);
    if (qty <= 0) return setMessage("⚠️ Invalid quantity.");

    try {
      if (action === "buy") {
        const cost = qty * selectedCrypto.cryptoPrice;
        if (cost > walletBalance)
          return setMessage("❌ Not enough balance.");

        await dispatch(
          buyCrypto({
            userId: user.userId,
            ownerId: selectedOwnerId,
            cryptoId: selectedCrypto.cryptoId,
            quantity: qty,
          })
        ).unwrap();
        setMessage(`✅ Bought ${qty} ${selectedCrypto.cryptoName}`);
      } else {
        const ownedQty = holdings[selectedCrypto.cryptoId];
        if (qty > ownedQty)
          return setMessage("❌ Not enough holdings.");

        await dispatch(
          sellCrypto({
            userId: user.userId,
            ownerId: selectedOwnerId,
            cryptoId: selectedCrypto.cryptoId,
            quantity: qty,
          })
        ).unwrap();
        setMessage(`✅ Sold ${qty} ${selectedCrypto.cryptoName}`);
      }

      // Refresh UI + reset
      setQuantity("");
      setSelectedCryptoState(null);
      setSelectedOwnerId("");
      dispatch(fetchCryptos());
      dispatch(fetchOwners());
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Transaction failed");
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <>
      <div className="buy-main">
        <div className="buy-info">
          <h1 className="buy-title">
            Buy & <span>Sell Crypto</span>
          </h1>
          <p className="buy-desc">
            Choose owner first — then select the crypto to trade.
          </p>

          {user && (
            <div className="wallet-summary">
              <h3>Wallet Balance</h3>
              <p>₹{walletBalance.toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="transaction-card-modern">
          {/* Toggle Buy/Sell */}
          <div className="action-toggle-modern">
            <button
              className={action === "buy" ? "active" : ""}
              onClick={() => {
                setAction("buy");
                setSelectedOwnerId("");
                setSelectedCryptoState(null);
                setMessage("");
              }}
            >
              Buy
            </button>

            <button
              className={action === "sell" ? "active" : ""}
              onClick={() => {
                setAction("sell");
                setSelectedOwnerId("");
                setSelectedCryptoState(null);
                setMessage("");
              }}
            >
              Sell
            </button>
          </div>

          {/* Form */}
          <div className="form-modern">
            {/* Owner */}
            <label>{action === "buy" ? "Buy From Owner" : "Sell To Owner"}</label>
            <select
              value={selectedOwnerId}
              onChange={(e) => setSelectedOwnerId(e.target.value)}
            >
              <option value="">-- Select Owner --</option>
              {ownerOptions.map((o) => (
                <option key={o.ownerId} value={o.ownerId}>
                  {o.ownerName}
                </option>
              ))}
            </select>

            {/* Crypto */}
            <label>Crypto:</label>
            <select
              value={selectedCrypto?.cryptoId || ""}
              onChange={(e) => handleCryptoSelect(e.target.value)}
            >
              <option value="">-- Select Crypto --</option>
              {availableList.map((c) => (
                <option key={c.cryptoId} value={c.cryptoId}>
                  {c.cryptoName} — ₹{c.cryptoPrice}
                  {action === "sell" && ` — You: ${holdings[c.cryptoId]}`}
                </option>
              ))}
            </select>

            {/* Quantity */}
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            {/* Submit Button */}
            <button className="transaction-btn-modern" onClick={handleTransaction}>
              {action === "buy" ? "Buy Now ✅" : "Sell Now 🔁"}
            </button>

            {message && (
              <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      <ProviderScroller />

      <div className="footer-page">
        <Footer />
      </div>
    </>
  );
}
