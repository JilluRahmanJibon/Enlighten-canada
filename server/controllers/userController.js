const userService = require("../services/userService");

// const userController = {
//   // Register a new user
//   register: (req, res, next) => {
//     try {
//       const { name, email, password } = req.body;
//       if (!name || !email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//       }

//       const newUser = { name, email, password };

//       userService.registerUser(newUser, (err, result) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error registering user', error: err });
//         }
//         res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

//   // Login user
//   login: (req, res, next) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//       }

//       userService.loginUser(email, password, (err, user) => {
//         if (err) return res.status(500).json({ message: 'Error logging in', error: err });
//         if (!user) return res.status(401).json({ message: 'Invalid credentials' });
//         res.status(200).json({ message: 'Login successful', user });
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

//   // Update user
//   update: (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { name, email, password } = req.body;
//       if (!name && !email && !password) {
//         return res.status(400).json({ message: 'No fields to update' });
//       }

//       const updatedData = { name, email, password };

//       userService.updateUser(id, updatedData, (err, result) => {
//         if (err) return res.status(500).json({ message: 'Error updating user', error: err });
//         res.status(200).json({ message: 'User updated successfully' });
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

//   // Get all users
//   getAllUsers: (req, res, next) => {
//     try {
//       userService.getAllUsers((err, users) => {
//         if (err) return res.status(500).json({ message: 'Error retrieving users', error: err });
//         res.status(200).json(users);
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

//   // Get user by ID
//   getUserById: (req, res, next) => {
//     try {
//       const { id } = req.params;
//       userService.getUserById(id, (err, user) => {
//         if (err) return res.status(500).json({ message: 'Error retrieving user', error: err });
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.status(200).json(user);
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// };

// module.exports = userController;

const userController = {
  // Register a new user
  register: async (req, res, next) => {
    console.log("🚀 ~ register: ~ req:", req)
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
