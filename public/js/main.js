const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const socket = io();

//get username & roomName from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
// Join chatroom
socket.emit("joinRoom", { username, room });

//get room and users from server

socket.on("roomUsers", ({ room, users }) => {
  roomName.innerHTML = room;
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = user.username;
    userList.appendChild(li);
  });
});

// Message from server

socket.on("message", (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

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
