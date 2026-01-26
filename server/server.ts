import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", async (socket) => {
  console.log("user connected");
  const count = io.engine.clientsCount;
  io.emit("totalCount", count);

  socket.on("disconnect", function () {
    console.log("user disconnected");
    io.emit("totalCount", io.engine.clientsCount);
  });
});

app.get("/api/seating", (req, res) => {
  res.send("List of seats");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
