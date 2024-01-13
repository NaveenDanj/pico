import { Avatar } from '@mui/material';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setSelectedChat, setMessages } from 'src/store/slices/CurrentChatSlice';
import { ChatRoomDTO } from 'src/types/dto';
import ChatMainService from 'src/services/Chat/ChatMainService';

interface ChatNameItemDto {
    chatItem: ChatRoomDTO
}


function ChatNameItem({ chatItem }: ChatNameItemDto) {

  const dispatch = useDispatch();

  const handleSelectChatroom = async () => {
    const currentChat: ChatRoomDTO = {
      uid: chatItem.uid,
      contats: chatItem.contats,
      lastMessage: chatItem.lastMessage,
      lastTimeStamp: chatItem.lastTimeStamp
    };
    dispatch(setSelectedChat(currentChat));
    // console.log(new Date(chatItem.lastTimeStamp.seconds * 1000))
    const messages = await ChatMainService.loadChatroomChats(chatItem.uid);
    dispatch(setMessages(messages));
    console.log(chatItem);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDateDisplay = (date:any) => {
    const d = moment(new Date(date.seconds * 1000));
    const now = moment();
  
    const diff = now.diff(d, 'days');
    
    if (diff === 0) {
      return d.format('h:mmA');
    } else if (diff === 1) {
      return 'Yesterday';
    } else if (now.year() === d.year()) {
      return d.format('MMM D');
    } else {
      return d.format('YYYY/MM/DD');
    }
  };
  const trimAndEllipsis = (inputString:string, maxLength:number) => {
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength - 3) + '...';
    } else {
      return inputString;
    }
  };


  return (
    <div onClick={handleSelectChatroom} className='tw-w-full tw-flex tw-p-2 tw-justify-between tw-cursor-pointer'>

      <div className='tw-flex tw-gap-4 tw-w-full'>

        <Avatar src={chatItem.contats.dp} />

        <div className='tw-flex tw-flex-col tw-w-full'>
          <div className='tw-flex tw-w-full tw-justify-between'>
            <label className='tw-text-sm tw-my-auto tw-font-medium'>{chatItem.contats.contactName}</label>
            <label className='tw-text-[10px] tw-my-auto tw-text-[#A3A3A3] tw-font-thin'>
              {chatItem.lastTimeStamp && formatDateDisplay(chatItem.lastTimeStamp)}
            </label>

          </div>
          <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>
            {chatItem.lastMessage && trimAndEllipsis(chatItem.lastMessage.message , 50)}
          </label>
        </div>

      </div>

    </div>
  );
}

export default ChatNameItem;