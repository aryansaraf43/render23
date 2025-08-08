const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// 👇 CORS allowed for Netlify OR any origin
const io = new Server(server, {
    cors: {
        origin: "*", // Use "*" for public, or list specific domains for security
        methods: ["GET", "POST"]
    }
});

app.use(cors()); // Enable CORS for HTTP requests (optional in most cases)

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data); // Broadcast message to all
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
