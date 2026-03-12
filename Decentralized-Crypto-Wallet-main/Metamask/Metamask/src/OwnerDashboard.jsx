// src/pages/OwnerDashboard.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchOwnerCryptos,
  setEditCrypto,
  deleteOwnerCrypto,
} from "./store/store"; // ✅ Correct Path
import "./OwnerDashboard.css";

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const { ownerCryptos, loading } = useSelector((state) => state.crypto);

  useEffect(() => {
    if (user?.ownerId) {
      dispatch(fetchOwnerCryptos(user.ownerId));
    }
  }, [dispatch, user?.ownerId]);

  const handleDelete = (crypto) => {
    if (window.confirm(`DELETE ${crypto.cryptoName}?`)) {
      dispatch(deleteOwnerCrypto({ ownerId: user.ownerId, cryptoId: crypto.cryptoId }))
        .unwrap()
        .then(() => dispatch(fetchOwnerCryptos(user.ownerId))); // ✅ Refresh
    }
  };

  return (
    <div className="owner-dashboard">
      <h1 className="owner-title">Owner Dashboard</h1>

      <div className="owner-info-box">
        <h3>👋 Welcome, {user?.ownerName}</h3>
        <p>Email: {user?.email}</p>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/crud")} className="add-crypto-btn">
          ➕ Add Crypto
        </button>
      </div>

      {loading ? (
        <p className="loading-msg">Fetching assets...</p>
      ) : (
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price ($)</th>
              <th>24h Change</th>
              <th>Quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {ownerCryptos?.length > 0 ? (
              ownerCryptos.map((crypto) => (
                <tr key={crypto.cryptoId}>
                  <td>{crypto.cryptoName}</td>
                  <td>{crypto.cryptoSymbol}</td>
                  <td>${crypto.cryptoPrice?.toLocaleString()}</td>

                  <td style={{ color: crypto.priceChange > 0 ? "#16db65" : "#ff4d4d" }}>
                    {crypto.priceChange} ({crypto.priceChangePercent}%)
                  </td>

                  <td>{crypto.availableQuantity}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        dispatch(setEditCrypto(crypto));
                        navigate("/crud");
                      }}
                    >
                      ✏️
                    </button>
                  </td>

                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(crypto)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-msg">No Assets Found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
