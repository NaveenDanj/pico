import ChatItemOther from "./ChatItemOther"
import ChatItemUser from "./ChatItemUser"

function ChatSection() {
    return (
        <div style={{ height: 'calc(100vh - 115px)' }} className="tw-w-full tw-h-full tw-py-3 tw-px-5 tw-flex tw-flex-col tw-gap-5 tw-overflow-y-auto">
            <ChatItemOther />
            <ChatItemOther />
            <ChatItemOther />
            <ChatItemOther />
            <ChatItemUser />
            <ChatItemOther />
            <ChatItemOther />
            <ChatItemUser />
            <ChatItemUser />

        </div>
    )
}

export default ChatSection