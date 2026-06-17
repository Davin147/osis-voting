'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Pastikan path inisialisasi supabase client Anda benar

export default function AdminDashboard() {
  const [totalPemilih, setTotalPemilih] = useState(0);
  const [suaraMasuk, setSuaraMasuk] = useState(0);
  const [totalPaslon, setTotalPaslon] = useState(0);

  useEffect(() => {
    const hitungDataDashboard = async () => {
      // 1. Hitung total seluruh pemilih/kredensial yang terdaftar
      const { count: pemilihCount } = await supabase
        .from('pemilih') // Ganti dengan nama tabel pemilih Anda
        .select('*', { count: 'exact', head: true });
      
      // 2. Hitung jumlah pemilih yang sudah menggunakan suaranya
      const { count: suaraCount } = await supabase
        .from('pemilih')
        .select('*', { count: 'exact', head: true })
        .eq('sudah_memilih', true); // Filter kolom status memilih Anda

      // 3. Hitung jumlah paslon
      const { count: paslonCount } = await supabase
        .from('paslon') // Ganti dengan nama tabel paslon Anda
        .select('*', { count: 'exact', head: true });

      setTotalPemilih(pemilihCount || 0);
      setSuaraMasuk(suaraCount || 0);
      setTotalPaslon(paslonCount || 0);
    };

    hitungDataDashboard();
  }, []);

  // Rumus kalkulasi persentase partisipasi seperti milik guru Anda
  const persentasePartisipasi = totalPemilih > 0 ? Math.round((suaraMasuk / totalPemilih) * 100) : 0;
  const belumMemilih = totalPemilih - suaraMasuk;

  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Pusat Komando</h1>
      <p className="text-slate-400 mb-6">Pantau ringkasan data dan partisipasi pemilih secara langsung.</p>

      {/* Kartu Live Polling Status */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 max-w-xl mb-6">
        <div className="text-blue-400 font-semibold mb-2">● LIVE POLLING STATUS</div>
        <div className="text-4xl font-bold mb-4">{persentasePartisipasi}% Partisipasi</div>
        <p className="text-slate-400 text-sm mb-4">{suaraMasuk} dari {totalPemilih} pemilih telah memberikan suaranya.</p>
        
        {/* Progress Bar (Garis Persentase) */}
        <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${persentasePartisipasi}%` }}></div>
        </div>
        <div className="flex justify-between text-sm mt-4 text-slate-400">
          <div>◯ BELUM MEMILIH: {belumMemilih}</div>
          <div>✓ SUDAH MEMILIH: {suaraMasuk}</div>
        </div>
      </div>

      {/* Baris Informasi Total Grid Bawah */}
      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <div className="bg-white text-slate-900 p-4 rounded-xl font-bold">TOTAL PASLON: <span className="text-blue-600">{totalPaslon}</span></div>
        <div className="bg-white text-slate-900 p-4 rounded-xl font-bold">KREDENSIAL DIBUAT: <span className="text-blue-600">{totalPemilih}</span></div>
      </div>
    </div>
  );
}