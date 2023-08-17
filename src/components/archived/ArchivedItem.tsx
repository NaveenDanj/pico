import { Avatar } from "@mui/material"

function ArchivedItem() {
    return (
        <div className='tw-w-full tw-flex tw-p-2 tw-justify-between tw-cursor-pointer hover:tw-bg-[#4D4D4D] tw-rounded-md'>

            <div className='tw-flex tw-gap-4 tw-w-[100%]'>

                <Avatar src="https://avatars.githubusercontent.com/u/48654030?v=4" />

                <div className='tw-flex tw-flex-col tw-w-[100%]'>
                    <div className="tw-flex tw-justify-between">
                        <label className='tw-text-sm tw-font-medium tw-my-auto'>Okkomala ekata</label>
                        <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin tw-my-auto'>1:00 PM</label>
                    </div>
                    <label className='tw-text-[10px] tw-text-[#A3A3A3] tw-font-medium'>Check this out</label>
                </div>

            </div>


        </div>
    )
}

export default ArchivedItem