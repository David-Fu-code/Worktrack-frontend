import { useState } from "react";
import { api } from "../api"; // Pre-configured Axios instance
import { Link } from "react-router-dom";

export default function Register() {
  // Form state: name, email, password
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: ""
  });

  // Loading state to disable the button while submitting
  const [loading, setLoading] = useState(false);

  // Updates form state on input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload

    try {
      setLoading(true); // Disable the form while processing

      // Send registration request to backend
      await api.post("/auth/register", form);

      // Show success alert
      alert("✅ Registered! Check your email to confirm.");
    } catch (err) {
      // Show error if something went wrong
      alert(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false); // Re-enable the form
    }
  };

  // UI rendering
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.headerContainer}>
          <Link to="/" style={styles.arrow}>←</Link>
          <h2 style={styles.title}>Create Account</h2>
        </div>

        <input
          name="displayName"
          placeholder="Name"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating…" : "Register"}
        </button>

        <p style={styles.fallbackText}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>Login</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #f0f4f8, #d9e2ec)", // subtle gradient
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#222",
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
    backgroundColor: "#2563eb", // upgraded blue (Tailwind's blue-600)
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  fallbackText: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#555",
  },
  link: {
    color: "#2563eb",
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
