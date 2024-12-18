const socketManager = require("../socketManager/socketManager");
const { ensureConversation,
  createMessage,
  getConversationHistory,
  getChatUserListForUser,
} = require("./../models/chatModel");

exports.getChatUserList = async (req, res) =>
{
  const { userId } = req.params;


  try
  {
    const users = await getChatUserListForUser(userId); // Await the result of the promise

    res.json(users);
  } catch (err)
  {
    console.error("Error fetching chat user list:", err); // Log the detailed error
    res.status(500).send({ error: "Failed to fetch chat user list" });
  }
};

exports.createMessage = async (req, res) =>
{
  const { sender_id, receiver_id, content } = req.body;

  try
  {
    // Generate a unique conversation_id based on sender and receiver IDs
    const conversation_id =
      sender_id < receiver_id
        ? `${ sender_id }_${ receiver_id }`
        : `${ receiver_id }_${ sender_id }`;

    // Step 1: Ensure the conversation exists
    await ensureConversation(conversation_id, sender_id, receiver_id);

    // Step 2: Insert the message
    const messageId = await createMessage(sender_id, receiver_id, content, conversation_id);

    // Step 3: Prepare the message data
    const messageData = {
      id: messageId,
      conversation_id,
      sender_id,
      receiver_id,
      content,
      created_at: new Date().toISOString(),
    };

    // Step 4: Send the message response
    res.json(messageData);

    // Step 5: Notify users via Socket.IO
    const io = socketManager.getIo();
    io.to(sender_id).emit("receiveMessage", messageData);
    io.to(receiver_id).emit("receiveMessage", messageData);
  } catch (error)
  {
    console.error("Error creating message:", error);
    res.status(500).send("Failed to create message");
  }
};



// Get Conversation History for Single Chat
exports.getConversationHistory = async (req, res) =>
{
  const { userId1, userId2 } = req.params;

  try
  {
    const conversation = await getConversationHistory(userId1, userId2);
    res.json(conversation);
  } catch (err)
  {
    res.status(500).send("Server error");
  }
};
