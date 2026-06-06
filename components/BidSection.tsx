"use client";

import { socket } from "@/lib/socket";
import { useState, useEffect } from "react";

export default function BidSection({ expired, itemId, startingBid }: {
  expired: boolean;
  itemId: string;
  startingBid: number;
}) {
    const [bidAmount, setBidAmount] = useState("");
    const [error, setError] = useState("");
    const [minbid, setminbid] = useState(startingBid);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
        socket.emit("join", itemId);
        socket.on("min-bid", (data)=>{
            setminbid((minbid)=> minbid > data ? minbid : data );
        });
        return (()=>{
            socket.off("min-bid");
            socket.emit("leave", itemId);
        })
    }, [itemId]);

const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amount = Number(bidAmount);

    if (!bidAmount || isNaN(amount)) {
      setError("Please enter a valid amount.");
      return;
    }

    if (amount <= minbid) {
      setError(`Bid must be greater than INR ${minbid}.`);
      return;
    }

    socket.emit("place_bid", {
      itemId,
      amount,
      user_name: "Anonymous Player", 
      placed_at: new Date().toISOString(),
    });

    setBidAmount("");
  };

  return (
    <form 
      onSubmit={handlePlaceBid} 
      className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-5 flex flex-col gap-4"
    >
      <h2 className="text-lg font-bold">Place a Bid</h2>
      {expired ? (
        <p className="text-sm text-red-500">This auction has ended.</p>
      ) : (
        <>
          <input
            type="number"
            placeholder={`Min bid: ₹${minbid + 1}`}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-blue-500"
          />
          
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            Place Bid
          </button>
        </>
      )}
    </form>
  );
}