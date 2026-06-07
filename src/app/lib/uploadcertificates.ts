import { supabase } from "@/app/lib/supabaseClient";

export async function uploadCertificateImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("certificates")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("certificates")
    .getPublicUrl(fileName);

  return data.publicUrl;
}