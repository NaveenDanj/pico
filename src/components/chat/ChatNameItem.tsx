import { Avatar } from '@mui/material'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setSelectedChat } from 'src/store/slices/CurrentChatSlice'
import { ChatRoomDTO } from 'src/types/dto'


interface ChatNameItemDto {
    chatItem: ChatRoomDTO
}


function ChatNameItem({ chatItem }: ChatNameItemDto) {

    const dispatch = useDispatch()

    const handleSelectChatroom = () => {
        const currentChat: ChatRoomDTO = {
            uid: chatItem.uid,
            contats: chatItem.contats,
            lastMessage: chatItem.lastMessage,
            lastTimeStamp: chatItem.lastTimeStamp
        }
        dispatch(setSelectedChat(currentChat))
        // console.log(new Date(chatItem.lastTimeStamp.seconds * 1000))
    }


    return (
        <div onClick={handleSelectChatroom} className='tw-w-full tw-flex tw-p-2 tw-justify-between tw-cursor-pointer'>

            <div className='tw-flex tw-gap-4 tw-w-full'>

                <Avatar src={chatItem.contats.dp} />

                <div className='tw-flex tw-flex-col tw-w-full'>
                    <div className='tw-flex tw-w-full tw-justify-between'>
                        <label className='tw-text-sm tw-my-auto tw-font-medium'>{chatItem.contats.contactName}</label>
                        <label className='tw-text-[10px] tw-my-auto tw-text-[#A3A3A3] tw-font-thin'>
                            {chatItem.lastTimeStamp && moment(new Date(chatItem.lastTimeStamp * 1000)).format('h:mm A')}
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