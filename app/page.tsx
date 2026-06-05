import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">

      <nav className="flex justify-between items-center px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <span className="font-medium text-lg">Live Auction</span>
        <div className="flex gap-2">
          <a href="/login">
            <button className="px-4 py-2 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
              Log in
            </button>
          </a>
          <a href="/register">
            <button className="px-4 py-2 text-sm rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition">
              Register
            </button>
          </a>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center text-center px-8 py-40">
        <h1 className="text-5xl font-medium text-zinc-900 dark:text-white mb-4">
          Live Auction App!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md mb-8 leading-relaxed">
          Get rid of your stinky items and make free money (totally better than cashify btw) 
        </p>
        <div className="flex gap-3">
          <a href="/register">
            <button className="px-5 py-2.5 text-sm rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition">
              Get started
            </button>
          </a>
          <a href="/login">
            <button className="px-5 py-2.5 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
              Log in
            </button>
          </a>
        </div>
      </main>

    </div>
  );
}