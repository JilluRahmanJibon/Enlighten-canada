let io;

module.exports = {
  init: (ioInstance) =>
  {
    if (!io)
    {
      io = ioInstance;
      io.on("connection", (socket) =>
      {
 
        socket.on("callUser", (data) =>
        {
          io.to(data.receiver).emit("callUser", {
            signal: data.signal,
            from: data.from,
          });
        });

        socket.on("answerCall", (data) =>
        {
          io.to(data.to).emit("callAccepted", data.signal);
        });

        socket.on("disconnect", (reason) =>
        {
          console.log("Client disconnected:", socket.id, "Reason:", reason);
        });
      });
    }
  },
  getIo: () =>
  {
    if (!io)
    {
      throw new Error("Socket.IO not initialized");
    }
    return io;
  },
};
