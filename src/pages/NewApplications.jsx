import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function NewApplication() {
  // 🎯 Form state to track input values
  const [form, setForm] = useState({
    position: "",                      // Job title
    companyName: "",                   // Company name
    status: "APPLIED",                 // Application status
    appliedDate: new Date().toISOString().slice(0, 10), // Default to today's date (YYYY-MM-DD)
  });

  const [loading, setLoading] = useState(false); // Tracks submission state
  const navigate = useNavigate();                // For redirecting after success


  // 📝 Update form state when user types/selects
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();       // Prevent default page refresh
    setLoading(true);         // Show loading state

    try {
      await api.post("/applications", form); // Send form to backend
      alert("✅ Application added!");
      navigate("/applications");            // Redirect back to app list
    } catch (err) {
      alert("❌ Failed to add application");
      console.error(err);
    } finally {
      setLoading(false);      // Reset loading state
    }
  };

  return (
    // JSX UI — Form for adding a new job application
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">➕ Add Job Application</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
        {/* Input fields for job application details */}
        <input
          name="position"
          placeholder="Job Title / Position"
          value={form.position}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />
        {/* Company Field */}
        <input
          name="companyName"
          placeholder="Company"
          value={form.companyName}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />

        {/* Status Dropdown */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        >
          <option value="APPLIED">📨 Applied</option>
          <option value="INTERVIEW">🎤 Interview</option>
          <option value="OFFER">💼 Offer</option>
          <option value="REJECTED">❌ Rejected</option>
        </select>

        {/* Date Input for when application was submitted */}
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Application"}
        </button>
      </form>
    </div>
  );
}
