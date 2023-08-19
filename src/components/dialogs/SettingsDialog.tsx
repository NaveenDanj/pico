import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import SettingsIcon from '@mui/icons-material/Settings';
import ComputerIcon from '@mui/icons-material/Computer';
import KeyIcon from '@mui/icons-material/Key';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import General from './SettingsViews/General';
import Profile from './SettingsViews/Profile';


export default function SettingsDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <div onClick={handleClickOpen} className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md hover:tw-bg-[#282828]">
                <SettingsIcon sx={{ width: 16 }} />
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "590px",
                            height: "590px"
                        },
                    },
                }}
            >

                <div className='tw-flex tw-w-full tw-h-full'>

                    <div className='tw-w-[170px] tw-p-2 tw-bg-[#2C2C2C] tw-flex tw-flex-col tw-gap-1'>

                        <div className='tw-w-full tw-flex tw-p-2 tw-bg-[#37383B] tw-rounded-md hover:tw-bg-[#37383B]'>
                            <ComputerIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>General</label>
                        </div>

                        <div className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <KeyIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Account</label>
                        </div>

                        <div className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <ChatIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Chats</label>
                        </div>

                        <div className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <NotificationsNoneIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Notifications</label>
                        </div>

                        <div className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <SettingsAccessibilityIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Personalization</label>
                        </div>

                        <div className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <StorageIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Storage</label>
                        </div>

                        <div className='tw-flex tw-flex-grow'>

                        </div>

                        <div className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <AccountCircleIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Profile</label>
                        </div>

                    </div>

                    <div className='tw-flex tw-flex-grow tw-p-3 tw-bg-[#303030] tw-overflow-y-auto'>
                        {/* <General /> */}
                        <Profile />
                    </div>

                </div>

                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}

            </Dialog>
        </div>
    );
}