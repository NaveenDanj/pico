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
import Account from './SettingsViews/Account';
import Chat from './SettingsViews/Chat';
// import EmailIcon from '@mui/icons-material/Email';
import Emails from './SettingsViews/Emails';

export default function SettingsDialog() {
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

      <div onClick={handleClickOpen} className="tw-w-full tw-p-1 tw-flex tw-justify-center tw-rounded-md hover:tw-bg-[#282828]">
        <SettingsIcon sx={{ width: 16 }} />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '590px',
              height: '590px'
            },
          },
        }}
      >

        <div className='tw-flex tw-w-full tw-h-full'>

          <div className='tw-w-[170px] tw-min-w-[170px] tw-p-2 tw-bg-[#2C2C2C] tw-flex tw-flex-col tw-gap-1'>

            <div onClick={() => setCurrentTab(0)} className='tw-w-full tw-flex tw-p-2 tw-bg-[#37383B] tw-rounded-md hover:tw-bg-[#37383B]'>
              <ComputerIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
              <label className='tw-text-xs tw-ml-3 tw-my-auto'>General</label>
            </div>

            <div onClick={() => setCurrentTab(1)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
              <KeyIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
              <label className='tw-text-xs tw-ml-3 tw-my-auto'>Account</label>
            </div>

            <div onClick={() => setCurrentTab(3)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
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


            {/* <div onClick={() => setCurrentTab(4)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
                            <EmailIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
                            <label className='tw-text-xs tw-ml-3 tw-my-auto'>Email</label>
                        </div> */}

            <div className='tw-flex tw-flex-grow'>

            </div>

            <div onClick={() => setCurrentTab(2)} className='tw-w-full tw-flex tw-p-2 tw-rounded-md hover:tw-bg-[#37383B]'>
              <AccountCircleIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
              <label className='tw-text-xs tw-ml-3 tw-my-auto'>Profile</label>
            </div>

          </div>

          <div className='tw-flex tw-flex-grow tw-p-3 tw-bg-[#303030] tw-overflow-y-auto'>
            {currentTab == 0 && <General />}
            {currentTab == 1 && <Account />}
            {currentTab == 2 && <Profile />}
            {currentTab == 3 && <Chat />}
            {currentTab == 4 && <Emails />}
          </div>

        </div>

      </Dialog>
    </div>
  );
}