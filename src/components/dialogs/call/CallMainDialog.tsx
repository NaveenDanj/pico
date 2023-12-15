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
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import HandleCallService from 'src/services/Call/HandleCallService';
import { onValue } from 'firebase/database';
import { onSnapshot } from 'firebase/firestore';


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
  const audioRef: React.MutableRefObject<HTMLAudioElement | null> = useRef(null);
  const peerRef = useRef<Peer | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);


  const initCall = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    setMyStream(stream);

    peerRef.current = new Peer();
    
    peerRef.current.on('open', async (id) => {
      const _doc = await HandleCallService.addCall('JMSv0xufTRPddRqIvzT0Xiv27Lt2' , id);

      onSnapshot(_doc , (snapshot) => {

        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            const updatedData = change.doc.data();
            callPeer(updatedData.calleePeerId);
          }
        });
        
      });

    });
    
  };



  const callPeer = (peerId:string) => {
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const call = peerRef.current.call(peerId, myStream);
    call.on('stream', (_remoteStream) => {
      setRemoteStream(_remoteStream);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audioRef.current.srcObject = remoteStream;
    });

  };


  const handleClickOpen = () => {
    setOpen(true);
    initCall();
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

  }, []);

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
          <audio ref={audioRef} autoPlay />
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
              <Avatar src='https://avatars.githubusercontent.com/u/48654030?v=4' sx={{ width: 150, height: 150 }} />
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
            <button style={{ width: 40, height: 40, borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
              <MicIcon sx={{ fontSize: 18 }} />
            </button>

            <button style={{ width: 40, height: 40, borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
              <VideocamIcon sx={{ fontSize: 18 }} />
            </button>

            <button style={{ width: 40, height: 40, borderRadius: 20 }} className='tw-bg-[#D5382F] tw-flex tw-justify-center tw-items-center'>
              <CallEndIcon className='tw-text-white' sx={{ fontSize: 18 }} />
            </button>

            <button style={{ width: 40, height: 40, borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
              <MoreHorizIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
