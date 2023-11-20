import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatRoomDTO, GlobalInbox, Message } from 'src/types/dto';

export interface currentChat {
    messages: Message[];
    selectedChat : ChatRoomDTO | null;
}

const initialState: currentChat = {
    messages: [],
    selectedChat: null,
}

export const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {

    setMessages: (state , action: PayloadAction<GlobalInbox[]>) => {
        state.messages = []
        for(let i = 0; i < action.payload.length; i++){
            const data = action.payload[i];
            const msg:Message = {
                message: data.message.message,
                chatroomId: data.chatroomId,
                attachments: data.message.attachments,
                timestamp:  data.message.timestamp,
                isReplied: data.message.isReplied,
                repliedTo: data.message.repliedTo,
                sender: data.fromUser
            }
            state.messages.push(msg)
        }
    },

    addMessage: (state , action: PayloadAction<Message>) => {
        if(state.selectedChat){
            if(state.selectedChat.uid == action.payload.chatroomId){
                state.messages.push(action.payload)
            }
        }
    },

    setSelectedChat: (state , action: PayloadAction<ChatRoomDTO>) => {
        state.selectedChat = action.payload
    },

  },
})

export const { setMessages , addMessage , setSelectedChat } = currentChatSlice.actions
export default currentChatSlice.reducer