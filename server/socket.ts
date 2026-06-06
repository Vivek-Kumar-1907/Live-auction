import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { Pool } from "pg";

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" }
});

io.on("connection", (socket) => {

  socket.on("join", async (itemId) => {
    socket.join(String(itemId));
    console.log(itemId);
    const { rows: [highest] } = await db.query(
      "SELECT COALESCE(MAX(amount), 0) as max FROM bids WHERE item_id = $1",
      [itemId]
    );

    const { rows: [item] } = await db.query(
      "SELECT starting_bid FROM items WHERE id = $1",
      [itemId]
    );

    const minbid = Math.max(highest?.max ?? 0, item.starting_bid);
    socket.emit("min-bid", minbid);

    // send full bid history to the joining client
    const { rows: bids } = await db.query(
      `SELECT bids.amount, users.user_name, bids.placed_at
       FROM bids
       JOIN users ON bids.user_id = users.id
       WHERE bids.item_id = $1
       ORDER BY bids.placed_at DESC`,
      [itemId]
    );

    socket.emit("bid-history", bids);
  });

  socket.on("place_bid", async (data) => {
    const { itemId, amount, userId } = data;

    // get current highest bid
    const { rows: [highest] } = await db.query(
      "SELECT COALESCE(MAX(amount), 0) as max FROM bids WHERE item_id = $1",
      [itemId]
    );

    const { rows: [item] } = await db.query(
      "SELECT starting_bid FROM items WHERE id = $1",
      [itemId]
    );

    // validate
    if (amount <= highest.max || amount < item.starting_bid) {
      socket.emit("error", "Bid must be higher than current highest bid");
      return;
    }

    // save to DB
    await db.query(
      "INSERT INTO bids (item_id, user_id, amount) VALUES ($1, $2, $3)",
      [itemId, userId, amount]
    );

    // get username
    const { rows: [user] } = await db.query(
      "SELECT user_name FROM users WHERE id = $1",
      [userId]
    );

    const newBid = {
      amount,
      user_name: user.user_name,
      placed_at: new Date().toISOString(),
    };

    // broadcast new bid to everyone in the room
    io.to(String(itemId)).emit("new-bid", newBid);

    // broadcast updated min bid
    io.to(String(itemId)).emit("min-bid", amount);
  });

  socket.on("leave", ({ itemId }) => {
    socket.leave(String(itemId));
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });

  console.log("Connected:", socket.id);
});

httpServer.listen(5000, () => console.log("Socket.IO server ready on port 5000"));