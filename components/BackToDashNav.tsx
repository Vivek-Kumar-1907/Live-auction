"use client";
import { useRouter } from "next/dist/client/components/navigation";


export default function BackToDashNav() {
    const router = useRouter();
    return (
        <nav className="flex items-center px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
        >
          ← Back to Dashboard
        </button>
      </nav>
    );
}