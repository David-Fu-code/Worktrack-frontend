import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

// Component to display all job applications
export default function Applications() {
  const [apps, setApps] = useState([]);       // Stores the list of job applications
  const [loading, setLoading] = useState(true); // Tracks loading state
  const navigate = useNavigate();             // Used to redirect the user

  // Load applications from the API when component mounts
  useEffect(() => {
    api.get("/applications")
      .then(res => {
        console.log("✅ API response:", res.data); // Debug: log API response
        setApps(res.data);                        // Store applications in state
      })
      .catch(err => {
        console.error("❌ Error loading applications", err);
        navigate("/login"); // Redirect to login if request fails (auth issue)
      })
      .finally(() => setLoading(false)); // Stop showing loading spinner
  }, []);

  // If data is still loading, show a loading message
  if (loading) return <p className="text-center mt-10">Loading applications...</p>;

  // Handle status dropdown change (PATCH request)
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/applications/${id}`, { status: newStatus }); // Update backend
      setApps((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app // Update frontend state
        )
      );
    } catch (err) {
      alert("❌ Failed to update status");
      console.error(err);
    }
  };

  // Handle deletion of an application (DELETE request)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      await api.delete(`/applications/${id}`); // Delete from backend
      setApps((prev) => prev.filter((app) => app.id !== id)); // Remove from UI
    } catch (err) {
      alert("❌ Failed to delete application");
      console.error(err);
    }
  };

  // Render the component
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📄 Your Applications</h1>

      {apps.length === 0 ? (
        // If there are no apps
        <p className="text-gray-500">You haven’t added any applications yet.</p>
      ) : (
        // Render list of job cards
        <div className="space-y-4">
          {apps.map(app => (
            <div
              key={app.id}
              className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition flex flex-col justify-between h-full"
            >
              {/* Header: Position + Company + Status */}
              <div className="flex items-center justify-between">
                <div className="mb-1">
                  <h2 className="text-lg font-bold text-indigo-800">
                    Position: <span className="text-gray-800">{app.position}</span>
                  </h2>
                  <p className="text-sm text-gray-600">
                    Company: <span className="text-gray-900 font-medium">{app.companyName || "—"}</span>
                  </p>
                </div>

                {/* Status Dropdown */}
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  className="bg-blue-100 text-blue-700 font-medium text-sm px-2 py-1 rounded focus:outline-none"
                >
                  <option value="APPLIED">Applied</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              {/* Footer: Date + Actions */}
              <div className="flex items-end justify-between mt-4">
                <p className="text-sm text-gray-400">
                  🗓️ Applied on: {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "N/A"}
                </p>

                {/* Delete + Edit buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => navigate(`/applications/${app.id}/edit`)}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Utility function to apply status-specific color classes (not currently used)
function getStatusColor(status) {
  switch (status) {
    case "APPLIED":
      return "bg-blue-100 text-blue-700";
    case "INTERVIEW":
      return "bg-yellow-100 text-yellow-800";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    case "OFFER":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
}
