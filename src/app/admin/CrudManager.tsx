"use client";

import { useState } from "react";
import Image from "next/image";

type Field = {
  name: string;
  label: string;
  type?: "text" | "date" | "textarea" | "file";
};

type FormData = Record<string, string>;

type Props<T> = {
  title: string;
  fields: Field[];
  data: T[];
  loading: boolean;

  onInsert: (payload: FormData) => void | Promise<void>;
  onUpdate: (id: string, payload: FormData) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;

  getId: (item: T) => string;
  mapToForm: (item: T) => FormData;

  onFileUpload?: (
    file: File,
    form: FormData,
    setForm: React.Dispatch<React.SetStateAction<FormData>>
  ) => void | Promise<void>;
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
  onFileUpload,
}: Props<T>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({});

  const startEdit = (item: T) => {
    setEditingId(getId(item));
    setForm(mapToForm(item));
  };

  const reset = () => {
    setEditingId(null);
    setForm({});
  };

  const handleSave = async () => {
    if (editingId) {
      await onUpdate(editingId, form);
    } else {
      await onInsert(form);
    }

    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* FORM */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        {fields.map((f) => {
          if (f.type === "textarea") {
            return (
              <textarea
                key={f.name}
                placeholder={f.label}
                className="border p-3 rounded"
                value={form[f.name] || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [f.name]: e.target.value,
                  })
                }
              />
            );
          }

          if (f.type === "file") {
            return (
              <div key={f.name} className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  {f.label}
                </label>

                <input
                  type="file"
                  className="border p-3 rounded"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];

                    if (!file || !onFileUpload) return;

                    await onFileUpload(
                      file,
                      form,
                      setForm
                    );
                  }}
                />

                {form[f.name] && (
                  <Image
                    src={form[f.name]}
                    alt="Preview"
                    width={160}
                    height={160}
                    className="w-40 h-40 object-cover border rounded"
                  />
                )}
              </div>
            );
          }

          return (
            <input
              key={f.name}
              type={f.type || "text"}
              placeholder={f.label}
              className="border p-3 rounded"
              value={form[f.name] || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  [f.name]: e.target.value,
                })
              }
            />
          );
        })}
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
        {data.map((item) => (
          <div
            key={getId(item)}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              {fields.map((f) => (
                <p key={f.name} className="text-sm">
                  <span className="font-semibold">
                    {f.label}:
                  </span>{" "}
                  {String(
                    (item as Record<string, unknown>)[f.name] ?? ""
                  )}
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