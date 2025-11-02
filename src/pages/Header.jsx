import React from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Header({ onLogout }) {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="text-xl font-bold text-blue-600 tracking-wide">
        Dashboard
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <FaUserCircle className="text-gray-600 text-xl" />
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            Aman Chaudhary
          </span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
        >
          <FiLogOut className="text-lg" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}
