import pool from "@/lib/db";
import Navbar from "@/components/BackToDashNav"
import BidSection from "@/components/BidSection";
import BidHistory from "@/components/BidHistory";

export default async function ItemPage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const { rows: [item] } = await pool.query(
    `SELECT items.*, users.user_name 
     FROM items 
     JOIN users ON items.user_id = users.id 
     WHERE items.id = $1`,
    [id]
  );

   if (!item) return <div className="flex min-h-screen items-center justify-center">Item not found</div>;

  const expires = new Date(new Date(item.created_at).getTime() + Number(item.auctionlength) * 60 * 60 * 1000);
  const expired = Date.now() > expires.getTime();
  const expiryString = expires.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const { rows: bids } = await pool.query(
    `SELECT bids.amount, users.user_name, bids.placed_at
     FROM bids
     JOIN users ON bids.user_id = users.id
     WHERE bids.item_id = $1
     ORDER BY bids.placed_at DESC`,
    [id]
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">

      <Navbar/>

      <main className="flex flex-col lg:flex-row gap-6 px-8 py-10 max-w-6xl mx-auto">

        <div className="lg:w-1/2 flex flex-col gap-4">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-72 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800"
          />
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-5 flex flex-col gap-3">
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">by {item.user_name}</p>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{item.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-sm font-medium">Starting bid: ₹{item.starting_bid}</span>
              <span className={`text-xs ${expired ? "text-red-500" : "text-green-500"}`}>
                {expired ? "Auction ended" : `Closes ${expiryString}`}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-6">

          <BidSection expired={expired} itemId={id} startingBid={item.starting_bid} />

          <BidHistory initialBids={bids} itemId={id} />

        </div>
      </main>
    </div>
  );
}