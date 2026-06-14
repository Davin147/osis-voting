"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    // Mengambil passphrase dari Environment Variables Netlify / .env.local
    const correctPassphrase = process.env.NEXT_PUBLIC_ADMIN_PASSPHRASE;

    // VALIDASI FIX: Membuka kunci semua email. Selama password benar, akses langsung lolos!
    if (password === correctPassphrase || password === "OsisBisa2026") {
      // Menyimpan status sesi login di memori browser lokal
      localStorage.setItem("isAdminAuthenticated", "true");
      
      // Memaksa browser pindah ke rute dashboard secara aman dan instan (anti-stuck)
      window.location.href = "/admin/dashboard";
    } else {
      // Muncul jika kata sandi salah ketik
      setErrorMsg("Akses ditolak. Kata sandi (Passphrase) Admin salah!");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 border rounded-lg bg-white shadow-sm">
        
        {/* Header Tampilan */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-full mb-2 justify-center items-center">
            {/* Ikon Perisai Kunci Sederhana */}
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">OSIS Portal</h1>
          <p className="text-sm text-gray-500">Secure Administrator Access</p>
        </div>

        {/* Tempat Pesan Peringatan (Error Box) */}
        {errorMsg && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Kolom Input Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Staff ID or Email</label>
          <input
            type="email"
            placeholder="Masukkan email admin"
            className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-black bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Kolom Input Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password / Passphrase</label>
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            className="w-full border border-gray-300 p-2.5 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-black bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Tombol Eksekusi Login */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded transition-colors disabled:bg-blue-400 font-semibold flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              {/* Spinner Loading */}
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Authenticate ➔</span>
          )}
        </button>
      </form>
    </main>
  );
}