"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsProcessing(true);
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      e.currentTarget.reset();
      try{
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        });
        if(!response.ok) {
          const data = await response.json();
          setError(data.error || "Login failed");
        }
        else{
          setError("");
          router.push("/dashboard");
        }
      }
      catch(error) {
        console.log("Error during login:", error);
        setError("An error occurred during login");
      }
      finally {
        setIsProcessing(false);
      }
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
  <main className="w-full max-w-md px-8 py-12 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
    <h1 className="text-3xl font-bold mb-8">
      Log in
    </h1>
    { error && <p className="text-red-500 mb-4">{error}</p> }
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        required
        type="text"
        placeholder="Username"
        name="username"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
      />
      <input
        required
        type="password"
        placeholder="Password"
        name="password"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
      />
      <button
          type="submit"
          disabled={isProcessing}
          className={`w-full mt-2 bg-blue-500 text-white py-2 rounded-md transition duration-200 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isProcessing ? "Logging in..." : "Login"}
      </button>
    </form>
  </main>
</div>
  );
}
