const path = require("path");
const express = require("express");
const socket = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socket(server);

// set static folder*
app.use(express.static(path.join(__dirname, "public")));

// run user connection
io.on("connection", (socket) => {
  console.log("Made socket connection", socket.id);

  socket.on("joinRoom", () => {
    console.log("joined");
    //welcome current user
    socket.emit("message", "Welcome to my chat!");

    socket.on("chatMessage", (msg) => {
      console.log(msg);
      io.emit("message", msg);
    });
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
