"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Sesuaikan path folder client Supabase Anda
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman otomatis saat submit
    setErrorMsg("");
    setIsLoading(true);

    try {
      // 1. Proses autentikasi email dan password ke Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // 2. Opsi tambahan jika login admin Anda dikunci menggunakan kata sandi statis .env.local
      // Pastikan ADMIN_PASSPHRASE di .env.local diubah namanya jadi NEXT_PUBLIC_ADMIN_PASSPHRASE agar terbaca di sini
      if (process.env.NEXT_PUBLIC_ADMIN_PASSPHRASE) {
        if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSPHRASE) {
          throw new Error("Kata sandi admin tidak cocok dengan sistem!");
        }
      }

      // Jika berhasil, arahkan admin masuk ke halaman dashboard voting
      router.push("/admin/dashboard"); 
      
    } catch (error: any) {
      setErrorMsg(error.message || "Gagal masuk, periksa data Anda kembali.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
      {/* Membungkus input dengan form dan menambahkan onSubmit */}
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 border rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Login Admin
        </h1>

        {/* Tempat memunculkan pesan peringatan jika login gagal */}
        {errorMsg && (
          <div className="p-3 mb-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
            {errorMsg}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Tombol diubah tipe datanya menjadi submit */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors disabled:bg-blue-400"
        >
          {isLoading ? "Memproses..." : "Login"}
        </button>
      </form>
    </main>
  );
}
