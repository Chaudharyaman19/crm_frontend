import React, { useState, useEffect } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

export default function LeadForm({ lead, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "new",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lead && lead._id) setForm(lead);
    else setForm({ name: "", email: "", phone: "", status: "new" });
  }, [lead]);

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (!/^[A-Za-z\s\-_]+$/.test(form.name))
      newErrors.name =
        "Name can only contain letters, spaces, hyphens, and underscores";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits only";

    return newErrors;
  }

  async function save(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      if (form._id) {
        const res = await api.put("/api/leads/" + form._id, form);
        toast.success("✅ Lead updated successfully!");
        onSaved(res.data.data);
      } else {
        const res = await api.post("/api/leads", form);
        toast.success("🎉 Lead added successfully!");
        onSaved(res.data.data);
      }
    } catch (e) {
      toast.error("❌ Failed to save lead. Please try again!");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <form
        onSubmit={save}
        className="bg-white w-full max-w-md sm:w-96 p-6 rounded-xl shadow-md overflow-y-auto max-h-[90vh]"
      >
        <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">
          {form._id ? "Edit Lead" : "Add Lead"}
        </h3>

        <input
          className="w-full p-2 mb-1 border rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name}</p>
        )}

        <input
          className="w-full p-2 mb-1 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        <input
          className="w-full p-2 mb-1 border rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
        )}

        <select
          className="w-full p-2 mb-4 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded border hover:bg-gray-100 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
