import { supabase } from "@/app/lib/supabaseClient";

export async function uploadCertificateImage(file: File) {
  console.log("📁 FILE RECEIVED:", file);

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  console.log("📌 UPLOADING AS:", fileName);

  const { data, error } = await supabase.storage
    .from("certificates")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  console.log("📦 UPLOAD RESPONSE DATA:", data);
  console.log("❌ UPLOAD ERROR:", error);

  if (error) {
    console.error("🚨 STORAGE UPLOAD FAILED:", error.message);
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from("certificates")
    .getPublicUrl(fileName);

  console.log("🌍 PUBLIC URL:", publicUrlData.publicUrl);

  return publicUrlData.publicUrl;
}