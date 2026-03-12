// ✅ src/Swaps.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "./api/api";
import {
  fetchCryptos,
  fetchOwners,
  fetchOwnerCryptos,
} from "./store/store";
import "./Swaps.css";
import ProviderScroller from "./ProviderScroller";
import Footer from "./Footer";

export default function Swaps() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const { cryptos, owners, ownerCryptos, loading } = useSelector(
    (state) => state.crypto
  );

  const [fromCryptoId, setFromCryptoId] = useState("");
  const [toCryptoId, setToCryptoId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCryptos());
    dispatch(fetchOwners());
  }, [dispatch]);

  // ✅ Fetch owner holdings dynamically
  useEffect(() => {
    if (ownerId) {
      dispatch(fetchOwnerCryptos(ownerId));
      setToCryptoId("");
    }
  }, [ownerId, dispatch]);

  const userCryptos = cryptos.filter(
    (c) => user?.cryptoHoldings?.[c.cryptoId] > 0
  );

  const handleSwap = async () => {
    if (!user) return setMessage("⚠️ Please login first!");
    if (!ownerId) return setMessage("⚠️ Select owner first!");
    if (!fromCryptoId || !toCryptoId)
      return setMessage("⚠️ Select both tokens!");
    if (!quantity || quantity <= 0)
      return setMessage("⚠️ Enter valid quantity!");

    if (fromCryptoId === toCryptoId)
      return setMessage("❌ Cannot swap same crypto!");

    const ownedQty = user.cryptoHoldings?.[Number(fromCryptoId)] || 0;
    if (ownedQty < quantity)
      return setMessage("❌ Insufficient holdings!");

    try {
      const res = await api.post(
        `/api/user/${user.userId}/swap/${ownerId}?fromCryptoId=${fromCryptoId}&toCryptoId=${toCryptoId}&quantity=${quantity}`
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage("✅ Swap successful!");

      dispatch(fetchCryptos());
      dispatch(fetchOwners());

      // ✅ Reset UI
      setFromCryptoId("");
      setToCryptoId("");
      setQuantity("");
      setOwnerId("");
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
  const msg =
    err.response?.data?.message ||
    err.response?.data ||
    err.message ||
    "❌ Swap failed!";
  setMessage(String(msg)); // ✅ Always string
}

  };

  const flipTokens = () => {
    setFromCryptoId(toCryptoId);
    setToCryptoId(fromCryptoId);
  };

  const fromCryptoPrice =
    cryptos.find((c) => c.cryptoId === Number(fromCryptoId))?.cryptoPrice || 0;
  const totalValue =
    quantity && fromCryptoPrice ? (fromCryptoPrice * quantity).toFixed(2) : 0;

  if (loading) return <p>Loading cryptos...</p>;

  return (
    <>
      <div className="swaps-page">
        <div className="swaps-info">
          <h1 className="swaps-title">
            Swap <span>Crypto</span>
          </h1>

          {user && (
            <div className="wallet-balance-card">
              <h3>Wallet Balance</h3>
              <p>₹{user.walletBalance?.toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="swap-card">
          <h2>Token Swap</h2>

          {/* ✅ Owner Dropdown */}
          <div className="form-group">
            <label>Select Owner:</label>
            <select
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
            >
              <option value="">-- Select Owner --</option>
              {owners
                ?.filter((o) => o.ownerId !== user?.userId)
                .map((o) => (
                  <option key={o.ownerId} value={o.ownerId}>
                    {o.ownerName} (ID: {o.ownerId})
                  </option>
                ))}
            </select>
          </div>

          {/* ✅ FROM Token */}
          <div className="form-group">
            <label>From Token (You own):</label>
            <select
              value={fromCryptoId}
              onChange={(e) => setFromCryptoId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {userCryptos.map((c) => (
                <option key={c.cryptoId} value={c.cryptoId}>
                  {c.cryptoName} — You: {user.cryptoHoldings[c.cryptoId]}
                </option>
              ))}
            </select>
          </div>

          <button className="flip-btn" onClick={flipTokens}>⇅</button>

          {/* ✅ TO Token */}
          <div className="form-group">
            <label>To Token (Owner has):</label>
            <select
              value={toCryptoId}
              onChange={(e) => setToCryptoId(e.target.value)}
              disabled={!ownerId}
            >
              <option value="">-- Select --</option>
              {ownerCryptos
                ?.filter((c) => c.cryptoId !== Number(fromCryptoId)) // ✅ cannot pick same token
                .map((c) => (
                  <option key={c.cryptoId} value={c.cryptoId}>
                    {c.cryptoName} — Owner Qty: {c.availableQuantity}
                  </option>
                ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <p className="total-value">Total Value: ₹{totalValue}</p>

          <button className="swap-btn" onClick={handleSwap}>Swap Tokens</button>

          {typeof message === "string" && message.length > 0 && (
            <p className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
            {message}
            </p>
          )}
          
        </div>
      </div>

      <ProviderScroller />
      <Footer />
    </>
  );
}
