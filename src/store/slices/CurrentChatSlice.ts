import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatRoomDTO, Message } from 'src/types/dto';

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

    setMessages: (state , action: PayloadAction<Message[]>) => {
        state.messages = action.payload
    },

    addMessage: (state , action: PayloadAction<Message>) => {
        state.messages.push(action.payload)
    },

    setSelectedChat: (state , action: PayloadAction<ChatRoomDTO>) => {
        state.selectedChat = action.payload
    },

  },
})

export const { setMessages , addMessage , setSelectedChat } = currentChatSlice.actions
export default currentChatSlice.reducer