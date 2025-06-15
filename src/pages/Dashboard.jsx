import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate(); // Hook to programmatically redirect users

  // Handles user logout
  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👋 Welcome to your Dashboard</h1>
        <p style={styles.text}>
          This page is protected and only visible when logged in.
        </p>

        {/* Sign out button */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          🔓 Sign out
        </button>
        <p className="mt-4">
          <a href="/profile" className="text-indigo-500 underline hover:text-blue-800">
            View My Profile →
          </a>
        </p>
      </div>
    </div>
  );
}

// Inline CSS styles for the dashboard layout
const styles = {
  container: {
    minHeight: "100vh",                // Full height
    backgroundColor: "#f5f7fa",        // Light background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",           // White card background
    padding: "2rem 3rem",
    borderRadius: "12px",              // Rounded corners
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Soft shadow
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "0.75rem",
  },
  text: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "2rem",
  },
  logoutButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0d6efd",        // Blue color for consistency
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};
