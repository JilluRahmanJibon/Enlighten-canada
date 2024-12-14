// src/features/user/userSlice.js
import axiosInstance from "@/config/axiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

// Define API URL
const API_URL = "http://localhost:8080/api/users"; // Replace with your actual API base URL

// Async thunks for API calls

// Register a new user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.post(`${ API_URL }/register`, userData);
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.post("/users/login", userData);
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch logged-in user's details
export const fetchLoggedInUser = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (_, { rejectWithValue }) =>
  {
    try
    {
      const response = await axiosInstance.get("/users/verify/me"); // Replace with your actual endpoint for fetching the current user's details
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.get(`${ API_URL }`);
      return response.data;
    } catch (error)
    {
      console.error("Error fetching users: ", error.response.data);  // Log error response
      return rejectWithValue(error.response.data);
    }
  }
);


// Get user by ID
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.get(`${ API_URL }/${ userId }`);
      console.log("🚀 ~ response:", response.data)
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.put(`${ API_URL }/update/${ userId }`, userData);
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// Request password reset
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.post(`${ API_URL }/request-password-reset`, {
        email,
      });
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ resetToken, newPassword }, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.post(`${ API_URL }/reset-password`, {
        resetToken,
        newPassword,
      });
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],          // All users
    currentUser: null,  // The logged-in user
    onlineUsers: [],    // List of online users
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) =>
    {
      state.currentUser = null;
      Cookies.remove('token'); // Remove JWT token from cookies
      state.error = null;
      state.loading = false;
    },
    setOnlineUsers: (state, action) =>
    {
      state.onlineUsers = action.payload; // List of users currently online
    },
  },

  extraReducers: (builder) =>
  {
    builder
      .addCase(fetchLoggedInUser.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(requestPasswordReset.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) =>
      {
        state.loading = false;
        // Handle password reset success
      })
      .addCase(requestPasswordReset.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) =>
      {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) =>
      {
        state.loading = false;
        // Handle reset password success
      })
      .addCase(resetPassword.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
