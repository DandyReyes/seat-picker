import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "seating.json");

const readData = async (): Promise<{
  seats: { [s: string]: number };
  counts: { [s: string]: number };
}> => {
  const file = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(file);
};

const writeData = async (data: any) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(bodyParser.json());
app.use((req, _res, next) => {
  const socketId = req.headers["x-socket-id"];
  if (socketId) {
    (req as any).socketId = socketId;
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", async (socket) => {
  console.log("user connected");
  const count = io.engine.clientsCount;
  io.emit("totalUsersOnline", count);

  socket.on("disconnect", function () {
    console.log("user disconnected");
    io.emit("totalUsersOnline", io.engine.clientsCount);
  });
  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
  io.engine.on("connection_error", (err) => {
    console.log("err.req", err.req);
    console.log("err.code", err.code);
    console.log("err.message", err.message);
    console.log("err.context", err.context);
  });
});

app.get("/api/seating", async (req, res) => {
  const data = await readData();
  res.json(data.seats);
});

function isObject(value: any) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

app.get("/api/seating/clear", async (req, res) => {
  const emptyData = {
    seats: {},
    counts: { door1: 0, door2: 0, door3: 0, door4: 0 },
  };
  await writeData(emptyData);
  res.json({ ok: true });
});

app.post("/api/seating", async (req, res) => {
  const { seats: nextSeats = {} } = req.body;
  const socketId = (req as any).socketId;

  const data = await readData();
  const prevSeats = data.seats ?? {};
  const counts = { ...(data.counts ?? {}) };

  for (const seatId of Object.keys(nextSeats)) {
    if (!prevSeats[seatId]) {
      const [door] = seatId.split(":");
      counts[door] = (counts[door] ?? 0) + 1;
    }
  }

  for (const seatId of Object.keys(prevSeats)) {
    if (!nextSeats[seatId]) {
      const [door] = seatId.split(":");
      counts[door] = Math.max(0, (counts[door] ?? 0) - 1);
    }
  }

  await writeData({ seats: nextSeats, counts });

  if (socketId) {
    io.except(socketId).emit("seatingUpdated", {
      seats: nextSeats,
      counts,
    });
  } else {
    io.emit("seatingUpdated", {
      seats: nextSeats,
      counts,
    });
  }

  res.json({ ok: true, counts });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
