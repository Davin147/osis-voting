"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    // Mengambil passphrase dari Environment Variables Netlify / .env.local
    const correctPassphrase = process.env.NEXT_PUBLIC_ADMIN_PASSPHRASE;

    // Sesuai petunjuk dokumen: validasi kecocokan kunci rahasia admin
    if (password === correctPassphrase) {
      // Jika benar, simpan status login di localStorage agar tidak terlempar keluar
      localStorage.setItem("isAdminAuthenticated", "true");
      
      // Arahkan ke halaman utama dashboard admin
      router.push("/admin/dashboard");
    } else {
      setErrorMsg("Kata sandi Admin (Passphrase) salah atau tidak terdaftar!");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 border rounded-lg bg-white shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Login Admin OSIS
        </h1>

        {/* Notifikasi jika salah memasukkan kata sandi */}
        {errorMsg && (
          <div className="p-3 mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errorMsg}
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="admin@school.sch.id"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Passphrase Admin</label>
          <input
            type="password"
            placeholder="Masukkan kata sandi dari dokumen"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors disabled:bg-blue-300 font-semibold"
        >
          {isLoading ? "Membuka Dashboard..." : "Masuk Sebagai Admin"}
        </button>
      </form>
    </main>
  );
}
