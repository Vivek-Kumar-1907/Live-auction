"use client"

import { useRouter } from "next/navigation";

export default function DashboardButtons() {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-3 w-full max-w-xs">
            <button onClick={() => router.push("/buy")} className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                Buy Items
            </button>
            <button onClick={() => router.push("/sell")} className="px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-700 transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600">
                Sell Stuff
            </button>
            <button onClick={() => router.push("/view")} className="px-4 py-2 bg-zinc-300 text-white rounded-md hover:bg-zinc-500 transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600">
                View Items
            </button>
            <button onClick={() => router.push("/logout")} className="px-4 py-2 bg-zinc-100 text-zinc-900 border border-zinc-300 rounded-md hover:bg-zinc-200 transition-colors dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">
                Logout
            </button>
        </div>
    )
}