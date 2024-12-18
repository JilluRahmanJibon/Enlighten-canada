const userService = require("../services/userService");
 
const userController = {
  // Register a new user
  register: async (req, res, next) => {
    try {
      await userService.registerUser(req, res);
    } catch (error) {
      next(error);
    }
  },

  // Login user
  login: async (req, res, next) => {
    try {
      await userService.loginUser(req, res);
    } catch (error) {
      next(error);
    }
  },

  // Update user
  update: async (req, res, next) => {
    try {
      await userService.updateUser(req, res);
    } catch (error) {
      next(error);
    }
  },

  // Get all users
  getAllUsers: async (req, res, next) => {
    try {
      await userService.getAllUsers(req, res);
    } catch (error) {
      next(error);
    }
  },

  // Get user by ID
  getUserById: async (req, res, next) => {
    try {
      await userService.getUserById(req, res);
    } catch (error) {
      next(error);
    }
  },

  // Request password reset
  requestPasswordReset: async (req, res, next) => {
    try {
      await userService.requestPasswordReset(req, res);
    } catch (error) {
      next(error);
    }
  },

  // getLoggedInUser function to fetch user by email
  getLoggedInUser: async (req, res) => {
    try {
      await userService.getLoggedInUser(req, res);
    } catch (error) {
      next(error);
    }
  },

  // Reset password using token
  resetPassword: async (req, res, next) => {
    try {
      await userService.resetPassword(req, res);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
