import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlice'
import chatroomReducer from './slices/ChatroomSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatrooms: chatroomReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch