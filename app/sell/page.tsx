"use client";
import { useRouter } from "next/navigation";

export default function Sell() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/sell", {
      method: "POST",
      body: formData,
    })
    if (!res.ok) {
      alert("Failed to create auction. Please try again.");
      return;
    }
    else {
      router.push("/view");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">

      <nav className="flex items-center px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <main className="flex justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl shadow-sm px-8 py-10">
          <h1 className="text-2xl font-bold mb-8">Sell item</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Product Image</label>
              <input
                required
                type="file"
                name="image"
                accept="image/*"
                className="text-sm text-zinc-600 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-zinc-300 dark:file:border-zinc-700 file:text-sm file:bg-transparent hover:file:bg-zinc-100 dark:hover:file:bg-zinc-800 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Product Title</label>
              <input
                required
                type="text"
                name="title"
                placeholder="ex: 1348353729582 Tormented Souls"
                className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Brief Description</label>
              <textarea
                required
                name="description"
                placeholder="Describe your product..."
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 resize-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Starting Bid (INR)</label>
              <input
                required
                type="number"
                name="startingBid"
                placeholder="e.g. 500"
                min={1}
                className="w-full p-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Create Auction
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}