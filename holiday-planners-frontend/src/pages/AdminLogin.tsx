import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function AdminLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", userName);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section style={{
      maxWidth: "420px", margin: "5rem auto", padding: "2.5rem",
      background: "#fff", boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
    }}>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", marginBottom: "0.5rem" }}>
        Admin Login
      </h1>
      <p style={{ color: "#888", marginBottom: "2rem" }}>Sign in to manage the platform</p>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          required
          style={{
            width: "100%", padding: "0.9rem 1rem", marginBottom: "1rem",
            border: "1px solid #ddd", outline: "none", fontSize: "0.95rem"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: "100%", padding: "0.9rem 1rem", marginBottom: "1.5rem",
            border: "1px solid #ddd", outline: "none", fontSize: "0.95rem"
          }}
        />
        <button className="btn-gold" type="submit" style={{
          width: "100%", padding: "1rem", fontWeight: 700,
          letterSpacing: "1px", fontSize: "0.9rem"
        }}>
          LOGIN
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "#666" }}>
        No account? <Link to="/admin/register" style={{ color: "#c19a5b" }}>Register</Link>
      </p>
    </section>
  );
}