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

// Create a new message
const createMessage = async (sender_id, receiver_id, message) =>
{
  try
  {
    const [ result ] = await pool.promise().query(
      "INSERT INTO Messages (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, NOW())",
      [ sender_id, receiver_id, message ]
    );
    return result.insertId; // Return the ID of the newly inserted message
  } catch (error)
  {
    console.error("Error inserting message:", error); // Log the actual error
    throw error;
  }
};

// Get conversation history between two users
const getConversationHistory = async (userId1, userId2) =>
{
  const [ rows ] = await pool.promise().query(
    `SELECT * FROM Messages
     WHERE (sender_id = ? AND receiver_id = ?)
        OR (sender_id = ? AND receiver_id = ?)
     ORDER BY timestamp ASC`,
    [ userId1, userId2, userId2, userId1 ]
  );
  return rows;
};

module.exports = {
  getChatUserListForUser,
  createMessage,
  getConversationHistory,
};
 