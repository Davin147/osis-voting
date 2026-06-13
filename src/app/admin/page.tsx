"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Mengecek apakah admin sudah login lewat localStorage
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    
    if (isAuthenticated !== "true") {
      // Jika belum login, tendang kembali ke halaman login admin
      router.push("/admin");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin");
  };

  if (!authorized) {
    return <div className="p-8 text-center text-black">Memeriksa hak akses admin...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin Pemungutan Suara</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
          >
            Keluar (Logout)
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">Selamat datang di panel admin! Di sini Anda dapat mengelola hasil voting OSIS.</p>
        
        {/* Tempat untuk menaruh grafik atau data Supabase Anda nantinya */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg h-48 flex items-center justify-center text-gray-400">
          [ Grafik Hasil Voting dan Data Kandidat Akan Muncul di Sini ]
        </div>
      </div>
    </main>
  );
}
