"use client";
import { useState, useEffect } from "react";
import useAuth from "@/app/hooks/admin_auth";
import Profile from "@/app/components/Profile";
import Settings from '@/app/components/Settings';
import Orders from '@/app/components/Orders';
import Customers from '@/app/components/Customers';
import Channels from '@/app/components/Channels';
import Reports from "@/app/components/Reports";
import Messages from "@/app/components/Messages";
import useOrders from "@/app/hooks/oders_hook";
import Foods from "@/app/components/Foods";


export default function Dashboard() {
  const { user, loading, error } = useAuth();
  const { orders, newOrdersCount, resetNewOrdersCount } = useOrders();

  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/'; // Redirect if not authenticated
    }
  }, [user, loading]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Orders') {
      resetNewOrdersCount(); // Reset new orders count when viewing the Orders tab
    }
  };

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
              onClick={() => handleTabClick(tab.name)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
              {tab.name === 'Orders' && newOrdersCount > 0 && (
                <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">{newOrdersCount}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-semibold"></h2>
        <div className="mt-6">
          {activeTab === "Profile" && <Profile />}
          {activeTab === 'Settings' && <Settings />}
          {activeTab === 'Orders' && <Orders orders={orders} />}
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
