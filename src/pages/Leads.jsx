import React, { useEffect, useState } from "react";
import api from "../api/api";
import LeadForm from "./LeadForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaUserEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/leads");
      setLeads(res.data.data);
    } catch (e) {
      toast.error("❌ Failed to fetch leads");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id) => {
    const confirmId = toast.info(
      <div>
        <p className="font-medium">
          ⚠️ Are you sure you want to delete this lead?
        </p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={async () => {
              toast.dismiss(confirmId);
              const loadingToast = toast.loading("Deleting lead...");
              try {
                await api.delete(`/api/leads/${id}`);
                setLeads((prev) => prev.filter((l) => l._id !== id));
                toast.update(loadingToast, {
                  render: "🗑️ Lead deleted successfully!",
                  type: "success",
                  isLoading: false,
                  autoClose: 3000,
                });
              } catch (e) {
                toast.update(loadingToast, {
                  render: "❌ Failed to delete lead!",
                  type: "error",
                  isLoading: false,
                  autoClose: 3000,
                });
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(confirmId)}
            className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300 transition"
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleSaved = () => {
    fetchLeads();
    setEdit(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Leads Management
        </h2>
        <button
          onClick={() => setEdit({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Lead
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : leads.length === 0 ? (
        <p className="text-center text-gray-500 py-8 text-lg">
          No leads found 🧐
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                {["Name", "Email", "Phone", "Status", "Actions"].map((head) => (
                  <th
                    key={head}
                    className="text-left p-3 text-gray-600 font-semibold text-sm"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l, index) => (
                <motion.tr
                  key={l._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 border-b"
                >
                  <td className="p-3 font-medium text-gray-800">{l.name}</td>
                  <td className="p-3 text-gray-600">{l.email}</td>
                  <td className="p-3 text-gray-600">{l.phone}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        l.status === "closed"
                          ? "bg-green-100 text-green-700"
                          : l.status === "contacted"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setEdit(l)}
                      className="flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-yellow-400 text-white hover:bg-yellow-500 transition"
                    >
                      <FaUserEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteLead(l._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {edit && (
        <LeadForm
          lead={edit}
          onClose={() => setEdit(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
