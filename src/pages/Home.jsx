import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      {/* Logo */}
      <img src={logo} alt="WorkTrack Logo" className="w-24 h-24 mb-6" />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">Welcome to WorkTrack <span className="inline-block">👋</span></h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6">
        Track your job applications efficiently and stay organized.
      </p>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
