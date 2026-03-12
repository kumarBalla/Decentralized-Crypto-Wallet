// src/pages/CryptoManagement.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addOwnerCrypto,
  updateOwnerCrypto,
  clearEditCrypto,
  fetchOwnerCryptos,
} from "./store/store";
import { useNavigate } from "react-router-dom";
import "./CryptoManagement.css";

export default function CryptoManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const editCrypto = useSelector((state) => state.crypto.editCrypto);

  const [crypto, setCrypto] = useState({
    cryptoName: "",
    cryptoSymbol: "",
    cryptoPrice: "",
    availableQuantity: "",
    priceChange: 0,
    priceChangePercent: 0,
  });

  // ✅ Set data in fields when editing existing crypto
  useEffect(() => {
    if (editCrypto) {
      setCrypto({
        cryptoId: editCrypto.cryptoId,
        cryptoName: editCrypto.cryptoName,
        cryptoSymbol: editCrypto.cryptoSymbol,
        cryptoPrice: editCrypto.cryptoPrice,
        availableQuantity: editCrypto.availableQuantity,
        priceChange: editCrypto.priceChange,
        priceChangePercent: editCrypto.priceChangePercent,
      });
    }
  }, [editCrypto]);

  // ✅ Auto calculate priceChangePercent
  useEffect(() => {
    if (crypto.cryptoPrice !== "" && crypto.priceChange !== "") {
      const percent =
        (Number(crypto.priceChange) / Number(crypto.cryptoPrice)) * 100;

      setCrypto((prev) => ({
        ...prev,
        priceChangePercent: percent.toFixed(2),
      }));
    }
  }, [crypto.cryptoPrice, crypto.priceChange]);

  // ✅ Add / Update Crypto submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...crypto };

    if (editCrypto) {
      dispatch(
        updateOwnerCrypto({
          ownerId: user.ownerId,
          cryptoId: crypto.cryptoId,
          cryptoData: payload,
        })
      )
        .unwrap()
        .then(() => dispatch(fetchOwnerCryptos(user.ownerId)));

      dispatch(clearEditCrypto());
    } else {
      dispatch(addOwnerCrypto({ ownerId: user.ownerId, cryptoData: payload }))
        .unwrap()
        .then(() => dispatch(fetchOwnerCryptos(user.ownerId)));
    }

    navigate("/admin-dashboard");
  };

  const handleCancel = () => {
    dispatch(clearEditCrypto());
    navigate("/admin-dashboard");
  };

  return (
    <div className="crypto-management">
      <h1>{editCrypto ? "Update Crypto" : "Add Crypto"}</h1>

      <form onSubmit={handleSubmit} className="crypto-form">
        <div className="form-row">
          <label>Crypto Name</label>
          <input
            type="text"
            value={crypto.cryptoName}
            onChange={(e) =>
              setCrypto({ ...crypto, cryptoName: e.target.value })
            }
            required
          />
        </div>

        <div className="form-row">
          <label>Symbol</label>
          <input
            type="text"
            value={crypto.cryptoSymbol}
            onChange={(e) =>
              setCrypto({ ...crypto, cryptoSymbol: e.target.value })
            }
            required
          />
        </div>

        <div className="form-row">
          <label>Price ($)</label>
          <input
            type="number"
            value={crypto.cryptoPrice}
            onChange={(e) =>
              setCrypto({ ...crypto, cryptoPrice: e.target.value })
            }
            required
          />
        </div>

        <div className="form-row">
          <label>Price Change ($)</label>
          <input
            type="number"
            value={crypto.priceChange}
            onChange={(e) =>
              setCrypto({
                ...crypto,
                priceChange: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="form-row">
          <label>Change %</label>
          <input
            type="number"
            value={crypto.priceChangePercent}
            disabled
          />
        </div>

        <div className="form-row">
          <label>Quantity</label>
          <input
            type="number"
            value={crypto.availableQuantity}
            onChange={(e) =>
              setCrypto({
                ...crypto,
                availableQuantity: Number(e.target.value),
              })
            }
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            {editCrypto ? "Update" : "Add"}
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
