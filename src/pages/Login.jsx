import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  // Local state to store form input and status message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handles the login process when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form reload

    try {
      // Send login request to backend
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      // Store tokens in localStorage to persist session
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Show success message and redirect to dashboard
      setMessage("✅ Login successful!");
      navigate("/dashboard"); // 
    } catch (err) {
      console.error(err); 
      // Display error message if login fails
      setMessage("❌ " + (err.response?.data || err.message));
    }
  };

  // UI rendering
  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
      <div style={styles.headerContainer}>
        <Link to="/" style={styles.arrow}>←</Link>
        <h2 style={styles.title}>🔐 Login</h2>
      </div>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>

        {message && <div style={styles.message}>{message}</div>}
        <p style={styles.fallbackText}>
        Don’t have an account?{" "}
        <a href="/register" style={styles.link}>Register here</a>
        </p>
      </form>
    </div>
  );
}
// Inline styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#333",
  },
  label: {
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  input: {
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#0d6efd",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  message: {
    marginTop: "1rem",
    fontWeight: "500",
    color: "#d9534f", // red for error or override with green on success
    textAlign: "center",
  },
  fallbackText: {
  marginTop: "1rem",
  textAlign: "center",
  fontSize: "0.9rem",
  color: "#555",
},
  link: {
  color: "#0d6efd",
  fontWeight: "500",
  textDecoration: "none",
},
headerContainer: {
  position: "relative",
  textAlign: "center",
  marginBottom: "1.5rem",
},

arrow: {
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "2rem",
  color: "#0d6efd",
  textDecoration: "none",
  fontWeight: "bold",
},

title: {
  margin: 0,
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
},
};
