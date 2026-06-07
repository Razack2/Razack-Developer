"use client";

import { useState } from "react";

type Field = {
  name: string;
  label: string;
  type?: "text" | "date" | "textarea";
};

type Props<T> = {
  title: string;
  fields: Field[];
  data: T[];
  loading: boolean;

  onInsert: (payload: any) => void;
  onUpdate: (id: string, payload: any) => void;
  onDelete: (id: string) => void;

  getId: (item: T) => string;
  mapToForm: (item: T) => any;
};

export default function CrudManager<T>({
  title,
  fields,
  data,
  loading,
  onInsert,
  onUpdate,
  onDelete,
  getId,
  mapToForm,
}: Props<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  const startEdit = (item: T) => {
    setEditingId(getId(item));
    setForm(mapToForm(item));
  };

  const reset = () => {
    setEditingId(null);
    setForm({});
  };

  const handleSave = () => {
    if (editingId) {
      onUpdate(editingId, form);
    } else {
      onInsert(form);
    }
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* FORM */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        {fields.map((f) =>
          f.type === "textarea" ? (
            <textarea
              key={f.name}
              placeholder={f.label}
              className="border p-3 rounded"
              value={form[f.name] || ""}
              onChange={(e) =>
                setForm({ ...form, [f.name]: e.target.value })
              }
            />
          ) : (
            <input
              key={f.name}
              type={f.type || "text"}
              placeholder={f.label}
              className="border p-3 rounded"
              value={form[f.name] || ""}
              onChange={(e) =>
                setForm({ ...form, [f.name]: e.target.value })
              }
            />
          )
        )}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>

        <button
          onClick={reset}
          className="bg-gray-300 px-5 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {/* LIST */}
      {loading && <p>Loading...</p>}

      <div className="space-y-3">
        {data.map((item: any) => (
          <div
            key={getId(item)}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              {fields.map((f) => (
                <p key={f.name} className="text-sm">
                  <span className="font-semibold">{f.label}: </span>
                  {item[f.name]}
                </p>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(item)}
                className="bg-yellow-500 px-3 py-1 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(getId(item))}
                className="bg-red-600 px-3 py-1 text-white rounded"
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