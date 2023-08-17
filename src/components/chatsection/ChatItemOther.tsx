import { Avatar } from "@mui/material"

function ChatItemOther() {
    return (
        <div className="tw-w-full tw-flex tw-gap-3">

            <Avatar src="https://avatars.githubusercontent.com/u/48654030?v=4" sx={{ width: 30, height: 30 }} />

            <div className="tw-bg-[#383838] tw-flex tw-flex-col tw-rounded-sm tw-py-1 tw-px-2 tw-my-auto tw-min-w-[250px] tw-max-w-[400px]">

                <label className="tw-text-[#06CF9C] tw-text-xs">Naveen Dhananjaya</label>

                <p className="tw-text-xs tw-mt-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, accusantium numquam. Quae ipsam, dolorum quo impedit distinctio deserunt non. Quas ex nam quia eveniet aut quibusdam iure ducimus voluptas voluptate.
                </p>

                <div className="tw-flex tw-justify-end">
                    <label className="tw-text-[#7D7D7D] tw-text-[10px] tw-font-semibold">1:13 PM</label>
                </div>

            </div>

        </div>
    )
}

export default ChatItemOther