const socket = io(window.location.origin);

const message = document.getElementById("message");
const name = document.getElementById("name");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const answer = document.getElementById("answer");

if (btn) {
  btn.addEventListener("click", () => {
    socket.emit("message", {
      message: message.value,
      name: name.value,
    });
    message.value = "";
    console.log(message, socket);
  });
}
if (message) {
  message.addEventListener("keypress", () => {
    socket.emit("typing", name.value);
  });
}

socket.on("message", (data) => {
  answer.innerHTML = "";
  output.innerHTML += "<p>" + data.name + ":" + data.message + "</p>";
});

socket.on("typing", (data) => {
  answer.innerHTML = "<p>" + data + " is typing a message...</p>";
});
