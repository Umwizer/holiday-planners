import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function AdminRegister() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess("Registered successfully! Redirecting…");
      setTimeout(() => navigate("/admin/login"), 1500);
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
        Admin Register
      </h1>
      <p style={{ color: "#888", marginBottom: "2rem" }}>Create an admin account</p>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={userName}
          onChange={e => setUserName(e.target.value)} required
          style={{ width: "100%", padding: "0.9rem 1rem", marginBottom: "1rem",
            border: "1px solid #ddd", outline: "none", fontSize: "0.95rem" }} />
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
          style={{ width: "100%", padding: "0.9rem 1rem", marginBottom: "1rem",
            border: "1px solid #ddd", outline: "none", fontSize: "0.95rem" }} />
        <input type="password" placeholder="Password (min 8 chars)" value={password}
          onChange={e => setPassword(e.target.value)} required
          style={{ width: "100%", padding: "0.9rem 1rem", marginBottom: "1.5rem",
            border: "1px solid #ddd", outline: "none", fontSize: "0.95rem" }} />
        <button className="btn-gold" type="submit" style={{
          width: "100%", padding: "1rem", fontWeight: 700,
          letterSpacing: "1px", fontSize: "0.9rem"
        }}>
          REGISTER
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "#666" }}>
        Already have an account? <Link to="/admin/login" style={{ color: "#c19a5b" }}>Login</Link>
      </p>
    </section>
  );
}