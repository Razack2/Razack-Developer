"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Experience = {
  id: string;
  company: string;
  position: string;
  description: string;
};

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetch = async () => {
    const { data } = await supabase.from("experience").select("*");
    setItems(data || []);
  };

  useEffect(() => {
    fetch();
  }, []);

  const reset = () => {
    setCompany("");
    setPosition("");
    setDescription("");
    setEditingId(null);
  };

  const save = async () => {
    if (editingId) {
      await supabase.from("experience").update({
        company,
        position,
        description,
      }).eq("id", editingId);
    } else {
      await supabase.from("experience").insert({
        company,
        position,
        description,
      });
    }

    reset();
    fetch();
  };

  const edit = (item: Experience) => {
    setEditingId(item.id);
    setCompany(item.company);
    setPosition(item.position);
    setDescription(item.description);
  };

  const remove = async (id: string) => {
    await supabase.from("experience").delete().eq("id", id);
    fetch();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Experience</h1>

      <div className="border p-4 mb-6 space-y-2">
        <input className="border p-2 w-full" placeholder="Company"
          value={company} onChange={(e) => setCompany(e.target.value)} />

        <input className="border p-2 w-full" placeholder="Position"
          value={position} onChange={(e) => setPosition(e.target.value)} />

        <textarea className="border p-2 w-full" placeholder="Description"
          value={description} onChange={(e) => setDescription(e.target.value)} />

        <button onClick={save} className="bg-blue-600 text-white px-4 py-2">
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="border p-3 flex justify-between mb-2">
          <div>
            <p className="font-semibold">{item.position}</p>
            <p className="text-sm">{item.company}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => edit(item)}>Edit</button>
            <button onClick={() => remove(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}