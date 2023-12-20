import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import chatroomReducer from './slices/ChatroomSlice';
import currentChatReducer from './slices/CurrentChatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatrooms: chatroomReducer,
    currentChat: currentChatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch