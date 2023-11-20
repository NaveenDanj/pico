import { useSelector } from "react-redux"
import ChatItemOther from "./ChatItemOther"
import ChatItemUser from "./ChatItemUser"
import { RootState } from "src/store/store"
import { Message } from "src/types/dto"

function ChatSection() {
    const chats = useSelector((state: RootState) => state.currentChat.messages)
    const user = useSelector((state: RootState) => state.user)

    return (
        <div style={{ height: 'calc(100vh - 115px)' }} className="tw-w-full tw-h-full tw-py-3 tw-px-5 tw-flex tw-flex-col tw-gap-5 tw-overflow-y-auto">

            {chats.map((item: Message, index: number) => (

                item.sender != user.userData?.uid ? <ChatItemOther key={index} message={item} /> : <ChatItemUser key={index} message={item} />
            ))}

            {/* <ChatItemOther />
            <ChatItemOther />
            <ChatItemOther />
            <ChatItemOther />
            <ChatItemUser />
            <ChatItemOther />
            <ChatItemOther />
            <ChatItemUser />
            <ChatItemUser /> */}

        </div>
    )
}

export default ChatSection