"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn("credentials", {
      username,
      password,
    });
  }
  return (
    <div>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        onSubmit={handleLogin}
        className=""
      >
        <label className="flex flex-col">
          Username
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-zinc-900 px-2 w-[200px]"
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-zinc-900 px-2 w-[200px]"
          />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
