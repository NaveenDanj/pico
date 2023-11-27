import { Avatar } from "@mui/material"
import { ChatRoomDTO, Message } from "src/types/dto"


interface ChatItemOtherDTO {
    message: Message,
    userContact: ChatRoomDTO | null
}


function ChatItemOther({ message , userContact }: ChatItemOtherDTO) {
    return (
        <div className="tw-w-full tw-flex tw-gap-3">

            <Avatar src={userContact ? userContact.contats.dp : ''} sx={{ width: 30, height: 30 }} />

            <div className="tw-bg-[#383838] tw-flex tw-flex-col tw-rounded-sm tw-py-1 tw-px-2 tw-my-auto tw-min-w-[250px] tw-max-w-[400px]">

                <label className="tw-text-[#06CF9C] tw-text-xs">{userContact && userContact.contats.contactName}</label>

                <p className="tw-text-xs tw-mt-1">
                    {message.message && message.message}
                </p>

                <div className="tw-flex tw-justify-end">
                    <label className="tw-text-[#7D7D7D] tw-text-[10px] tw-font-semibold">1:13 PM</label>
                </div>

            </div>

        </div>
    )
}

export default ChatItemOther