const socketManager = require("../socketManager/socketManager");
const {
  createMessage,
  getConversationHistory,
  getChatUserListForUser,
} = require("./../models/chatModel");

exports.getChatUserList = async (req, res) => {
  const { userId } = req.params;
 

  try {
    const users = await getChatUserListForUser(userId); // Await the result of the promise

    res.json(users);
  } catch (err) {
    console.error("Error fetching chat user list:", err); // Log the detailed error
    res.status(500).send({ error: "Failed to fetch chat user list" });
  }
};
exports.createMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    // Save the message to the database
    const messageId = await createMessage(senderId, receiverId, message);

    // Prepare the message data (with timestamp and ID)
    const messageData = {
      id: messageId,
      senderId,
      receiverId,
      message,
      timestamp: new Date().toISOString(),
    };

    // Send the message back to the sender for confirmation
    res.json(messageData);

    // Emit the message to both sender and receiver rooms using Socket.IO
    const io = socketManager.getIo();

    io.to(senderId).emit("receiveMessage", messageData);
    io.to(receiverId).emit("receiveMessage", messageData); // Emit to receiver
  } catch (err) {
    console.error("Error creating message:", err);
    res.status(500).send("Failed to create message");
  }
};

// Get Conversation History for Single Chat
exports.getConversationHistory = async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    const conversation = await getConversationHistory(userId1, userId2);
    res.json(conversation);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
