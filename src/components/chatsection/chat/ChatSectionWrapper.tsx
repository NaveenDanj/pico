import ChatSection from 'src/components/chatsection/ChatSection';

function ChatSectionWrapper() {
  return (
    <div style={{ height: 'calc(100vh - 115px)', backgroundImage: 'url(./pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '250px 250px' }} className="tw-w-full tw-flex tw-flex-grow">
      <ChatSection />
    </div>
  );
}

export default ChatSectionWrapper;