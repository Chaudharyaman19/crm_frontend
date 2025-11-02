import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";
import Sidebar from "./pages/Sidebar";
import Header from "./pages/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Protected({ children }) {
  const token = localStorage.getItem("crm_jwt");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col md:flex-row">
    {/* ✅ Sidebar (Top on mobile, left on desktop) */}
    <Sidebar />

    {/* ✅ Main content area */}
    <div className="flex-1 flex flex-col relative">
      {/* 🧭 Header on top for desktop */}
      <div className="hidden md:block">
        <Header
          onLogout={() => {
            localStorage.removeItem("crm_jwt");
            window.location.href = "/";
          }}
        />
      </div>

      {/* 🧭 Header fixed bottom for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow z-40">
        <Header
          onLogout={() => {
            localStorage.removeItem("crm_jwt");
            window.location.href = "/";
          }}
        />
      </div>

      {/* ✅ Main content */}
      <main className="flex-1 bg-gray-50 p-4 pb-16 md:pb-4">{children}</main>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Layout>
                <Dashboard />
              </Layout>
            </Protected>
          }
        />
        <Route
          path="/leads"
          element={
            <Protected>
              <Layout>
                <Leads />
              </Layout>
            </Protected>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toasts */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}
