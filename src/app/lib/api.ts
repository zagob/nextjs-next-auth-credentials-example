"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiFetch(
  url: string,
  method: "GET" | "POST" | "DELETE" | "UPDATE",
  init?: RequestInit
) {
  const cookiesServer = cookies();
  const token = cookiesServer.get("tokenc");

  const baseURL = env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseURL}${url}`, {
    method,
    // mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    ...init,
  });
  if (res.status === 401) {
    redirect("/auth/signout");
  }

  return await res.json();
}
