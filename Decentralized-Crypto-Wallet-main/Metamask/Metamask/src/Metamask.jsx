import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TokenGraph from "./TokenGraph";
import Footer from "./Footer";
import {
  setSelectedCrypto,
  fetchCryptos
} from "./store/store"; // ✅ FIXED IMPORT - removed setCryptos

import {
  SiBitcoin,
  SiEthereum,
  SiSolana,
  SiCardano,
  SiBinance,
  SiDogecoin,
  SiRipple,
  SiPolygon,
} from "react-icons/si";

import "./Metamask.css";

function Metamask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cryptos, selectedCrypto, loading } = useSelector(
    (state) => state.crypto
  );

  const coinIcons = {
    Bitcoin: <SiBitcoin color="#7e684dff" size={35} />,
    Ethereum: <SiEthereum color="#627EEA" size={35} />,
    Solana: <SiSolana color="#14F195" size={35} />,
    Cardano: <SiCardano color="#0033AD" size={35} />,
    "Binance Coin": <SiBinance color="#F3BA2F" size={35} />,
    Dogecoin: <SiDogecoin color="#C2A633" size={35} />,
    Ripple: <SiRipple color="#346AA9" size={35} />,
    Polygon: <SiPolygon color="#8247E5" size={35} />,
  };

  const popularCoinsList = [
    "Bitcoin",
    "Ethereum",
    "Solana",
    "Cardano",
    "Binance Coin",
    "Dogecoin",
    "Ripple",
    "Polygon",
  ];

  /* ✅ Load cryptos on page mount */
  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  /* ✅ Set default crypto */
  useEffect(() => {
    if (!selectedCrypto && cryptos.length > 0) {
      const saved = JSON.parse(localStorage.getItem("selectedCrypto"));
      if (saved) {
        dispatch(setSelectedCrypto(saved));
      } else {
        dispatch(setSelectedCrypto(cryptos[0])); // Default to first crypto
      }
    }
  }, [cryptos, selectedCrypto, dispatch]);

  const handleCryptoClick = (crypto) => {
    if (!crypto?.availableQuantity) return;
    dispatch(setSelectedCrypto(crypto));
    localStorage.setItem("selectedCrypto", JSON.stringify(crypto)); // ✅ persist
  };

  if (loading) return <p className="loading-text">Loading cryptocurrencies...</p>;

  return (
    <div className="metamask-page" style={{ paddingRight: "1px" }}>
      {/* ✅ Header */}
      <div className="metamask-header">
        <div className="image">
          <h1>
            {selectedCrypto
              ? `${selectedCrypto.cryptoName} (${selectedCrypto.cryptoSymbol})`
              : "Cryptocurrency"}
          </h1>
          <img src="/doller1.png" alt="Dollar" />
        </div>

        <p>Your money. Your wallet. Seamlessly everywhere.</p>

        <div className="metamask-buttons">
          <button className="buy-btn" onClick={() => navigate("/buy")}>
            BUY {selectedCrypto?.cryptoSymbol || ""}
          </button>
          <button className="swap-btn1" onClick={() => navigate("/Swaps")}>
            SWAP TO {selectedCrypto?.cryptoSymbol || ""}
          </button>
        </div>
      </div>

      {/* ✅ Token Info */}
      <div className="metamask-token">
        <div className="token-info">
          <div className="token-icon">
            {coinIcons[selectedCrypto?.cryptoName] || "💰"}
          </div>
          <span className="token-name">
            {selectedCrypto?.cryptoSymbol || ""}
          </span>
        </div>

        <div className="token-address">
          <span>0xacA9...2435DA</span>
          <button className="copy-btn">Copy</button>
        </div>
      </div>

      {/* ✅ Graph */}
      <div className="metamask-graph">
        {selectedCrypto && <TokenGraph key={selectedCrypto?.cryptoId} />}
      </div>

      {/* ✅ Popular Cryptos */}
      <div className="popular-crypto-section">
        <h2>Popular Cryptocurrencies</h2>

        <div className="crypto-list">
          {popularCoinsList.map((coinName, i) => {
            const cryptoData = cryptos.find((c) => c.cryptoName === coinName);
            const isAvailable = cryptoData?.availableQuantity > 0;

            return (
              <div
                key={i}
                className={`crypto-card1 ${
                  selectedCrypto?.cryptoName === coinName ? "active" : ""
                }`}
                style={{ cursor: isAvailable ? "pointer" : "not-allowed" }}
                onClick={() => handleCryptoClick(cryptoData)}
              >
                <div className="crypto-left">
                  <div className="crypto-icon">{coinIcons[coinName]}</div>
                  <div className="crypto-info">
                    <h3>{coinName}</h3>
                    <p>{cryptoData?.cryptoSymbol || ""}</p>
                  </div>
                </div>

                <div className="crypto-right">
                  <h4>
                    {isAvailable
                      ? `$${cryptoData.cryptoPrice.toLocaleString()}`
                      : "Out of Stock"}
                  </h4>

                  {isAvailable && (
                    <span
                      style={{
                        color:
                          cryptoData.priceChange >= 0 ? "#10B981" : "#EF4444",
                      }}
                    >
                      {cryptoData.priceChange >= 0
                        ? `+${cryptoData.priceChange}`
                        : cryptoData.priceChange}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Footer */}
      <div className="footer-page1">
        <Footer />
      </div>
    </div>
  );
}

export default Metamask;
