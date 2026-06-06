"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Education = {
  id: string;
  institution: string;
  qualification: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
};

export default function EducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(false);

  // form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [institution, setInstitution] = useState("");
  const [qualification, setQualification] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  // -------------------------
  // FETCH EDUCATION
  // -------------------------
  const fetchEducation = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  // -------------------------
  // RESET FORM
  // -------------------------
  const resetForm = () => {
    setEditingId(null);
    setInstitution("");
    setQualification("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  // -------------------------
  // ADD OR UPDATE
  // -------------------------
  const handleSave = async () => {
    if (!institution || !qualification) return;

    if (editingId) {
      // UPDATE
      const { error } = await supabase
        .from("education")
        .update({
          institution,
          qualification,
          start_date: startDate || null,
          end_date: endDate || null,
          description,
        })
        .eq("id", editingId);

      if (error) console.error(error);
    } else {
      // INSERT
      const { error } = await supabase.from("education").insert({
        institution,
        qualification,
        start_date: startDate || null,
        end_date: endDate || null,
        description,
      });

      if (error) console.error(error);
    }

    resetForm();
    fetchEducation();
  };

  // -------------------------
  // EDIT
  // -------------------------
  const handleEdit = (item: Education) => {
    setEditingId(item.id);
    setInstitution(item.institution);
    setQualification(item.qualification);
    setStartDate(item.start_date || "");
    setEndDate(item.end_date || "");
    setDescription(item.description || "");
  };

  // -------------------------
  // DELETE
  // -------------------------
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this education record?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", id);

    if (error) console.error(error);

    fetchEducation();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Education Management
      </h1>

      {/* FORM */}
      <div className="border p-4 rounded mb-6 space-y-3">
        <h2 className="font-semibold">
          {editingId ? "Edit Education" : "Add Education"}
        </h2>

        <input
          className="w-full border p-2"
          placeholder="Institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <textarea
          className="w-full border p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2"
          >
            {editingId ? "Update" : "Add"}
          </button>

          <button
            onClick={resetForm}
            className="bg-gray-300 px-4 py-2"
          >
            Clear
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {loading && <p>Loading...</p>}

        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {item.qualification}
              </h3>
              <p className="text-sm text-gray-600">
                {item.institution}
              </p>
              <p className="text-xs">
                {item.start_date} - {item.end_date}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 px-3 py-1 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 px-3 py-1 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}