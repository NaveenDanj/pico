import { useSelector } from "react-redux"
import ChatItemOther from "./ChatItemOther"
import ChatItemUser from "./ChatItemUser"
import { RootState } from "src/store/store"
import { Message } from "src/types/dto"
import { useEffect, useRef } from "react"

function ChatSection() {
    const chats = useSelector((state: RootState) => state.currentChat.messages)
    const selectedChatUser = useSelector((state: RootState) => state.currentChat.selectedChat)
    const user = useSelector((state: RootState) => state.user)

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [chats]);

    return (

        <div ref={ref} style={{ height: 'calc(100vh - 115px)' }} className="tw-w-full tw-h-full tw-py-3 tw-px-5 tw-flex tw-flex-col tw-gap-5 tw-overflow-y-auto">

            {chats.map((item: Message, index: number) => (

                item.sender != user.userData?.uid ? <ChatItemOther key={index} message={item} userContact={selectedChatUser} /> : <ChatItemUser key={index} message={item} />
            ))}

        </div>
    )
}

export default ChatSection