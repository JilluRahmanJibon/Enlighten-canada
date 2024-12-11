const app = require("./app");
const server = require("./httpServer");
const socketIo = require("socket.io");
const socketManager = require("./socketManager/socketManager");
const port = process.env.PORT;

const io = socketIo(server, {
  cors: {
    origin: "*", // Allow frontend server
    methods: ["GET", "POST"],
  },
  path: "/api/socket.io", // Specify the path for Socket.io
});


app.use((req, res, next) => {
  req.io = io;
  next();
});
socketManager.init(io);



/* establish server port */
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
