// Import hooks and API instance
import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

// Profile component to show current logged-in user info
export default function Profile() {
  // Local state to store user data, loading and error state
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch current user info when component loads
  useEffect(() => {
    api.get("/users/me")
      .then(res => {
        setUser(res.data);       // Save user data
        setLoading(false);       // Stop loading spinner
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  // Handle loading or error UI
  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile…</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // Render user profile card
return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-8 space-y-6">
      {/* Card title */}
      <h2 className="text-2xl font-bold text-center text-indigo-600">Your Profile</h2>

      {/* Render each user field */}
      <ProfileRow label="Email" value={user.email} />
      <ProfileRow label="Display Name" value={user.displayName} />
      <ProfileRow label="Role" value={user.role.toUpperCase()} highlight />
    </div>

    {/* 👇 Back button, centered below card */}
    <button
      onClick={() => navigate("/dashboard")}
      className="mt-4 text-indigo-600 hover:underline font-medium"
    >
      ← Back to Dashboard
    </button>
  </div>
);
}

// Reusable row component to show label/value pair
function ProfileRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
      {/* Field label (left side) */}
      <span className="text-gray-500 font-medium">{label}</span>

      {/* Field value (right side) */}
      <span className={`font-semibold ${highlight ? "text-indigo-500" : "text-gray-800"}`}>
        {value}
      </span>
    </div>
  );
}
