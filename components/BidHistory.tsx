"use client";

import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

type Bid = { amount: number; user_name: string; placed_at: string };

export default function BidHistory({ initialBids, itemId }: {
  initialBids: Bid[];
  itemId: string;
}) {

    const [bids, setBids] = useState(initialBids);
    useEffect(()=>{
            if(!socket.connected){
                socket.connect();
            }
            socket.emit("join", itemId);
            socket.on("bid-history", (bids) => {
                setBids(bids);
            });
            socket.on("new-bid", (data)=>{
                setBids((bids)=>[data, ...bids]);
            });
            return ()=> {
                socket.off("new-bid");
                socket.emit("leave", itemId);
            }
    }, [itemId]);
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-5 flex flex-col gap-3">
      <h2 className="text-lg font-bold">Bid History</h2>
      {bids.length === 0 ? (
        <p className="text-sm text-zinc-500">No bids yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {bids.map((bid, i) => (
            <li key={i} className="flex items-center justify-between text-sm border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <span className="font-medium">₹{bid.amount}</span>
              <span className="text-zinc-500">{bid.user_name}</span>
              <span className="text-zinc-400 text-xs">
                {new Date(bid.placed_at).toLocaleString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "numeric",
                  month: "short",
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}