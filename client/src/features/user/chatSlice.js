import { API_URL, SOCKET_API_URL } from '@/utils/BaseUrl';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import io from 'socket.io-client';


let socket = io(`${ SOCKET_API_URL }`, {
  path: "/api/socket.io",
  autoConnect: true,
});

// Update with your server URL
// ========================== Chat Async Thunks ==========================

// Fetch chat users list for a specific user
export const fetchChatUserList = createAsyncThunk(
  'chat/fetchChatUserList',
  async (userId, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.get(`${ API_URL }/chat/users/${ userId }`);

      return response.data;
    } catch (error)
    {
      console.log("🚀 ~ error:", error)
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch conversation between two users
export const fetchConversationHistory = createAsyncThunk(
  'chat/fetchConversationHistory',
  async ({ userId1, userId2 }, { rejectWithValue }) =>
  {
    try
    {
      const response = await axios.get(`${ API_URL }/chat/conversation/${ userId1 }/${ userId2 }`);
      return response.data;
    } catch (error)
    {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new message
// export const createNewMessage = createAsyncThunk(
//   'chat/createNewMessage',
//   async (messageData, { rejectWithValue }) =>
//   {
//     try
//     {
//       const response = await axios.post(`${ API_URL }/chat/message`, messageData);
//       socket.emit('sendMessage', messageData); // Emit message to Socket.io server
//       return response.data;
//     } catch (error)
//     {
//       return rejectWithValue(error.response.data);
//     }
//   }
// )
// 
// ;

export const createNewMessage = createAsyncThunk(
  'chat/createNewMessage',
  async (messageData, { rejectWithValue }) =>
  {
    try
    {
      // Make the API request to save the message to the backend
      const response = await axios.post(`${ API_URL }/chat/message`, messageData);

      // Emit the message to the Socket.IO server for real-time updates
      if (socket)
      {
        socket.emit('sendMessage', messageData, (acknowledgment) =>
        {
          // You can handle the acknowledgment here if necessary
          console.log('Message sent acknowledgment:', acknowledgment);
        });
      } else
      {
        console.error('Socket connection is not available');
      }

      // Return the response data from the backend
      return response.data;
    } catch (error)
    {
      console.error('Error sending message:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ========================== Chat Slice ==========================

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    users: [], // List of chat users
    conversation: [], // Conversation history between two users
    selectedUser: null, // The currently selected chat user
    status: 'idle', // Loading status for async actions
    error: null, // Error state for handling errors
  },
  reducers: {
    // Select a user to chat with
    selectChatUser: (state, action) =>
    {
      state.selectedUser = action.payload;
      state.conversation = []; // Reset conversation when a new user is selected
    },
    // Add new message to the conversation
    addNewMessageToConversation: (state, action) =>
    {
      state.conversation.push(action.payload);
    },
    // Add incoming message to the chat
    addIncomingMessage: (state, action) =>
    {
      const incomingMessage = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === incomingMessage.senderId);

      // If the message is from the selected user, add it to the conversation
      if (incomingMessage.senderId === state.selectedUser.id)
      {
        state.conversation.push(incomingMessage);
      }

      // Move the sender's chat to the top of the chat list
      if (userIndex !== -1)
      {
        const [ user ] = state.users.splice(userIndex, 1);
        state.users.unshift(user);
      }
    },
  },
  extraReducers: (builder) =>
  {
    builder
      // Fetching chat user list
      .addCase(fetchChatUserList.pending, (state) =>
      {
        state.status = 'loading';
      })
      .addCase(fetchChatUserList.fulfilled, (state, action) =>
      {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchChatUserList.rejected, (state, action) =>
      {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetching conversation history between users
      .addCase(fetchConversationHistory.pending, (state) =>
      {
        state.status = 'loading';
      })
      .addCase(fetchConversationHistory.fulfilled, (state, action) =>
      {
        state.status = 'succeeded';
        state.conversation = action.payload;
      })
      .addCase(fetchConversationHistory.rejected, (state, action) =>
      {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Sending a new message
      .addCase(createNewMessage.fulfilled, (state, action) =>
      {
        state.conversation.push(action.payload);
      })
      .addCase(createNewMessage.rejected, (state, action) =>
      {
        state.error = action.payload;
      });
  },
});

export const { selectChatUser, addNewMessageToConversation, addIncomingMessage } = chatSlice.actions;
export default chatSlice.reducer;

// Listen for real-time incoming messages
socket.on('messageReceived', (message) =>
{
  store.dispatch(addIncomingMessage(message));
});
