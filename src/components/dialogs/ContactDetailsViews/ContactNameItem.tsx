import { Avatar } from '@mui/material'

function ContactNameItem() {
    return (
        <div className='tw-w-full tw-flex tw-p-2 tw-justify-between tw-cursor-pointer'>

            <div className='tw-flex tw-gap-4 tw-w-full'>

                <Avatar src={'https://avatars.githubusercontent.com/u/48654030?v=4'} />

                <div className='tw-flex tw-flex-col tw-w-full'>
                    <div className='tw-flex tw-w-full tw-justify-between'>
                        <label className='tw-text-sm tw-my-auto tw-font-medium'>Okkomala ekata</label>
                        {/* <label className='tw-text-[10px] tw-my-auto tw-text-[#A3A3A3] tw-font-thin'>1:00 PM</label> */}

                    </div>
                    <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Check this out</label>
                </div>

            </div>


        </div>
    )
}

export default ContactNameItem