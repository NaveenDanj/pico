import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Avatar } from '@mui/material';


import InfoIcon from '@mui/icons-material/Info';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';
import Overview from './ContactDetailsViews/Overview';
import Participants from './ContactDetailsViews/Participants';
import Media from './ContactDetailsViews/Media';
import Files from './ContactDetailsViews/Files';
import Links from './ContactDetailsViews/Links';
import Encryption from './ContactDetailsViews/Encryption';




function ContactDetailsDialog() {

    const [open, setOpen] = React.useState(false);
    const [currentTab, setCurrentTab] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <div onClick={handleClickOpen} className='tw-flex tw-gap-4'>

                <Avatar />

                <div className='tw-flex tw-flex-col'>
                    <label className='tw-text-sm tw-font-medium'>Okkomala ekata</label>
                    <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Naveen Dhananjaya, Ashan cs</label>
                </div>

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

                    <div className='tw-w-[170px] tw-min-w-[170px] tw-p-2 tw-bg-[#2C2C2C] tw-flex tw-flex-col tw-gap-1'>

                        <div onClick={() => setCurrentTab(0)} className='tw-w-full tw-flex tw-p-2 tw-bg-[#37383B] tw-rounded-md hover:tw-bg-[#37383B]'>
                            <InfoIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Overview</label>
                        </div>

                        <div onClick={() => setCurrentTab(1)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <PeopleOutlineIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Participants</label>
                        </div>

                        <div onClick={() => setCurrentTab(2)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <SubscriptionsIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Media</label>
                        </div>

                        <div onClick={() => setCurrentTab(3)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <ArticleIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Files</label>
                        </div>

                        <div onClick={() => setCurrentTab(4)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <LinkIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Links</label>
                        </div>

                        <div onClick={() => setCurrentTab(5)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <EnhancedEncryptionOutlinedIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Encryption</label>
                        </div>

                        <div className='tw-flex tw-flex-grow'>

                        </div>

                    </div>

                    <div className='tw-flex tw-flex-grow tw-p-3 tw-bg-[#303030] tw-overflow-y-auto'>
                        {currentTab == 0 && <Overview />}
                        {currentTab == 1 && <Participants />}
                        {currentTab == 2 && <Media />}
                        {currentTab == 3 && <Files />}
                        {currentTab == 4 && <Links />}
                        {currentTab == 5 && <Encryption />}
                    </div>

                </div>

            </Dialog>
        </div>
    )
}

export default ContactDetailsDialog