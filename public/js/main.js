const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");

const socket = io();

//get username & roomName from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);

// Join chatroom
socket.emit("joinRoom", () => {
  console.log("joined in browser console");
});

// Message from server

socket.on("message", (message) => {
  console.log(message);
  const div = document.createElement("div");
  div.classList.add("message");
  const name = document.createElement("p");

  const para = document.createElement("p");
  para.classList.add("messageText");
  para.innerText = message;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
console.log(location);

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get the message from input

  let msg = e.target.elements.msg.value;

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();

  //send message to server
  socket.emit("chatMessage", msg);
});