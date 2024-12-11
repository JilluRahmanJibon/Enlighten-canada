const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Define routes
router.post('/register', userController.register); // Register user
router.post('/login', userController.login); // Login user
router.put('/update/:id', userController.update); // Update user
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.get('/verify/me', verifyToken, userController.getLoggedInUser);

// Request password reset
router.post('/request-password-reset', userController.requestPasswordReset);

// Reset password
router.post('/reset-password', userController.resetPassword);

module.exports = router;
