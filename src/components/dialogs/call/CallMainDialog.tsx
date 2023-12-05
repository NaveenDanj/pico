import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useState } from 'react';
import SimplePeer from 'simple-peer';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CallMainDialog() {
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div onClick={handleClickOpen} className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#333333]">
                <AddIcCallIcon sx={{ width: 16 }} />
            </div>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className='tw-bg-[#272727]' >

                    <Toolbar>

                        <IconButton
                            edge="start"
                            color="inherit"


                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>

                        <label className='tw-text-lg tw-ml-3'>
                            Pico Call
                        </label>

                    </Toolbar>

                </div>

                <div className='tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center' style={{ backgroundImage: 'url(./pattern.png)' }}>
                    
                    <div className=' tw-justify-center'>
                        <div className='tw-flex tw-justify-center'>
                            <Avatar src='https://avatars.githubusercontent.com/u/48654030?v=4' sx={{ width : 150 , height : 150 }} />
                        </div>

                        <div className='tw-mt-4'>
                            <label className='tw-text-xl'>Naveen Dhananjaya</label>
                        </div>

                        <div className='tw-mt-2 tw-flex  tw-justify-center'>
                            <label className='tw-text-sm tw-font-extralight'>Calling...</label>
                        </div>
                    </div>

                </div>

                <div className='tw-bg-[#202020] tw-h-[70px] tw-items-center tw-flex tw-justify-center'>
                    
                    <div className='tw-flex  tw-gap-4'>
                        
                        <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
                            <MicIcon sx={{ fontSize : 18 }}  />
                        </button>

                        <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
                            <VideocamIcon sx={{ fontSize : 18 }}  />
                        </button>

                        <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#D5382F] tw-flex tw-justify-center tw-items-center'>
                            <CallEndIcon className='tw-text-white' sx={{ fontSize : 18 }}  />
                        </button>

                        <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
                            <MoreHorizIcon sx={{ fontSize : 18 }}  />
                        </button>

                        
                    </div>

                </div>
            
            </Dialog>

        </>
    );
}