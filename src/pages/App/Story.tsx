import { Avatar } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import StoryItem from "src/components/story/StoryItem";


function Story() {
    return (
        <div>

            <div className="tw-px-5 tw-mt-4 ">

                <div className="tw-flex tw-justify-between">

                    <h1 className="tw-text-lg tw-font-bold tw-my-auto">Story</h1>

                    <div className="tw-flex tw-gap-1 tw-my-auto">

                        <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
                            <AddBoxIcon sx={{ width: 16 }} />
                        </div>

                    </div>

                </div>

                <div className='tw-mt-3'>

                    <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-px-1 tw-rounded-sm'>
                        <input type='text' placeholder='Search story' className='tw-w-full  tw-p-1 tw-text-xs' />
                        <SearchIcon sx={{ width: 16, marginLeft: 1 }} />
                    </div>

                </div>

            </div>

            <div style={{ height: 'calc(100vh - 92px)' }} className='tw-px-5 tw-py-7 tw-flex tw-flex-col tw-gap-3 tw-overflow-y-auto'>

                <div className='tw-w-full tw-flex tw-justify-between tw-bg-[#4D4D4D] tw-p-2 tw-rounded-md tw-cursor-pointer'>

                    <div className='tw-flex tw-gap-4'>

                        <Avatar src="https://avatars.githubusercontent.com/u/48654030?v=4" />

                        <div className='tw-flex tw-flex-col'>
                            <label className='tw-text-sm tw-font-medium'>My Story</label>
                            <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Add story</label>
                        </div>

                    </div>

                </div>

                <label className="tw-text-[898989] tw-text-[12px] tw-font-semibold">Recent updates</label>

                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />
                <StoryItem />

            </div>

        </div>
    )
}

export default Story