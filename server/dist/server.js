"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const PORT = process.env.PORT || 8000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
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
