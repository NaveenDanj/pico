import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import SelectedChatHeader from './chat/SelectedChatHeader';
import ChatInputSection from './chat/ChatInputSection';
import { useLocation } from 'react-router-dom';
import ChatSectionWrapper from './chat/ChatSectionWrapper';
import CallViewSection from './call/CallViewSection';

function ChatView() {
  const location = useLocation();
  const selectedChat = useSelector((state: RootState) => state.currentChat.selectedChat);

  return (
    <>
      { ( (location.pathname == '/' || location.pathname == '/starred' || location.pathname == '/archived') && selectedChat) && (
        <>
          <SelectedChatHeader selectedChat={selectedChat} />
          <ChatSectionWrapper />
          <ChatInputSection selectedChat={selectedChat} />
        </>
      )}

      { (location.pathname == '/call' ) && (
        <CallViewSection />
      )}

    </>
  );
}

export default ChatView;