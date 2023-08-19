import { Avatar } from "@mui/material"
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Profile() {
    return (
        <div className='tw-w-full'>

            <Avatar className="tw-mt-3" sx={{ width: 100, height: 100 }} src="https://avatars.githubusercontent.com/u/48654030?v=4" />

            <div className='tw-w-full tw-mt-3 tw-flex tw-justify-between'>
                <label className='tw-text-md tw-font-thin tw-mt-3 tw-my-auto'>Naveen Dhananjaya</label>

                <div className="tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
                    <ModeEditIcon sx={{ width: 14 }} />
                </div>

            </div>

            <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col'>
                <label className="tw-text-xs tw-text-[#878787]">About</label>

                <div className="tw-flex tw-justify-between">
                    <p className="tw-text-xs tw-my-auto tw-w-[300px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam a iure perferendis maxime ipsa, libero cumque tempora soluta vel dolorem doloribus tempore sint voluptatem consequatur. Repellendus ad necessitatibus sint blanditiis.</p>
                    <div className=" tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
                        <ModeEditIcon sx={{ width: 14 }} />
                    </div>
                </div>
            </div>

            <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col'>
                <label className="tw-text-xs tw-text-[#878787]">Email address</label>

                <div className="tw-flex tw-justify-between">
                    <label className="tw-text-xs tw-my-auto">naveenhettiwaththa@gmail.com</label>
                    {/* <div className=" tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
                        <ModeEditIcon sx={{ width: 14 }} />
                    </div> */}
                </div>
            </div>



        </div>
    )
}

export default Profile