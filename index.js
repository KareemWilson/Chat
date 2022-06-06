const path = require("path");
const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { formatMessage } = require("./utils/message");
const {
  joinUser,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socket(server);

// set static folder*
app.use(express.static(path.join(__dirname, "public")));

// run user connection
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = joinUser(socket.id, username, room);

    socket.join(user.room);

    //welcome current user
    socket.emit("message", formatMessage("kareem Bot", "Welcome to chat!"));

    //broadcast when user connect
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("kareem Bot", `${user.username} joined to chat!`)
      );

    // Send users and room info
  });
  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
