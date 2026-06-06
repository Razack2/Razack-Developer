"use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("Software Engineer");
  const [description, setDescription] = useState(
    "I am a full-stack software engineer with a passion for building scalable and efficient web applications."
  );

  const handleSave = async () => {
    console.log({
      title,
      description,
    });

    alert("Save functionality coming next");
  };

  return (
    <main className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8">
        Portfolio Admin
      </h1>

      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Hero Section
        </h2>

        <div>
          <label className="block mb-2">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border rounded p-3"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </main>
  );
}