"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  async function logout() {
    await signOut();
  }
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-l-2 border-b-2 w-20 h-20 rounded-full animate-spin" />
    </div>
  );
}
