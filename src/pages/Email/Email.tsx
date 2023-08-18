import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import './index.css'
import EmailItem from 'src/components/email/EmailItem';

function Email() {
    return (
        <div>

            <div className="tw-px-5 tw-mt-4 ">

                <div className="tw-flex tw-justify-between">

                    <h1 className="tw-text-lg tw-font-bold tw-my-auto">Email</h1>

                    <div className="tw-flex tw-gap-1 tw-my-auto">

                        <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
                            <AddBoxIcon sx={{ width: 16 }} />
                        </div>

                    </div>

                </div>

                <div className='tw-mt-3'>

                    <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-px-1 tw-rounded-sm'>
                        <input type='text' placeholder='Search email' className='tw-w-full  tw-p-1 tw-text-xs' />
                        <SearchIcon sx={{ width: 16, marginLeft: 1 }} />
                    </div>

                </div>

            </div>

            <div style={{ height: 'calc(100vh - 92px)' }} className='tw-px-5 tw-py-7 tw-flex tw-flex-col tw-gap-3 tw-overflow-y-auto'>

                <div className='tw-w-full tw-flex tw-justify-between tw-bg-[#4D4D4D] tw-p-2 tw-rounded-md tw-cursor-pointer'>

                    <div className='tw-flex tw-gap-4 tw-w-[100%]'>

                        <Avatar />

                        <div className='tw-flex tw-flex-col tw-w-[100%]'>
                            <div className='tw-flex tw-justify-between tw-w-[100%]'>
                                <label className='tw-my-auto tw-text-sm tw-font-medium'>Okkomala ekata</label>
                                <label className='tw-my-auto tw-text-[10px] tw-text-[#A3A3A3] tw-font-thin'>1:00 PM</label>
                            </div>
                            <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Check this out</label>
                        </div>

                    </div>


                </div>

                <EmailItem />
                <EmailItem />
                <EmailItem />
                <EmailItem />
                <EmailItem />
                <EmailItem />
                <EmailItem />
                <EmailItem />
                <EmailItem />

            </div>

        </div>
    )
}

export default Email