// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import chatReducer from './features/user/chatSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

export default store;
