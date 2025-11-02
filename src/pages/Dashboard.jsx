import React, { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";
import { FaChartLine, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get("/api/leads");
        setLeads(res.data.data || []);
      } catch (e) {
        toast.error("❌ Failed to load leads!");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const totalLeads = leads.length;
  const openLeads = leads.filter((l) => l.status === "Open").length;
  const closedLeads = leads.filter((l) => l.status === "Closed").length;

  const cards = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: <FaChartLine className="text-blue-600 text-3xl" />,
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Open Leads",
      value: openLeads,
      icon: <FaUserCheck className="text-yellow-600 text-3xl" />,
      color: "bg-yellow-50 hover:bg-yellow-100",
    },
    {
      title: "Closed Leads",
      value: closedLeads,
      icon: <FaUserTimes className="text-green-600 text-3xl" />,
      color: "bg-green-50 hover:bg-green-100",
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
        Dashboard
      </h1>
      <p className="text-gray-500 mb-4 sm:mb-6">
        Quick overview of your CRM performance
      </p>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Top summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className={`p-5 rounded-2xl shadow-md cursor-pointer transition ${card.color}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{card.title}</div>
                    <div className="text-3xl font-bold mt-1 text-gray-800">
                      {card.value}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-full shadow">
                    {card.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-5 bg-white rounded-2xl shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Activity
            </h2>

            {leads.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">
                No leads available.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {leads.slice(0, 5).map((lead) => (
                  <div
                    key={lead._id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow-sm transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <div>
                        <p className="font-medium text-gray-800">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                      </div>
                    </div>
                    <span
                      className={`self-start sm:self-auto mt-2 sm:mt-0 px-3 py-1 text-xs rounded-full ${
                        lead.status === "Open"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status === "Closed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
