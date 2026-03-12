import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "./store/store";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error: loginError, loading } = useSelector((state) => state.user);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ✅ Auto redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "owner") navigate("/admin-dashboard");
      else navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    dispatch(loginUserThunk(form))
      .unwrap()
      .catch(() => setError("Invalid login credentials ❌"));
  };

  const handleGoogleResponse = (response) => {
    try {
      const userInfo = jwtDecode(response.credential);
      dispatch(
        loginUserThunk({
          email: userInfo.email,
          password: "GOOGLE_AUTH",
        })
      ).unwrap();
    } catch {
      setError("Google Login Failed ❌");
    }
  };
      
  // ✅ Load Google Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "854548813769-nkc4rqanbq235pd99his3tv4n1t19pqp.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "medium" }
        );
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 🚀</h2>
        <p>Login to your Crypto Wallet</p>

        {(error || loginError) && <p className="error-msg">{error || loginError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group password-field">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div id="googleSignInDiv" style={{ marginTop: "15px" }}></div>

        <p className="register-text">
          New here?{" "}
          <span className="link-text" onClick={() => navigate("/register")}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
