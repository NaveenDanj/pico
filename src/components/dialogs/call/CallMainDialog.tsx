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
import MicOffIcon from '@mui/icons-material/MicOff';
  

import { useEffect, useRef, useState } from 'react';
import { addDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import SimplePeer from 'simple-peer';
import { v4 as uuidv4 } from 'uuid';
import { collection , getFirestore, } from 'firebase/firestore';
import app from 'src/config/FirebaseConfig';
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

interface CallMainDTO {
  calleeId: string,
  calleeName: string,
  calleeDp: string
}


export default function CallMainDialog({ calleeId , calleeName , calleeDp }:CallMainDTO) {

  const [open, setOpen] = useState(false);
  const audioRef: React.MutableRefObject<HTMLAudioElement | null> = useRef(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);
  const [peerSetted , setPeerSetted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [initTime , setInitTime] = useState<number>(0);
  const [callStatus , setCallStatus] = useState('Calling...');
  const user = useSelector((state: RootState) => state.user.userData);
  const [localStream , setLocalStream] = useState<MediaStream>();
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [callId , setCallId] = useState('');


  useEffect(() => {
    console.log('latest call => ' , localStream);
    initCall();
  }, [localStream]);


  useEffect(() => {
    const rejectionIntervalId = setInterval(() => {
      updateCallDuration();
    }, 1000);

    const updateCallDuration = () => {
      if(localStorage.getItem('currentCallId')){
        setInitTime(initTime + 1);
      }
    };

    return () => {
      clearInterval(rejectionIntervalId);
    };

  } , [initTime]);

  useEffect(() => {
    if(localStorage.getItem('currentCallId')){
      console.log('time : ' , initTime);
      if(initTime > 30) {
        handleClose();
      }
    }
  }, [initTime]);


  const initCall = async () => {

    if(peerSetted && !user){
      return;
    }

    try {
      setInitTime(0);
      setCallId( uuidv4());
      localStorage.setItem('currentCallId' , callId);
      
      const peer = new SimplePeer({ initiator: true, trickle: false , stream: localStream});
      peerRef.current = peer;
  
      peerRef.current.on('signal', async (data) => {
        console.log('Sending offer signal:', data);
        const docRef = doc(db, 'global_call', calleeId , 'calls', callId);
        const docRef2 = doc(db, 'global_call', user?.uid+'' , 'calls', callId);
        await setDoc(docRef, { offer: JSON.stringify(data), timestamp: new Date() , caller:  user?.uid , callee : calleeId , answered : false , rejected: false});
        await setDoc(docRef2, { offer: JSON.stringify(data), timestamp: new Date() , caller:  user?.uid , callee : calleeId , answered : false , rejected: false});
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
        const docRef = doc(collection(db, 'global_call', calleeId , 'calls'), callId);
        const candidatesCollection = collection(docRef, 'answerCandidates');
        await addDoc(candidatesCollection, candidate);
      });
  
      peerRef.current.on('connect', async () => {
        console.log('Peer connected!');
        setPeerSetted(true);
        setStartTime(Date.now());
        const docRef = doc(collection(db, 'global_call', calleeId , 'calls'), callId);
        const docRef2 = doc(db, 'global_call', user?.uid+'' , 'calls', callId);

        await updateDoc(docRef , {
          answered: true,
          callStartTime: Date.now()
        });

        await updateDoc(docRef2 , {
          answered: true,
          callStartTime: Date.now()
        });

      });
  
      peerRef.current.on('close', async () => {
        const docRef = doc(collection(db, 'global_call', calleeId , 'calls'), callId);
        const docRef2 = doc(db, 'global_call', user?.uid+'' , 'calls', callId);

        await updateDoc(docRef , {
          callEndTime: Date.now()
        });

        await updateDoc(docRef2 , {
          callEndTime: Date.now()
        });

        setPeerSetted(false);
        setStartTime(null);
        setCallStatus('Calling...');
        peerRef.current?.destroy();
        
        setOpen(false);
        stopMic();
      });
  
      peerRef.current.on('error', (err) => {
        handleClose();
        console.error('Peer Error:', err);
      });
  
      onSnapshot(doc(db, 'global_call', calleeId , 'calls', callId), (snapshot) => {
        const data = snapshot.data();
        console.log('data is => ' , data);
        
        if(data && data.rejected){
          handleClose();
        }

        if (data && data.answer && peerRef.current && !peerRef.current.connected) {
          const remoteAnswer = JSON.parse(data.answer);
          if (remoteAnswer.type === 'answer') {
            if(!peerRef.current.destroyed) peerRef.current.signal(remoteAnswer);
          }
        }
      });
      
    } catch (error) {
      console.error('Error during initCall:', error);
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    accessMedia();
    // initCall();
  };

  const handleClose = async () => {

    if(callStatus == 'Calling...'){
      console.log('call id is => ' , callId);
      const _doc = doc(db , 'global_call', calleeId , 'calls', localStorage.getItem('currentCallId')+'');
      await HandleCallService._rejectCall(_doc);
    }


    if(peerRef.current){
      peerRef.current.destroy();
    }else{
      peerRef.current = null;
    }

    stopMic();
    setOpen(false);
    setPeerSetted(false);
    setStartTime(null);
    setCallStatus('Calling...');
    setInitTime(0);

  };
  
  const stopMic = () => {
    console.log('local stream is => ' , localStream);
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => track.stop());
    }
  };

  const accessMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    setLocalStream(stream);
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
      // peerRef.current?.destroy();
      // peerRef.current = null;
    };

  }, [startTime]);


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
              <Avatar src={calleeDp} sx={{ width: 150, height: 150 }} />
            </div>

            <div className='tw-mt-4 tw-flex tw-justify-center'>
              <label className='tw-text-xl'>{calleeName}</label>
            </div>

            <div className='tw-mt-2 tw-flex  tw-justify-center'>
              <label className='tw-text-sm tw-font-extralight'>{callStatus}</label>
            </div>
          </div>
        </div>

        <div className='tw-bg-[#202020] tw-h-[70px] tw-items-center tw-flex tw-justify-center'>
          <div className='tw-flex  tw-gap-4'>
            <button onClick={toggleMicMute} style={{ width: 40, height: 40, borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
              {isMicMuted ? (
                <MicOffIcon sx={{ fontSize: 18, color: '#D5382F' }} />
              ) : (
                <MicIcon sx={{ fontSize: 18 }} />
              )}
            </button>

            <button style={{ width: 40, height: 40, borderRadius: 20 }} className='tw-bg-[#2D2D2D] tw-flex tw-justify-center tw-items-center'>
              <VideocamIcon sx={{ fontSize: 18 }} />
            </button>

            <button onClick={handleClose} style={{ width: 40, height: 40, borderRadius: 20 }} className='tw-bg-[#D5382F] tw-flex tw-justify-center tw-items-center'>
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
