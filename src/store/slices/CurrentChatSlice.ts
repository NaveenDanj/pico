import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatContact, Message } from 'src/types/dto';

export interface currentChat {
    messages: Message[];
    selectedChat : ChatContact | null;
    lastMessage : Message | null;
    lastMessageTimeStamp: string;
}

const initialState: currentChat = {
    messages: [],
    selectedChat: null,
    lastMessage: null,
    lastMessageTimeStamp: ''
}

export const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {

    setMessages: (state , action: PayloadAction<Message[]>) => {
        state.messages = action.payload
    },

    addMessage: (state , action: PayloadAction<Message>) => {
        state.messages.push(action.payload)
    },

    setSelectedChat: (state , action: PayloadAction<ChatContact>) => {
        state.selectedChat = action.payload
    },

    setLastMessage: (state , action: PayloadAction<Message>) => {
        state.lastMessage = action.payload
    },

    setLastMessageTimeStamp: (state , action: PayloadAction<string>) => {
        state.lastMessageTimeStamp = action.payload
    },

  },
})

export const { addMessage , setSelectedChat , setLastMessage , setLastMessageTimeStamp} = currentChatSlice.actions
export default currentChatSlice.reducer