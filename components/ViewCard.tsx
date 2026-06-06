"use client";

export default function ViewCard({ imageurl, title, description, startingBid, createdAt }: {
  imageurl: string;
  title: string;
  description: string;
  startingBid: number;
  createdAt: string;
}) {
  const expires = new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000);
  const expired = Date.now() > expires.getTime();
  const expiryString = expires.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
 });
  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900">
      <img className="w-full h-40 object-cover" src={imageurl} alt={title} />
      <div className="px-4 py-3 flex flex-col gap-2">
        <p className="font-bold text-base truncate">{title}</p>
        <p className="text-gray-500 dark:text-zinc-400 text-sm line-clamp-2">{description}</p>
        <p className="text-sm font-medium">Starting bid: ₹{startingBid}</p>
        <p className={`text-xs ${expired ? "text-red-500" : "text-green-500"}`}>
          {expired ? "Auction ended" : `Closes on ${expiryString}`}
        </p>
      </div>
    </div>
  );
}