import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("🎉 Registered successfully! Please login.");
      nav("/");
    } catch (err) {
      toast.error(err.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">
        Register
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
          className="w-full py-2 rounded bg-orange-600 text-white flex justify-center items-center"
        >
          {loading ? (
            <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></div>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/" className="text-orange-600 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
