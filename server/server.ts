import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'seating.json');

const readData = async (): Promise<{seats: {[s: string]: number}, counts: {[s: string]: number}} > => {
  const file = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(file);
};

const writeData = async (data: any) => {
  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(data, null, 2),
    'utf-8'
  );
};

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
app.use(express.json());

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

app.get("/api/seating", async (req, res) => {
  const data = await readData();
  res.json(data.seats);
});

function isObject(value: any) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

app.get("/api/seating/clear", async (req, res) => {
  const emptyData = {seats: {}, counts: { door1: 0, door2: 0, door3: 0, door4: 0 }};
  await writeData(emptyData);
  res.json({ ok: true });
});

app.get("/api/seating/taken-seats", async (req, res) => {
  const data = await readData();
  res.json({ takenSeats: data.counts });
});

app.post("/api/seating", async (req, res) => {
  const { seats: nextSeats = {} } = req.body;

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

  await writeData({
    seats: nextSeats,
    counts,
  });

  io.emit("seatCountsUpdated", counts);

  res.json({ ok: true, counts });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
