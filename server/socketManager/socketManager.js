let io;

module.exports = {
  init: (ioInstance) => {
    if (!io) {
      io = ioInstance;
      io.on("connection", async (socket) => {
        // console.log("Client connected", socket.id);
        socket.on("callUser", (data) => {
          io.to(data.receiver).emit("callUser", {
            signal: data.signal,
            from: data.from,
          });
        });
      
        socket.on("answerCall", (data) => {
          io.to(data.to).emit("callAccepted", data.signal);
        });
        socket.on("disconnect", async (reason) => {
          console.log("Client disconnected", socket.id, "Reason:", reason);
          // Optional: Clean up tab entries if required
        });

        // Additional socket event handling
      });
    }
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
