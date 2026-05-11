"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch (err) {
      alert("Login failed! Make sure your backend is running on Port 5000.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Team Manager</h2>
        <div className="space-y-4">
          <input 
            type="email" placeholder="Email" required
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg font-bold transition">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}