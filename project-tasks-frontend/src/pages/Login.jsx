import { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/projects");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#e6f4ea" }} // soft green background
    >
      <div
        className="card shadow p-4"
        style={{
          width: "400px",
          borderRadius: "15px",
          border: "none",
          backgroundColor: "#ffffff", // white card
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ color: "#228B22", fontWeight: "700" }} // clear green header
        >
          Login
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#228B22" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="example@email.com"
              required
              style={{ borderRadius: "10px", border: "1px solid #ccc" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ color: "#228B22" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              required
              style={{ borderRadius: "10px", border: "1px solid #ccc" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="btn w-100"
            style={{
              backgroundColor: "#32CD32", // bright green button
              color: "white",
              borderRadius: "50px",
              padding: "10px",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
