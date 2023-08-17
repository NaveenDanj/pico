import { Avatar } from "@mui/material"

function StoryItem() {
    return (
        <div className='tw-w-full tw-flex tw-justify-between tw-p-2 tw-rounded-md tw-cursor-pointer'>

            <div className='tw-flex tw-gap-4'>

                <Avatar src="https://avatars.githubusercontent.com/u/48654030?v=4" />

                <div className='tw-flex tw-flex-col'>
                    <label className='tw-text-sm tw-font-medium'>Naveen Dhananjaya</label>
                    <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-semibold'>2 minutes ago</label>
                </div>

            </div>

        </div>
    )
}

export default StoryItem