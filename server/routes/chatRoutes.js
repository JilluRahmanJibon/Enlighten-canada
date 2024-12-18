const express = require('express');
const router = express.Router();
const chatController = require('./../controllers/chatController');

// Route to get chat user list
router.get('/users/:userId', chatController.getChatUserList);

// Route to create a new message
router.post('/message', chatController.createMessage);

// Route to get conversation history between two users
router.get('/conversation/:userId1/:userId2', chatController.getConversationHistory);   

module.exports = router;
