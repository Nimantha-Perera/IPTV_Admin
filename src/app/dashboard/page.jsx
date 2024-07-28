// src/app/dashboard/page.jsx

"use client";
import { useState, useEffect } from "react";
import useAuth from "@/app/hooks/admin_auth";
import Profile from "@/app/components/Profile";
import Settings from '@/app/components/Settings';
import Orders from '@/app/components/Orders';
import Foods from '@/app/components/Foods';
import Customers from '@/app/components/Customers';
import Channels from '@/app/components/Channels';
import Reports from "../components/Reports";
import Messages from "../components/Messages";

export default function Dashboard() {
  const { user, loading, error } = useAuth();

  // Ensure that useState is always called in the same way
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/'; // Redirect if not authenticated
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  const tabs = [
    { name: "Profile", icon: "👤" },
    { name: "Orders", icon: "🛒" },
    { name: "Customers", icon: "👥" },
    { name: "Foods", icon: "🍔" },
    { name: "Channels", icon: "📺" },
    { name: "Reports", icon: "📊" },
    { name: "Messages", icon: "💬" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`w-full text-left p-4 hover:bg-gray-700 ${
                activeTab === tab.name ? "bg-gray-900" : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-semibold"></h2>
        <div className="mt-6">
          {activeTab === "Profile" && <Profile />}
          {activeTab === 'Settings' && <Settings />}
          {activeTab === 'Orders' && <Orders />}
          {activeTab === 'Customers' && <Customers />}
          {activeTab === 'Channels' && <Channels />}
          {activeTab === 'Reports' && <Reports />}
          {activeTab === 'Foods' && <Foods />}
          {activeTab === 'Messages' && <Messages />}
        </div>
      </main>
    </div>
  );
}
