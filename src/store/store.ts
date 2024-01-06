import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import chatroomReducer from './slices/ChatroomSlice';
import currentChatReducer from './slices/CurrentChatSlice';
import callInfoReducer from './slices/CallInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatrooms: chatroomReducer,
    currentChat: currentChatReducer,
    callInfo: callInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch