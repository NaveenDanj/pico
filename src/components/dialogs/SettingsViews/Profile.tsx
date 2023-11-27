import { Avatar } from "@mui/material"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditProfileService from "src/services/Profile/EditProfileService";
import React, { ChangeEvent } from "react";
import { RootState } from "src/store/store";
import { useSelector } from 'react-redux';


function Profile() {

    const user = useSelector((state: RootState) => state.user.additionalData)

    const fileInputRef = React.createRef<HTMLInputElement>();

    const openFileDialog = () => {
        console.log('clicked!')
        if (!fileInputRef.current) {
            return
        }

        fileInputRef.current.click();
    }

    const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;

        if (!file || !user) {
            return
        }

        const url = await EditProfileService.updateDisplayPicture(file , user.uid)
        console.log("uploaded: ", url)

    }

    return (
        <div className='tw-w-full'>

            <div>
                <Avatar className="tw-mt-3" sx={{ width: 100, height: 100 }} src={user ? user.dp : ''} />
                <div onClick={openFileDialog} className=" tw-relative tw-top-[-18px] tw-left-[80px] tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
                    <ModeEditIcon sx={{ width: 14 }} />
                </div>
            </div>

            <div className='tw-w-full tw-mt-3 tw-flex tw-justify-between'>
                <label className='tw-text-md tw-font-thin tw-mt-3 tw-my-auto'>Naveen Dhananjaya</label>

                <div className="tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
                    <ModeEditIcon sx={{ width: 14 }} />
                </div>

            </div>

            <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col'>
                <label className="tw-text-xs tw-text-[#878787]">About</label>

                <div className="tw-flex tw-justify-between">
                    <p className="tw-text-xs tw-max-w-[300px] tw-my-auto ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam a iure perferendis maxime ipsa, libero cumque tempora soluta vel dolorem doloribus tempore sint voluptatem consequatur. Repellendus ad necessitatibus sint blanditiis.</p>
                    <div className=" tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
                        <ModeEditIcon sx={{ width: 14 }} />
                    </div>
                </div>
            </div>

            <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col'>
                <label className="tw-text-xs tw-text-[#878787]">Email address</label>

                <div className="tw-flex tw-justify-between">
                    <label className="tw-text-xs tw-my-auto">naveenhettiwaththa@gmail.com</label>
                </div>
            </div>

            <input ref={fileInputRef} onChange={handleUpload} type="file" style={{ display: 'none' }} id="fileInput" />

        </div>
    )
}

export default Profile