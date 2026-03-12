import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "./api/api";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    age: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Dynamic API based on role
      const endpoint =
        form.role === "owner"
          ? "/api/owners/register"
          : "/api/user/register";

      const response = await api.post(endpoint, form);
      const userData = response.data;

      // ✅ Save to localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Navigate by role
      if (userData.role === "owner") navigate("/crud");
      else navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Your Account ✨</h2>
        <p className="register-subtitle">Join the decentralized future today.</p>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
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
                onChange={handleChange}
                required
              />
              <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Role Dropdown */}
          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <span className="link-text" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
