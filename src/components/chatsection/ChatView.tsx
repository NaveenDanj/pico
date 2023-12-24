import ChatSection from 'src/components/chatsection/ChatSection';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import SelectedChatHeader from './chat/SelectedChatHeader';
import ChatInputSection from './chat/ChatInputSection';


function ChatView() {

  const selectedChat = useSelector((state: RootState) => state.currentChat.selectedChat);

  return (
    <>
      {selectedChat && (
        <SelectedChatHeader selectedChat={selectedChat} />
      )}

      <div style={{ height: 'calc(100vh - 115px)', backgroundImage: 'url(./pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '250px 250px' }} className="tw-w-full tw-flex tw-flex-grow">
        <ChatSection />
      </div>

      {selectedChat && (
        <ChatInputSection selectedChat={selectedChat} />
      )}


    </>
  );
}

export default ChatView;