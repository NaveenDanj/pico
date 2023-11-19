import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatRoomDTO } from 'src/types/dto';

export interface Chatroom {
    chatrooms: ChatRoomDTO[]
}

const initialState: Chatroom = {
    chatrooms: []
}

export const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    
    setChatrooms: (state , action: PayloadAction<ChatRoomDTO[]>) => {
        state.chatrooms = action.payload
    },

  },
})

export const { setChatrooms } = chatroomSlice.actions
export default chatroomSlice.reducer