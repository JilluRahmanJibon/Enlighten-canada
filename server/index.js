// const app = require("./app");
// const server = require("./httpServer");
// const socketIo = require("socket.io");
// const socketManager = require("./socketManager/socketManager");
// const port = process.env.PORT;

// const io = socketIo(server, {
//   cors: {
//     origin: "*", // Allow frontend server
//     methods: [ "GET", "POST" ],
//   },
//   path: "/api/socket.io", // Specify the path for Socket.io
// });

// io.on('connection', (socket) =>
// {


//   // You can set up your event listeners here, for example:
//   socket.on('sendMessage', (data) =>
//   {
//     // Broadcast message or handle logic
//     socket.emit('receiveMessage', data);
//     console.log(data)
//   });

//   socket.on('disconnect', () =>
//   {
//     console.log('User disconnected');
//   });
// });

// app.use((req, res, next) =>
// {
//   req.io = io;
//   next();
// });
// socketManager.init(io);



// /* establish server port */
// server.listen(port, () =>
// {
//   console.log(`Server is running on port ${ port }.`);
// });
const app = require("./app");
const server = require("./httpServer");
const socketIo = require("socket.io");
const socketManager = require("./socketManager/socketManager");
const port = process.env.PORT || 3000;

const io = socketIo(server, {
  cors: {
    origin: "*", // Allow frontend server
    methods: [ "GET", "POST" ],
  },
  path: "/api/socket.io", // Specify the path for Socket.IO
});


// io.on("connection", (socket) =>
// {


//   // Log when the user joins the room
//   socket.on("joinRoom", (room) =>
//   {
//     console.log(`Socket ${ socket.id } joined room: ${ room }`);
//     socket.join(room);
//   });

//   // When a message is received, log it
//   socket.on("sendMessage", (message) =>
//   {
//     const room = [ message.sender_id, message.receiver_id ].sort().join("-");
//     console.log("Sending message to room:", room); // Log the room for debugging
//     console.log("Message content:", message);

//     // Broadcast the message to the room
//     io.to(room).emit("receiveMessage", message);

//     // Optionally send an acknowledgment back to the client
//     socket.emit("messageSent", { success: true });
//   });


//   // Log when 'receiveMessage' event is emitted
//   socket.on("receiveMessage", (message) =>
//   {
//     console.log("Message received:", message); // This helps track the messages
//   });

//   // Other socket events...
// });

io.on("connection", (socket) =>
{

  // Join a specific room
  socket.on("joinRoom", (room) =>
  {
    socket.join(room);
  });

  // Handle sending messages
  socket.on("sendMessage", (message) =>
  {
    const room = [ message.sender_id, message.receiver_id ].sort().join("-");

    io.to(room).emit("receiveMessage", message);
    socket.emit("messageSent", { success: true });
  });

  socket.on("callUser", ({ signal, receiver, sender_id }) =>
  {

    const room = [ sender_id, receiver ].sort().join("-");
 
 
    const receiverSocket = io.sockets.adapter.rooms.get(room);
    if (receiverSocket && receiverSocket.size > 0)
    {
      io.to(room).emit("incomingCall", { signal, sender_id });
    } else
    {
      console.log("Receiver is not online or not connected.");
      socket.emit("receiverNotOnline", { success: false, message: "Receiver is not online" });
    }

    // Optionally, handle caller's response
    socket.emit("callInitiated", { success: true });
  });

  socket.on("acceptCall", ({ sender_id, receiver_id }) =>
  {
    const room = [ sender_id, receiver_id ].sort().join("-");
    console.log(`User ${ receiver_id } accepted the call from User ${ sender_id }`);

    // Notify the caller that the call was accepted
    io.to(room).emit("callAccepted", {
      sender_id,
      receiver_id,
      timestamp: new Date().toISOString(),
    });
  });
  // Handle rejecting the call
  socket.on("rejectCall", ({ sender_id, receiver_id }) =>
  {
    const room = [ sender_id, receiver_id ].sort().join("-");
    console.log(`User ${ receiver_id } rejected the call from User ${ sender_id }`);

    // Notify the caller that the call was rejected
    io.to(room).emit("callRejected", {
      sender_id,
      receiver_id,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle ending a call
  socket.on("endCall", ({ sender_id, receiver_id }) =>
  {
    const room = [ sender_id, receiver_id ].sort().join("-");
    console.log(`Call ended between ${ sender_id } and ${ receiver_id }`);

    // Notify both users that the call has ended
    io.to(room).emit("callEnded", {
      sender_id,
      receiver_id,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle disconnection
  socket.on("disconnect", () =>
  {
    console.log(`User disconnected: ${ socket.id }`);
  });
});


app.use((req, res, next) =>
{
  req.io = io;
  next();
});

// Initialize custom socket managers
socketManager.init(io);

// Start the server
server.listen(port, () =>
{
  console.log(`Server is running on port ${ port }.`);
});
