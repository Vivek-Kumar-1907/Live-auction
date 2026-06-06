import "dotenv/config";
import { createServer } from "http";
import {Server} from "socket.io"
import {Pool} from "pg"

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {origin: "http://localhost:3000"}
});

const minbids = [0];

io.on("connection", (socket)=>{
    socket.on("join", (id)=>{
        socket.join(id);
        if(!minbids[id]) minbids[id] = 0;
        const minbid = minbids[id];
        socket.emit("min-bid", minbid);
    });
    socket.on("place_bid", (data) => {
        console.log(data);
        const { itemId, amount, user_name, placed_at } = data;
        io.to(itemId).emit("new-bid", {
            amount,
            user_name,
            placed_at
        });
        if(amount > minbids[itemId]){
            minbids[itemId] = amount;
        }
        const minbid = minbids[itemId];
        io.to(itemId).emit("min-bid", minbid);
  });
    socket.on("leave", (id) => {
        socket.leave(id);
    });
    socket.on("disconnect", ()=>{
        console.log("Disconnected");
    });
    console.log(socket.id);
});

httpServer.listen(5000, ()=>{
    console.log("Socket io server ready");
})