import { Avatar } from '@mui/material'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setSelectedChat, setMessages } from 'src/store/slices/CurrentChatSlice'
import { ChatRoomDTO } from 'src/types/dto'
import ChatMainService from 'src/services/Chat/ChatMainService'

interface ChatNameItemDto {
    chatItem: ChatRoomDTO
}


function ChatNameItem({ chatItem }: ChatNameItemDto) {

    const dispatch = useDispatch()

    const handleSelectChatroom = async () => {
        const currentChat: ChatRoomDTO = {
            uid: chatItem.uid,
            contats: chatItem.contats,
            lastMessage: chatItem.lastMessage,
            lastTimeStamp: chatItem.lastTimeStamp
        }
        dispatch(setSelectedChat(currentChat))
        // console.log(new Date(chatItem.lastTimeStamp.seconds * 1000))
        const messages = await ChatMainService.loadChatroomChats(chatItem.uid)
        console.log(messages)
        dispatch(setMessages(messages))
    }

    const formatDate = (date: Date | null) => {
        if (!date) {
            return ""
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return moment(new Date(date * 1000)).format('h:mm A')

    }


    return (
        <div onClick={handleSelectChatroom} className='tw-w-full tw-flex tw-p-2 tw-justify-between tw-cursor-pointer'>

            <div className='tw-flex tw-gap-4 tw-w-full'>

                <Avatar src={chatItem.contats.dp} />

                <div className='tw-flex tw-flex-col tw-w-full'>
                    <div className='tw-flex tw-w-full tw-justify-between'>
                        <label className='tw-text-sm tw-my-auto tw-font-medium'>{chatItem.contats.contactName}</label>
                        <label className='tw-text-[10px] tw-my-auto tw-text-[#A3A3A3] tw-font-thin'>
                            {chatItem.lastTimeStamp && formatDate(chatItem.lastTimeStamp)}
                        </label>

                    </div>
                    <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>
                        {chatItem.lastMessage && chatItem.lastMessage.message}
                    </label>
                </div>

            </div>

        </div>
    )
}

export default ChatNameItem