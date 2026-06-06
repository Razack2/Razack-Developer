"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  image_url: string;
};

export default function CertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fetch = async () => {
    const { data } = await supabase.from("certificates").select("*");
    setItems(data || []);
  };

  useEffect(() => {
    fetch();
  }, []);

  const upload = async () => {
    if (!file) return;

    const path = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("certificates")
      .upload(path, file);

    if (error) return;

    const { data } = supabase.storage
      .from("certificates")
      .getPublicUrl(path);

    await supabase.from("certificates").insert({
      title,
      issuer,
      image_url: data.publicUrl,
    });

    setTitle("");
    setIssuer("");
    setFile(null);
    fetch();
  };

  const remove = async (id: string) => {
    await supabase.from("certificates").delete().eq("id", id);
    fetch();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Certificates</h1>

      <div className="border p-4 mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Issuer"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button onClick={upload} className="bg-blue-600 text-white px-4 py-2">
          Upload Certificate
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="border p-3 flex justify-between mb-2">
          <div>
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm">{item.issuer}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => remove(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}