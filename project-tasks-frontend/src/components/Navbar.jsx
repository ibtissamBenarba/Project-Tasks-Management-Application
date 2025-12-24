import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#90ee90", // soft green
        padding: "0.8rem 1.5rem",
        borderRadius: "0 0 15px 15px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <span
          className="navbar-brand"
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: "1.5rem",
            cursor: "pointer"
          }}
          onClick={() => navigate("/projects")}
        >
          Project Task Manager
        </span>

        <button
          onClick={logout}
          style={{
            backgroundColor: "white",
            color: "#228B22", // darker green text
            fontWeight: "600",
            padding: "0.4rem 1rem",
            borderRadius: "50px",
            border: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: "0.2s"
          }}
          onMouseEnter={e => e.target.style.backgroundColor = "#e0ffe0"}
          onMouseLeave={e => e.target.style.backgroundColor = "white"}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
