import * as React from 'react';
import Dialog from '@mui/material/Dialog';
// import ComputerIcon from '@mui/icons-material/Computer';
// import KeyIcon from '@mui/icons-material/Key';
// import ChatIcon from '@mui/icons-material/Chat';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
// import StorageIcon from '@mui/icons-material/Storage';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EmailIcon from '@mui/icons-material/Email';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';


function AddContactDialog() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>

            <div onClick={handleClickOpen} className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
                <AddBoxIcon sx={{ width: 16 }} />
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
                            maxWidth: "500px",
                        },
                    },
                }}
            >

                <div className='tw-flex tw-w-full tw-h-full'>

                    <div className='tw-flex tw-flex-grow tw-p-3 tw-bg-[#303030] tw-overflow-y-auto'>


                        <div className='tw-w-full tw-pb-5'>

                            <div className='tw-ml-5'>

                                <h2 className='tw-text-lg tw-font-semibold'>Add Contact</h2>

                                <p className='tw-text-xs tw-text-[#A4A4A4] tw-mt-2  '>
                                    you can easily connect with your friends, family, and colleagues by adding them to your contact list using their email addresses
                                </p>

                            </div>


                            <div className='tw-mt-5 tw-w-[80%] tw-ml-5 tw-flex tw-flex-col tw-gap-1'>
                                <div>
                                    <EmailIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                                    <label className='tw-text-xs tw-text-white tw-ml-2'>Email Address</label>
                                </div>

                                <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
                                    <input type='text' placeholder='Enter email address' className='tw-w-full  tw-p-1 tw-text-xs' />
                                </div>


                                <div className='tw-mt-3'>
                                    <PermContactCalendarIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                                    <label className='tw-text-xs tw-text-white tw-ml-2'>Contact name</label>
                                </div>

                                <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-p-1 tw-rounded-sm'>
                                    <input type='text' placeholder='Enter contact name' className='tw-w-full  tw-p-1 tw-text-xs' />
                                </div>



                                <div className='tw-flex tw-flex-row tw-w-full tw-justify-between tw-gap-16 tw-mt-8'>

                                    <div className='tw-w-full  tw-flex tw-flex-col tw-gap-0'>
                                        <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-[#00A884]'>Add Contact</button>
                                    </div>


                                    <div onClick={handleClose} className='tw-w-full  tw-flex tw-flex-col tw-gap-0'>
                                        <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-red-300'>Cancel</button>
                                    </div>

                                </div>

                            </div>

                        </div >

                    </div>

                </div>

            </Dialog>
        </div>
    )
}

export default AddContactDialog