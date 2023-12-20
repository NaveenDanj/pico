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

import { collection, onSnapshot , getFirestore, query , where, orderBy, QueryDocumentSnapshot, DocumentData, doc, updateDoc, addDoc } from 'firebase/firestore';
import app from 'src/config/FirebaseConfig';
import SimplePeer from 'simple-peer';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';

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
  const peerRef = React.useRef<SimplePeer.Instance | null>(null);
  const user = useSelector((state: RootState) => state.user.userData);
  const [peerSetted, setPeerSetted] = useState(false);
  const [callAnswered, setCallAnswered] = useState(false);
  const [hasAnsweredCall, setHasAnsweredCall] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setPeerSetted(false);
  };

  useEffect(() => {
    let isMounted = true;
    if(user){
      const q = query(
        collection(db, 'global_call', user.uid, 'calls' ),
        where('timestamp', '>', new Date()), // Only get documents created after lastTimestamp
        orderBy('timestamp')
      );

      onSnapshot(q , snapshot => {
        snapshot.docChanges().forEach(change => {
          console.log('peer setted => ');
          if (change.type === 'added' && !peerSetted && !callAnswered && !hasAnsweredCall && isMounted) {
            console.log('ran once!');
            setPeerSetted(true);
            answerCall(change.doc.id, change.doc);
            setOpen(true);
            setCallAnswered(true);
            setHasAnsweredCall(true);
          }
        });
      });
    }

    return () => {
      isMounted = false;
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [user, peerSetted, callAnswered, hasAnsweredCall]);


  const answerCall = async (callId: string, answer: QueryDocumentSnapshot<DocumentData, DocumentData>) => {

    try {

      if (hasAnsweredCall) {
        return; // Avoid running the logic if already answered
      }

      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      console.log('Local stream obtained:', localStream);
      const peer = new SimplePeer({ initiator: false, trickle: false , stream : localStream});
      peerRef.current = peer;

      const offerData = JSON.parse(answer.data().offer);
      peerRef.current.signal(offerData);
  
      peerRef.current.on('signal', async (ans) => {
        console.log('Sending answer signal:', ans);
        const docRef = doc(db, 'global_call', 'JMSv0xufTRPddRqIvzT0Xiv27Lt2', 'calls', callId);
        await updateDoc(docRef, { answer: JSON.stringify(ans) });
      });
  
  
      peerRef.current.on('stream', (stream) => {
        console.log('Remote stream received:', stream);
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          audioRef.current.play();
        }
      });
  
      peerRef.current.on('connect', () => {
        console.log('Peer connected!');
        peerRef.current?.send('hello back');
      });
  
      peerRef.current.on('close', () => {
        console.log('Peer connection closed');
      });
  
      peerRef.current.on('error', (err) => {
        console.error('Peer Error:', err);
      });
  
      peerRef.current.on('data', data => {
        console.log('Data received:', data);
      });
  
      peerRef.current.on('iceCandidate', async (candidate) => {
        console.log('Sending iceCandidate:', candidate);
        const candidatesCollection = collection(db, 'global_call', 'JMSv0xufTRPddRqIvzT0Xiv27Lt2', 'calls', callId, 'offerCandidates');
        await addDoc(candidatesCollection, candidate);
      });

      setHasAnsweredCall(true);

    } catch (error) {
      console.error('Error during answerCall:', error);
    }
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

            <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#D5382F] tw-flex tw-justify-center tw-items-center'>
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