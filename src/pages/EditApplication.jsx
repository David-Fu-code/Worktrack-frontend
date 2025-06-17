// Import hooks and tools
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

// Component to edit a specific job application
export default function EditApplication() {
  const { id } = useParams();           // Get the dynamic route param /applications/:id
  const navigate = useNavigate();       // Used for redirecting after save

  // Initial form state (empty)
  const [form, setForm] = useState({
    position: "",
    companyName: "",
    status: "APPLIED",
    appliedDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true); // Show spinner while loading

  // 🔁 Load the existing application details
  useEffect(() => {
    api.get(`/applications`) // You could replace this later with a /applications/:id endpoint
      .then((res) => {
        // Find the application by ID
        const app = res.data.find((a) => a.id === Number(id));
        if (!app) throw new Error("Application not found");

        // Pre-fill the form with the application values
        setForm({
          position: app.position,
          companyName: app.companyName || "",
          status: app.status,
          appliedDate: app.appliedDate,
          notes: app.notes || "",
        });
      })
      .catch(() => alert("❌ Failed to load application"))
      .finally(() => setLoading(false));
  }, [id]);

  // Update form state when user types/selects something
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔁 Submit updated form to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/applications/${id}`, form); // PUT request to update
      alert("✅ Application updated!");
      navigate("/applications"); // Redirect back to app list
    } catch (err) {
      alert("❌ Failed to update application");
    }
  };

  // Show loading while data is being fetched
  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">✏️ Edit Job Application</h1>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl border shadow-sm"
      >
        {/* Position */}
        <input
          name="position"
          placeholder="Job Title / Position"
          value={form.position}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />

        {/* Company Name */}
        <input
          name="companyName"
          placeholder="Company Name"
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
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {/* Applied Date */}
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
        />

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          rows={4}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
