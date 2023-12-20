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
import { addDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import SimplePeer from 'simple-peer';
import { v4 as uuidv4 } from 'uuid';
import { collection , getFirestore, } from 'firebase/firestore';
import app from 'src/config/FirebaseConfig';
const db = getFirestore(app);


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
  const peerRef = useRef<SimplePeer.Instance | null>(null);
  const [peerSetted , setPeerSetted] = useState(false);

  const initCall = async () => {

    if(peerSetted){
      return;
    }

    try {
      const callId: string = uuidv4();
  
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      console.log('Local stream obtained:', stream);
      
      const peer = new SimplePeer({ initiator: true, trickle: false , stream: stream});
      peerRef.current = peer;
  
      peerRef.current.on('signal', async (data) => {
        console.log('Sending offer signal:', data);
        const docRef = doc(db, 'global_call', 'JMSv0xufTRPddRqIvzT0Xiv27Lt2', 'calls', callId);
        await setDoc(docRef, { offer: JSON.stringify(data), timestamp: new Date() });
      });
  
      peerRef.current.on('stream', (stream) => {
        console.log('Remote stream received:', stream);
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          audioRef.current.play();
        }
      });
  
      peerRef.current.on('data', data => {
        console.log('Data received:', data);
      });
  
      peerRef.current.on('iceCandidate', async (candidate) => {
        console.log('Sending iceCandidate:', candidate);
        const docRef = doc(collection(db, 'global_call', 'JMSv0xufTRPddRqIvzT0Xiv27Lt2', 'calls'), callId);
        const candidatesCollection = collection(docRef, 'answerCandidates');
        await addDoc(candidatesCollection, candidate);
      });
  
      peerRef.current.on('connect', () => {
        console.log('Peer connected!');
        setPeerSetted(true);
      });
  
      peerRef.current.on('close', () => {
        console.log('Peer connection closed');
      });
  
      peerRef.current.on('error', (err) => {
        console.error('Peer Error:', err);
      });
  
      onSnapshot(doc(db, 'global_call', 'JMSv0xufTRPddRqIvzT0Xiv27Lt2', 'calls', callId), (snapshot) => {
        const data = snapshot.data();
        if (data && data.answer && peerRef.current && !peerRef.current.connected) {
          console.log('Answer received:', data);
          const remoteAnswer = JSON.parse(data.answer);
          if (remoteAnswer.type === 'answer') {
            console.log('Connection found');
            peerRef.current.signal(remoteAnswer);
          }
        }
      });
    } catch (error) {
      console.error('Error during initCall:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    initCall();
  };

  const handleClose = () => {
    setOpen(false);
    setPeerSetted(false);
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
