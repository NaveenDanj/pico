import { Avatar } from '@mui/material'

function ChatNameItem() {
    return (
        <div className='tw-w-full tw-flex tw-p-2 tw-justify-between tw-cursor-pointer'>

            <div className='tw-flex tw-gap-4'>

                <Avatar />

                <div className='tw-flex tw-flex-col'>
                    <label className='tw-text-sm tw-font-medium'>Okkomala ekata</label>
                    <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Check this out</label>
                </div>

            </div>

            <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>1:00 PM</label>

        </div>
    )
}

export default ChatNameItem