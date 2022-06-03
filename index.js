const express = require("express");
const socket = require("socket.io");
const app = express();

app.use(express.static("public"));
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

const io = socket(server);
io.on("connection", (socket) => {
  console.log("Made socket connection", socket.id);
  // Receives message from the client and sends (emit) it to the client.
  socket.on("message", (data) => {
    io.sockets.emit("message", data);
  });
  // Handles typing event and broadcasts it to all the clients except of sender.
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
