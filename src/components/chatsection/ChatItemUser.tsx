import { Message } from "src/types/dto"

interface ChatItemUserDTO {
    message: Message
}

function ChatItemUser({ message }: ChatItemUserDTO) {
    return (
        <div className="tw-w-full tw-flex tw-gap-3 tw-justify-end">

            <div className="tw-bg-[#035D4D] tw-flex tw-flex-col tw-rounded-sm tw-py-1 tw-px-2 tw-my-auto tw-min-w-[250px] tw-max-w-[650px]">

                <p className="tw-text-xs tw-mt-1">
                    {message.message && message.message}
                </p>

                <div className="tw-flex tw-justify-end">
                    <label className="tw-text-[#64988E] tw-text-[10px] tw-font-semibold">1:13 PM</label>
                </div>

            </div>

        </div>
    )
}

export default ChatItemUser