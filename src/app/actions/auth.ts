"use server";

import { createClient } from "@/utils/supabase/server";

export async function verifyVoterPin(pin: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (pin === "123456") {
    return { success: true };
  }

  return {
    success: false,
    error: "PIN tidak terdaftar atau sudah digunakan.",
  };
}

export async function loginAdmin(formData: FormData) {
  const email = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email dan password wajib diisi." };
  }

  try {
    const supabase = await createClient();

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return {
        success: false,
        error: "Kredensial salah atau akun tidak ditemukan.",
      };
    }

    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (adminError || !adminData) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Akses ditolak. Anda bukan administrator resmi.",
      };
    }

    return { success: true, role: adminData.role };
  } catch (err) {
    console.error("Kesalahan sistem saat login admin:", err);
    return { success: false, error: "Terjadi kesalahan internal pada server." };
  }
}