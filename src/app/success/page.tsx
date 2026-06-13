"use client";

import { useRouter } from "next/navigation";
import { CheckCircle, ShieldCheck } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  const handleExit = () => {
    router.replace("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl text-center">
        <div className="mx-auto w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Terima Kasih!
        </h1>

        <p className="text-sm text-slate-500 mb-8">
          Suara Anda telah berhasil dicatat secara rahasia dan aman di dalam sistem.
        </p>

        <div className="bg-slate-50 border rounded-xl p-3 flex items-center justify-center gap-2 mb-8">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-medium text-slate-600">
            Asas LUBER JURDIL Terlindungi
          </span>
        </div>

        <button
          onClick={handleExit}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          Kembali ke Layar Utama
        </button>
      </div>
    </main>
  );
}