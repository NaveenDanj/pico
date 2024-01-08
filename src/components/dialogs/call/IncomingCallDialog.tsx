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
import MicOffIcon from '@mui/icons-material/MicOff';
import {useEffect, useState } from 'react';

import { collection, onSnapshot , getFirestore, query , where, orderBy, QueryDocumentSnapshot, DocumentData, doc, updateDoc, addDoc, DocumentChange } from 'firebase/firestore';
import app from 'src/config/FirebaseConfig';
import SimplePeer from 'simple-peer';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
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
  const peerRef = React.useRef<SimplePeer.Instance | null>(null);
  const user = useSelector((state: RootState) => state.user.userData);
  const [peerSetted, setPeerSetted] = useState(false);
  const [callAnswered, setCallAnswered] = useState(false);
  const [hasAnsweredCall, setHasAnsweredCall] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [callStatus , setCallStatus] = useState('Calling...');
  const [latestCall , setLatestCall] = useState<DocumentChange<DocumentData, DocumentData>>();
  const [localStream , setLocalStream] = useState<MediaStream>();
  const [isMicMuted, setIsMicMuted] = useState(false);


  useEffect(() => {
    const intervalId = setInterval(() => {
      updateCallDuration();
    }, 1000);
    
    const formatDuration = (duration: number) => {
  
      if(startTime){
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        setCallStatus(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }else{
        setCallStatus('Calling...');
      }
  
    };

    const updateCallDuration = () => {
      if (startTime !== null) {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        formatDuration(currentTime);
      }
    };

    return () => {
      clearInterval(intervalId);
    };

  } , [startTime]);

  useEffect(() => {
    let isMounted = true;
    if(user){
      const q = query(
        collection(db, 'global_call', user.uid, 'calls' ),
        where('timestamp', '>', new Date()),
        orderBy('timestamp')  
      );

      onSnapshot(q , snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' && !peerSetted && !callAnswered && !hasAnsweredCall && isMounted) {
            const data = change.doc.data();
            console.log('new call found! => ' , data);
            if(data.callee == user.uid){
              setLatestCall(change);
              setOpen(true);
            }
          }
        });
      });
    }


    return () => {
      isMounted = false;
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [user, peerSetted, callAnswered, hasAnsweredCall]);

  const answerCall = async (callId: string, answer: QueryDocumentSnapshot<DocumentData, DocumentData> , localStream: MediaStream | undefined) => {
    console.log('called' , localStream);
    if (hasAnsweredCall && !localStream) {
      return;
    }

    console.log('no issues!');

    try{

      const peer = new SimplePeer({ initiator: false, trickle: false , stream : localStream});
      peerRef.current = peer;
  

      const offerData = JSON.parse(answer.data().offer);
      peerRef.current.signal(offerData);
    
      peerRef.current.on('signal', async (ans) => {
        console.log('Sending answer signal:', ans);
        const docRef = doc(db, 'global_call', user?.uid+'', 'calls', callId);
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
        setStartTime(Date.now());
        peerRef.current?.send('hello world');
      });
    
      peerRef.current.on('close', () => {
        console.log('Peer connection closed');
        handleClose();
      });
    
      peerRef.current.on('error', (err) => {
        console.error('Peer Error:', err);
        handleClose();
      });
    
      peerRef.current.on('data', data => {
        console.log('Data received:', data);
      });
    
      peerRef.current.on('iceCandidate', async (candidate) => {
        console.log('Sending iceCandidate:', candidate);
        const candidatesCollection = collection(db, 'global_call', user?.uid+'', 'calls', callId, 'offerCandidates');
        await addDoc(candidatesCollection, candidate);
      });
  
      setHasAnsweredCall(true);
    }catch(err){
      console.log('Error while receiving call');
      handleClose();
    }


  };

  useEffect(() => {
    console.log('latest call => ' , localStream , latestCall?.doc.data());
    if(latestCall && latestCall.doc) answerCall(latestCall?.doc.id , latestCall.doc , localStream);
  }, [localStream]);


  const accessMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    setLocalStream(stream);
  };

  const handleAnswerCall = async () => {
    setPeerSetted(true);
    if(latestCall){
      accessMedia();
      setCallAnswered(true);
      setHasAnsweredCall(true);
    } 
  };

  const handleClose = () => {

    stopMic();

    if(peerRef.current){
      peerRef.current.destroy();
    }else{
      peerRef.current = null;
    }

    setOpen(false);
    setPeerSetted(false);
    setStartTime(null);
    setCallStatus('Calling...');
    setHasAnsweredCall(false);
    setCallAnswered(false);

  };
  
  const stopMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
  
      audioTracks.forEach(track => {
        console.log('Stopping track:', track);
        track.stop();
      });
  
    }
  };

  const toggleMicMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      console.log(audioTracks);
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
        setIsMicMuted(!track.enabled); // Update state based on the enabled state
      });
    }
  };

  const handleRejectCall = async () => {

    if(!latestCall) return;
    await HandleCallService.rejectCall(latestCall);

    setOpen(false);
    setPeerSetted(false);
    setStartTime(null);
    setCallStatus('Calling...');
    setHasAnsweredCall(false);
    setCallAnswered(false);
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
              <center><label className='tw-text-xl'>Naveen Dhananjaya</label></center>
            </div>

            <div className='tw-mt-2 tw-flex  tw-justify-center'>
              <label className='tw-text-sm tw-font-extralight'>{callStatus}</label>
            </div>

            {!hasAnsweredCall && (
              <div className='tw-flex tw-gap-6 tw-mt-10'>
                          
                <button onClick={handleRejectCall} style={{ width : 60 , height: 40 , borderRadius: 20 }} className='tw-bg-[#D53A2C] tw-flex tw-justify-center tw-my-auto tw-items-center'>
                  <CallEndIcon className='tw-text-white tw-my-auto' sx={{ fontSize : 18 }} />
                </button>

                <button onClick={() => handleAnswerCall()} style={{ borderRadius: 30 }} className='tw-bg-[#24CA63] tw-flex tw-justify-center tw-my-auto tw-items-center tw-px-6'>
                  <CallEndIcon className='tw-text-white tw-my-auto' sx={{ fontSize : 18 }} />
                  <label className='tw-ml-4 tw-text-sm tw-my-auto'>Accept</label>
                </button>

                <button style={{ width : 60 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-my-auto tw-items-center'>
                  <MoreHorizIcon sx={{ fontSize : 18 }} />
                </button>

                          
              </div>
            )}


          </div>

        </div>

        <div className='tw-bg-[#202020] tw-h-[75px] tw-items-center tw-flex tw-justify-center'>

          {hasAnsweredCall && (
            <div className='tw-flex  tw-gap-4'>
                          
              <button onClick={toggleMicMute} style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>

                {isMicMuted ? (
                  <MicOffIcon sx={{ fontSize: 18, color: '#D5382F' }} />
                ) : (
                  <MicIcon sx={{ fontSize: 18 }} />
                )}

                {/* <MicIcon sx={{ fontSize : 18 }} /> */}
              </button>

              <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
                <VideocamIcon sx={{ fontSize : 18 }} />
              </button>

              <button onClick={() => handleAnswerCall()} style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#D5382F] tw-flex tw-justify-center tw-items-center'>
                <CallEndIcon className='tw-text-white' sx={{ fontSize : 18 }} />
              </button>

              <button style={{ width : 40 , height: 40 , borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
                <MoreHorizIcon sx={{ fontSize : 18 }} />
              </button>

            </div>
          )}



        </div>
            
      </Dialog>

    </>
  );
}

