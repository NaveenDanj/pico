import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatRoomDTO, Message } from 'src/types/dto';

export interface Chatroom {
    chatrooms: ChatRoomDTO[]
}

export interface UpdateLastMessageDTO {
    chatroomId: string;
    lastMessage: Message;
    lastTimeStamp: Date;
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

    updateLastMessageData: (state , action: PayloadAction<UpdateLastMessageDTO> ) =>{
        for(let i = 0; i < state.chatrooms.length; i++){
            if(action.payload.chatroomId == state.chatrooms[i].uid){
                state.chatrooms[i].lastMessage = action.payload.lastMessage
                state.chatrooms[i].lastTimeStamp = action.payload.lastTimeStamp
            }
        }
    }

  },
})

export const { setChatrooms } = chatroomSlice.actions
export default chatroomSlice.reducer