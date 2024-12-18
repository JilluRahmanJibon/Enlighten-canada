const { pool } = require("../db/db");

// Get chat user list for a single user
const getChatUserListForUser = async (userId) =>
{

  try
  {
    // Use pool.promise().query() to ensure it's using the promise-based interface
    const [ rows ] = await pool.promise().query(
      `SELECT DISTINCT u.id, u.username, u.email
       FROM users u
       JOIN messages m ON (u.id = m.sender_id OR u.id = m.receiver_id)
       WHERE (m.sender_id = ? OR m.receiver_id = ?)
       AND u.id != ?`,
      [ userId, userId, userId ]  // Use parameterized queries to prevent SQL injection
    );
    return rows;
  } catch (error)
  {
    console.error("Error fetching chat user list:", error);
    throw error;
  }
};

const ensureConversation = async (conversation_id, user1_id, user2_id) =>
{
  try
  {
    // Check if the conversation exists
    const [ rows ] = await pool.promise().query(
      "SELECT id FROM conversations WHERE id = ?",
      [ conversation_id ]
    );

    // If the conversation does not exist, create it
    if (rows.length === 0)
    {
      await pool.promise().query(
        "INSERT INTO conversations (id, user1_id, user2_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
        [ conversation_id, user1_id, user2_id ]
      );
    }
  } catch (error)
  {
    console.error("Error ensuring conversation:", error);
    throw error;
  }
};



// Create a new message
const createMessage = async (sender_id, receiver_id, content, conversation_id) =>
{
  try
  {
    // Insert the message into the database
    const [ result ] = await pool.promise().query(
      "INSERT INTO messages (conversation_id, sender_id, receiver_id, content, created_at) VALUES (?, ?, ?, ?, NOW())",
      [ conversation_id, sender_id, receiver_id, content ]
    );

    // Return the ID of the newly inserted message
    return result.insertId;
  } catch (error)
  {
    console.error("Error inserting message:", error);
    throw error;
  }
};


 
// Get conversation history between two users
const getConversationHistory = async (userId1, userId2) =>
{
  console.log(userId1, userId2)
  try
  {

    const [ rows ] = await pool.promise().query(
      `SELECT * FROM Messages
       WHERE (sender_id = ? AND receiver_id = ?)
          OR (sender_id = ? AND receiver_id = ?)
       ORDER BY created_at ASC`,
      [ userId1, userId2, userId2, userId1 ]
    );
    return rows; // Return the conversation history
  } catch (error)
  {
    console.error('Error fetching conversation history:', error);
    throw error;
  }
};


module.exports = {
  getChatUserListForUser, ensureConversation,
  createMessage,
  getConversationHistory,
};
