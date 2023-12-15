import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import ChatSection from 'src/components/chatsection/ChatSection';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
// import ContactDetailsDialog from "../dialogs/ContactDetailsDialog";
import { KeyboardEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { Message } from 'src/types/dto';
import ChatGlobalInboxService from 'src/services/Chat/ChatGlobalInboxService';
import ContactDetailsSingleDialog from '../dialogs/ContactDetailsDialogSingle';


function ChatView() {

  const selectedChat = useSelector((state: RootState) => state.currentChat.selectedChat);
  // const dispatch = useDispatch()

  const [messageText, setMessageText] = useState('');

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {

    if (!selectedChat) {
      return;
    }

    if (event.key === 'Enter') {
      // console.log('Enter key pressed', messageText);
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
    <>
      {selectedChat && (

        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.2)' }} className="tw-bg-[#272727] tw-w-full tw-py-2 tw-px-3 tw-flex tw-justify-between">

          {/* <ContactDetailsDialog selectedChat={selectedChat} /> */}

          <ContactDetailsSingleDialog selectedChat={selectedChat} />

          <div className="tw-ml-2 tw-flex tw-gap-2">

            <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
              <EmailIcon sx={{ width: 16 }} />
            </div>

            <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
              <SearchIcon sx={{ width: 16 }} />
            </div>

          </div>

        </div>
      )}

      <div style={{ height: 'calc(100vh - 115px)', backgroundImage: 'url(./pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '250px 250px' }} className="tw-w-full tw-flex tw-flex-grow">
        <ChatSection />
      </div>

      {selectedChat && (

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
      )}
    </>
  );
}

export default ChatView;