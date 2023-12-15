import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';
import {useEffect, useState } from 'react';

import { collection, onSnapshot , getFirestore, query , where, orderBy } from 'firebase/firestore';
import app from 'src/config/FirebaseConfig';
import Peer from 'peerjs';
import HandleCallService from 'src/services/Call/HandleCallService';

const db = getFirestore(app);



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IncomingCallDialog() {
  const [open, setOpen] = useState(false);
  const audioRef: React.RefObject<HTMLAudioElement> | undefined = React.useRef() as React.RefObject<HTMLAudioElement>;
  const peerRef = React.useRef<Peer | null>(null);
  const [myStream, setMyStream] = useState<MediaStream>(new MediaStream());
  const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream());

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    peerRef.current = new Peer();

    peerRef.current.on('open', async (id) => {
        
      const colRef = collection(db , 'global_call' , 'JMSv0xufTRPddRqIvzT0Xiv27Lt2' , 'calls');
    
      const timestampQuery = query(
        colRef,
        where('timestamp', '>', new Date()), 
        orderBy('timestamp')
      );
    
      const unsubscribe = onSnapshot(timestampQuery, (snapshot) => {
        snapshot.docChanges().forEach( async(change) => {
          if (change.type === 'added') {
            console.log('New document added:', change.doc.data() , id);
            await HandleCallService.updateCallFromCalleeSide('JMSv0xufTRPddRqIvzT0Xiv27Lt2' , change.doc.id , id);
            setOpen(true);
          }
        });
      });
    
      return unsubscribe;
     
    });
    

  } , []);


  const answerCall = () => {

    if(!peerRef.current) return;

    peerRef.current.on('call' , async (call) => {
        
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      setMyStream(stream);
      call.answer(myStream);

      call.on('stream', (_remoteStream) => {
        setRemoteStream(_remoteStream);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        audioRef.current.srcObject = remoteStream;
      });

    });

  };


  return (
    <>
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
              <MicIcon sx={{ fontSize : 18 }} />
            </button>

            <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
              <VideocamIcon sx={{ fontSize : 18 }} />
            </button>

            <button onClick={answerCall} style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#D5382F] tw-flex tw-justify-center tw-items-center'>
              <CallEndIcon className='tw-text-white' sx={{ fontSize : 18 }} />
            </button>

            <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
              <MoreHorizIcon sx={{ fontSize : 18 }} />
            </button>

                        
          </div>

        </div>
            
      </Dialog>

    </>
  );
}