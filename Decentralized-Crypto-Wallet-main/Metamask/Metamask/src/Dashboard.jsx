import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { addMoney, withdrawMoney } from "./store/store"; 
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const { cryptos } = useSelector((state) => state.crypto);
  const walletBalance = user?.walletBalance ?? 0;
  const cryptoHoldings = user?.cryptoHoldings ?? {};

  const [actionType, setActionType] = useState("add");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [message, setMessage] = useState("");

  const holdingsWithNames = Object.entries(cryptoHoldings).map(
    ([cryptoId, qty]) => {
      const crypto = cryptos?.find((c) => c.cryptoId === Number(cryptoId));
      return { name: crypto?.cryptoName || cryptoId, qty };
    }
  );

  const handleAdd = async () => {
    if (!amount || Number(amount) <= 0) return;

    try {
      await dispatch(
        addMoney({
          userId: user.userId,
          amount: Number(amount),
          upiId: "9392695627@ibl"
        })
      ).unwrap();

      setMessage(`✅ ₹${amount} added to wallet!`);
      setAmount("");
      setPaymentMethod("");
    } catch (err) {
      setMessage("❌ Failed to add money!");
    }
  };

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0)
      return setMessage("❌ Enter valid amount");

    if (Number(amount) > walletBalance)
      return setMessage("❌ Insufficient balance!");

    try {
      await dispatch(
        withdrawMoney({
          userId: user.userId,
          amount: Number(amount),
        })
      ).unwrap();

      setMessage(`✅ ₹${amount} withdrawn!`);
      setAmount("");
    } catch (err) {
      setMessage("❌ Withdrawal failed!");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* LEFT SIDE */}
        <div className="dashboard-left">
          <h1>Welcome, {user?.userName} 👋</h1>

          <div className="dashboard-actions">
            <button className="dash-btn buy" onClick={() => navigate("/buy")}>
              Buy / Sell
            </button>
            <button className="dash-btn swap" onClick={() => navigate("/swaps")}>
              Swaps
            </button>
          </div>

          <div className="crypto-card">
            <h3>Your Holdings</h3>

            {holdingsWithNames.length > 0 ? (
              holdingsWithNames.map(({ name, qty }) => (
                <p key={name}>
                  {name}: <strong>{qty}</strong>
                </p>
              ))
            ) : (
              <p>No cryptos owned yet</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="dashboard-right">
          <div className="crypto-card wallet-card">
            <h3>Wallet Balance</h3>
            <p className="wallet-balance">₹{walletBalance.toFixed(2)}</p>

            <div className="dashboard-actions" style={{ marginBottom: "15px" }}>
              <button
                className={`dash-btn ${actionType === "add" ? "buy" : "swap"}`}
                onClick={() => { setActionType("add"); setMessage(""); }}
              >
                Add
              </button>
              <button
                className={`dash-btn ${actionType === "withdraw" ? "buy" : "swap"}`}
                onClick={() => { setActionType("withdraw"); setMessage(""); }}
              >
                Withdraw
              </button>
            </div>

            {/* WALLET INPUT UI */}
            <div className="wallet-add-container">
              <input
                type="number"
                min="0"
                placeholder={`Enter amount to ${actionType}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {/* ✅ ADD MONEY BLOCK */}
              {actionType === "add" && amount && (
                <div className="payment-methods-container">

                  {/* Select Payment Method */}
                  <div className="payment-methods">
                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                      /> UPI
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="payment"
                        value="qr"
                        checked={paymentMethod === "qr"}
                        onChange={() => setPaymentMethod("qr")}
                      /> QR Code
                    </label>
                  </div>

                  {/* ✅ UPI PAYMENT */}
                  {paymentMethod === "upi" && (
                    <p className="upi-id">
                      Pay to: <strong>9392695627@ibl</strong>
                    </p>
                  )}

                  {/* ✅ QR CODE PAYMENT */}
                  {paymentMethod === "qr" && (
                    <div className="qr-container">
                      <QRCodeCanvas
                        value={`upi://pay?pa=9392695627@ibl&pn=User&tn=AddMoney&am=${amount}`}
                        size={160}
                      />
                      <p>Scan & Pay</p>
                    </div>
                  )}

                  {paymentMethod && (
                    <button className="pay-btn" onClick={handleAdd}>
                      Confirm Payment
                    </button>
                  )}
                </div>
              )}

              {/* ✅ WITHDRAW BLOCK */}
              {actionType === "withdraw" && (
                <button className="pay-btn" onClick={handleWithdraw}>
                  Withdraw
                </button>
              )}
            </div>

            {/* ✅ MESSAGE */}
            {message && (
              <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
                {message}
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
