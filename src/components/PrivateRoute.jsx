import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // Retrieve access token from localStorage
  const token = localStorage.getItem("accessToken");

  // If no token is found, redirect user to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the protected route
  return children;
}
