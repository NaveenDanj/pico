import EmailIcon from '@mui/icons-material/Email';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useState , KeyboardEvent } from 'react';
import { ChatRoomDTO, Message } from 'src/types/dto';
import ChatGlobalInboxService from 'src/services/Chat/ChatGlobalInboxService';

interface ChatInputSectionDTO {
    selectedChat: ChatRoomDTO | null 
}


function ChatInputSection({ selectedChat }: ChatInputSectionDTO) {

  const [messageText, setMessageText] = useState('');


  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {

    if (!selectedChat) {
      return;
    }

    if (event.key === 'Enter') {
      setMessageText('');
      const msg = messageText;
      const messageObject: Message = {
        message: msg,
        chatroomId: selectedChat.uid,
        attachments: [],
        timestamp: new Date(),
        isReplied: false,
        repliedTo: null
      };
      const res = await ChatGlobalInboxService.sendToGlobalIndex(messageObject, selectedChat.contats.userUID, selectedChat.uid);
      console.log(res);
    }
  };

  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,0.2)' }} className="tw-w-full tw-p-3 tw-flex tw-bg-[#272727]">

      <div className="tw-w-[45px] tw-p-1 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
        <EmailIcon sx={{ width: 16 }} />
      </div>

      <div className="tw-w-[45px] tw-p-1 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
        <AttachFileIcon sx={{ width: 16 }} />
      </div>


      <div className="tw-w-full">
        <input value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder="Type a message" className=' tw-w-full tw-ml-2 tw-p-1 tw-text-xs' />
      </div>

      <div className="tw-w-[45px] tw-p-1 tw-flex tw-justify-center tw-ml-2 tw-rounded-md  hover:tw-bg-[#333333]">
        <SendIcon sx={{ width: 16 }} />
      </div>

    </div>
  );
}

export default ChatInputSection;