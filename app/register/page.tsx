"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProcessing(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try{
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });
      if(!response.ok) {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
      else{
        setError("");
        router.push("/login");
      }
    }
    catch(error) {
      console.log("Error during registration:", error);
      setError("An error occurred during registration");
    }
    finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
  <main className="w-full max-w-md px-8 py-12 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
    <h1 className="text-3xl font-bold mb-8">
      Register
    </h1>
    { error && <p className="text-red-500 mb-4">{error}</p> }
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        minLength={3}
        maxLength={20}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        minLength={3}
        maxLength={20}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
      />
      <button
          type="submit"
          disabled={isProcessing}
          className={`w-full mt-2 bg-blue-500 text-white py-2 rounded-md transition duration-200 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isProcessing ? "Registering..." : "Register"}
      </button>
    </form>
  </main>
</div>
  );
}
