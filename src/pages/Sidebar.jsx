import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";

const Item = ({ to, children, icon: Icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md mb-1 transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-black md:text-gray-700 hover:bg-gray-100 hover:text-blue-600"
      }`
    }
  >
    <Icon className="text-lg" />
    <span className="text-sm font-medium">{children}</span>
  </NavLink>
);

export default function Sidebar() {
  const [open, setOpen] = useState(false); // ✅ default close for mobile

  return (
    <>
      {/* ✅ Top Bar for mobile */}
      <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-50">
        <h1 className="text-lg font-semibold text-blue-600">My CRM</h1>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <FiMenu className="text-xl text-gray-700" />
        </button>
      </div>

      {/* ✅ Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-screen bg-white shadow-md transition-all duration-300 z-50 ${
          open
            ? "translate-x-0 w-64"
            : "-translate-x-full md:translate-x-0 w-64"
        }`}
      >
        <div className="p-4">
          <div className="text-2xl font-bold text-blue-600 mb-6 hidden md:block">
            My CRM
          </div>

          <nav>
            <Item
              to="/dashboard"
              icon={MdSpaceDashboard}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Item>
            <Item
              to="/leads"
              icon={FaClipboardList}
              onClick={() => setOpen(false)}
            >
              Leads
            </Item>
          </nav>
        </div>
      </aside>

      {/* ✅ Overlay when sidebar open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
