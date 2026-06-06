"use client";

export default function BidSection({ expired, itemId, startingBid }: {
  expired: boolean;
  itemId: string;
  startingBid: number;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-5 flex flex-col gap-4">
      <h2 className="text-lg font-bold">Place a Bid</h2>
      {expired ? (
        <p className="text-sm text-red-500">This auction has ended.</p>
      ) : (
        <>
          <p className="text-sm text-zinc-500">Live bidding coming soon — WebSocket integration pending.</p>
          <input
            type="number"
            placeholder={`Min bid: ₹${startingBid}`}
            disabled
            className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
          />
          <button
            disabled
            className="w-full py-2 bg-blue-300 dark:bg-blue-900 text-white rounded-md cursor-not-allowed text-sm"
          >
            Bid (coming soon)
          </button>
        </>
      )}
    </div>
  );
}