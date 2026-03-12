import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCryptos,
  setSelectedCrypto,
} from "./store/store";
import { useNavigate } from "react-router-dom";
import "./Cryptocurrencies.css";

function Cryptocurrencies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get cryptos and loading state from Redux
  const { cryptos, loading, error } = useSelector((state) => state.crypto);

  // ✅ Fetch from backend once on mount
  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);

  // ✅ When user clicks a crypto
  const handleCryptoClick = (crypto) => {
    dispatch(setSelectedCrypto(crypto));
    navigate("/metamask");
  };

  if (loading) return <p className="loading-text">Loading cryptocurrencies...</p>;
  if (error) return <p className="error-text">⚠️ {error}</p>;

  return (
    <div className="crypto-page">
      <h1 className="page-title">Cryptocurrencies</h1>
      <p className="page-subtitle">
        Click a coin to view its live chart & performance.
      </p>

      <div className="crypto-table-wrapper">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price ($)</th>
              <th>Change</th>
              <th>Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr
                key={crypto.cryptoId}
                onClick={() =>
                  crypto.availableQuantity > 0 && handleCryptoClick(crypto)
                }
                style={{
                  cursor:
                    crypto.availableQuantity > 0 ? "pointer" : "not-allowed",
                  opacity: crypto.availableQuantity > 0 ? 1 : 0.5,
                }}
              >
                <td>{crypto.cryptoName}</td>
                <td>{crypto.cryptoSymbol}</td>
                <td>${crypto.cryptoPrice?.toLocaleString() || "-"}</td>
                <td
                  style={{
                    color:
                      crypto.priceChange > 0
                        ? "#10B981"
                        : crypto.priceChange < 0
                        ? "#EF4444"
                        : "#000",
                    fontWeight: "600",
                  }}
                >
                  {crypto.priceChange || 0}{" "}
                  {crypto.priceChangePercent
                    ? `(${crypto.priceChangePercent}%)`
                    : ""}
                </td>
                <td>{crypto.availableQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cryptocurrencies;
