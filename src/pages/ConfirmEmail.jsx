import { useEffect, useState } from "react";
import { api } from "../api"; // Axios instance pre-configured
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  // Status states: 'confirming', 'success', 'error', 'invalid'
  const [status, setStatus] = useState("confirming");
  const navigate = useNavigate();

  // Runs on component mount
  useEffect(() => {
    // Extract token from URL query parameter
    const token = new URLSearchParams(window.location.search).get("token");

    // If no token is present in the URL
    if (!token) {
      setStatus("invalid");
      return;
    }

    // Send GET request to confirm email
    api.get(`/auth/confirm?token=${token}`)
      .then(() => {
        setStatus("success");
        // After 3 seconds, redirect to login
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(err => {
        // If token is invalid or expired, show error
        setStatus("error");
        console.error("❌ Email confirmation failed:", err.response?.data || err.message);
      });
  }, []);

  // UI content based on status
  return (
    <div className="text-center mt-20 text-xl font-medium">
      {status === "confirming" && <p>Confirming your email...</p>}
      {status === "success" && <p className="text-green-600">✅ Email confirmed! Redirecting to Login</p>}
      {status === "error" && <p className="text-red-600">❌ Invalid or expired confirmation token</p>}
      {status === "invalid" && <p className="text-red-600">⚠️ No token found in URL</p>}
    </div>
  );
}
