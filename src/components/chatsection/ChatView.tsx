import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import SelectedChatHeader from './chat/SelectedChatHeader';
import ChatInputSection from './chat/ChatInputSection';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ChatSectionWrapper from './chat/ChatSectionWrapper';

function ChatView() {
  const location = useLocation();
  const selectedChat = useSelector((state: RootState) => state.currentChat.selectedChat);

  useEffect(() => {console.log(location.pathname);});

  return (
    <>
      { (location.pathname == '/' && selectedChat) && (
        <>
          <SelectedChatHeader selectedChat={selectedChat} />
          <ChatSectionWrapper />
          <ChatInputSection selectedChat={selectedChat} />
        </>
      )}

      { (location.pathname == '/' && selectedChat) && (
        
      )}

    </>
  );
}

export default ChatView;