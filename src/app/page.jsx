// app/page.js
"use client";
import { useEffect } from "react";
import AdminLogin from "./login/login";
import useAuth from "../app/hooks/admin_auth";

export default function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      window.location.href = '/dashboard'; // Redirect authenticated users to /dashboard
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return <AdminLogin />;
}
