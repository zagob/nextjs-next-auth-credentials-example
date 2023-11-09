"use client";

import { signOut as SignOutNextAuth } from "next-auth/react";

export function SignOut() {
  return (
    <button type="button" onClick={() => SignOutNextAuth()}>
      logout
    </button>
  );
}
