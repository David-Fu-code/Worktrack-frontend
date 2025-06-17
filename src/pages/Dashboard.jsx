import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/users/me")
      .then(res => setUser(res.data))
      .catch(() => navigate("/login"));

    api.get("/applications")
      .then(res => setApplications(res.data))
      .catch(err => console.error("Error loading applications", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const total = applications.length;

  if (!user) return <p className="text-center mt-20">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🧭 Top Navbar */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-indigo-700">WorkTrack</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition"
        >
          🔓 Logout
        </button>
      </header>

      {/* 🧠 Main Dashboard */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">
          👋 Welcome back, <span className="text-indigo-600">{user.displayName || user.email}</span>
        </h2>

        {/* 📊 Job Stats Card */}
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-lg font-medium text-gray-700">
            📊 You’ve applied to <span className="font-bold text-indigo-600">{total}</span> job{total === 1 ? "" : "s"} this month.
          </p>
        </div>

        {/* 💼 Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/applications/new")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-4 rounded-xl shadow flex items-center justify-center gap-2"
          >
            ➕ Add Job Application
          </button>

          <button
            onClick={() => navigate("/applications")}
            className="bg-white border border-gray-300 hover:border-indigo-400 text-gray-800 font-medium px-6 py-4 rounded-xl flex items-center justify-center gap-2"
          >
            📄 View All Applications
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-medium px-6 py-4 rounded-xl border border-indigo-200 flex items-center justify-center gap-2 col-span-1 sm:col-span-2"
          >
            👤 My Profile
          </button>
        </div>
      </main>
    </div>
  );
}
