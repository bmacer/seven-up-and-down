const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const {
  addUser,
  addUserToSeven,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./users");
const path = require("path");
const { SocketAddress } = require("net");

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on("connection", (socket) => {
  socket.emit("testInbound", { message: "hellooooooooo" });

  socket.on("join", (payload, callback) => {
    let numberOfUsersInRoom = getUsersInRoom(payload.room).length;
    console.log("joining room....");
    const { error, newUser } = addUser({
      id: socket.id,
      // name: numberOfUsersInRoom===0 ? 'Player 1' : 'Player 2',
      name: payload.name,
      room: payload.room,
    });

    if (error) return callback(error);

    socket.join(newUser.room);

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });
    socket.emit("currentUserData", { name: newUser.name });
    callback();
  });

  socket.on("testing", (message) => {
    console.log(message);
    console.log("!!! message?");
  });

  socket.on("initGameState", (gameState) => {
    console.log("server: initGameState");
    // console.log(gameState);
    const user = getUser(socket.id);
    // console.log(socket);
    // console.log(user)
    if (user) io.to(user.room).emit("initGameState", gameState);
  });

  socket.on("updateGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("updateGameState", gameState);
  });

  socket.on("sendMessage", (payload, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: payload.message,
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user)
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
  });

  socket.on("initalSevenGameState", (init) => {
    console.log("yes!");
    // console.log(init);
  });
});

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
