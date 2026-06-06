"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Skill = {
  id: string;
  skill_name: string;
  category: string | null;
  proficiency: number | null;
};

export default function SkillsPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [proficiency, setProficiency] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchSkills = async () => {
    const { data } = await supabase.from("technical_expertise").select("*");
    setItems(data || []);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const reset = () => {
    setSkillName("");
    setCategory("");
    setProficiency(0);
    setEditingId(null);
  };

  const save = async () => {
    if (editingId) {
      await supabase
        .from("technical_expertise")
        .update({
          skill_name: skillName,
          category,
          proficiency,
        })
        .eq("id", editingId);
    } else {
      await supabase.from("technical_expertise").insert({
        skill_name: skillName,
        category,
        proficiency,
      });
    }

    reset();
    fetchSkills();
  };

  const edit = (item: Skill) => {
    setEditingId(item.id);
    setSkillName(item.skill_name);
    setCategory(item.category || "");
    setProficiency(item.proficiency || 0);
  };

  const remove = async (id: string) => {
    await supabase.from("technical_expertise").delete().eq("id", id);
    fetchSkills();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Skills</h1>

      <div className="border p-4 mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Proficiency (0-100)"
          value={proficiency}
          onChange={(e) => setProficiency(Number(e.target.value))}
        />

        <button onClick={save} className="bg-blue-600 text-white px-4 py-2">
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="border p-3 flex justify-between mb-2">
          <div>
            <p className="font-semibold">{item.skill_name}</p>
            <p className="text-sm">{item.category}</p>
            <p className="text-xs">{item.proficiency}%</p>
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