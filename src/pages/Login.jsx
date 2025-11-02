import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCred.user.getIdToken();
      const res = await api.post("/api/auth/firebase-login", { idToken });
      localStorage.setItem("crm_jwt", res.data.data.token);

      toast.success("✅ Login successful!");
      nav("/dashboard");
    } catch (err) {
      toast.error(err.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white flex justify-center items-center"
        >
          {loading ? (
            <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
