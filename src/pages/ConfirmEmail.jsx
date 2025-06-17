import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function ConfirmEmail() {
  const [status, setStatus] = useState("confirming");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setStatus("invalid");
      return;
    }

    api.get(`/auth/confirm?token=${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {status === "confirming" && (
        <p className="text-xl text-gray-700 font-medium">⏳ Confirming your email...</p>
      )}

      {status === "success" && (
        <div className="text-center">
          <p className="text-2xl font-semibold text-green-600 mb-4">✅ Email confirmed successfully!</p>
        </div>
      )}

      {status === "error" && (
        <p className="text-xl text-red-600 font-semibold">❌ Invalid or expired confirmation token</p>
      )}

      {status === "invalid" && (
        <p className="text-xl text-red-600 font-semibold">⚠️ No token found in URL</p>
      )}
    </div>
  );
}
