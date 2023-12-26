import { Avatar } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import moment from 'moment';


function CallViewSection() {

  const selectedCallInfo = useSelector((state: RootState) => state.callInfo.selectedCall );


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function formatDateDisplay(date) {
    const d = moment(new Date(date.seconds * 1000));
    const now = moment();

    const diff = now.diff(d, 'days');
  
    if (diff === 0) {
      return 'Today';
    } else if (diff === 1) {
      return 'Yesterday';
    } else if (now.year() === d.year()) {
      return d.format('MMM D');
    } else {
      return d.format('YYYY/MM/DD');
    }
  }


  return (

    <div className="tw-w-full tw-h-full">
      <div style={{ borderBottom: '1px solid rgba(0,0,0,0.2)' }} className="tw-bg-[#272727] tw-h-[57px] tw-w-full tw-px-5 tw-flex tw-justify-between">
        <label className="tw-my-auto">Call Info</label>
      </div>

      <div className="tw-bg-[#303030] tw-flex tw-justify-between tw-mx-5 tw-mt-5 tw-px-5 tw-py-3">
        
        <div className='tw-flex tw-gap-3'>
          <Avatar className='tw-my-auto' src={selectedCallInfo?.dp} />

          <div className='tw-flex tw-flex-col tw-my-auto'>
            <label className='tw-text-sm tw-font-medium'>{selectedCallInfo?.contactName}</label>
            <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Hay there, I am using Pico</label>
          </div>            
        </div>

        <div className='tw-flex tw-gap-2'>

          <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#3C3C3C]">
            <ChatBubbleIcon sx={{ width: 16 }} />
          </div>

          <div className="tw-w-[45px] tw-p-2 tw-flex tw-justify-center tw-rounded-md  hover:tw-bg-[#3C3C3C]">
            <CallIcon sx={{ width: 16 }} />
          </div>

        </div>

      </div>

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.2)' }} className="tw-bg-[#303030] tw-flex tw-justify-between tw-mx-5 tw-px-5 tw-py-3">
        <label className=' tw-font-light tw-text-[sm]'>{formatDateDisplay(selectedCallInfo?.timestamp)}</label>
      </div>

      <div className='tw-flex tw-flex-col tw-bg-[#303030] tw-mx-5 tw-pl-7 tw-pr-5 tw-gap-5 tw-py-3'>
        
        <div className='tw-flex tw-justify-between'>

          <div className='tw-flex tw-gap-3'>
            <CallIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
            <label className='tw-my-auto tw-text-[14px]'>Outgoing voice call at 7:19 PM</label>
          </div>

          <label className='tw-my-auto tw-text-[14px]'>1 minute 28 seconds</label>

        </div>

        {/* <div className='tw-flex tw-justify-between'>

          <div className='tw-flex tw-gap-3'>
            <CallIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
            <label className='tw-my-auto tw-text-[14px]'>Outgoing voice call at 7:19 PM</label>
          </div>

          <label className='tw-my-auto tw-text-[14px]'>1 minute 28 seconds</label>

        </div>

        <div className='tw-flex tw-justify-between'>

          <div className='tw-flex tw-gap-3'>
            <CallIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
            <label className='tw-my-auto tw-text-[14px]'>Outgoing voice call at 7:19 PM</label>
          </div>

          <label className='tw-my-auto tw-text-[14px]'>1 minute 28 seconds</label>

        </div>

        <div className='tw-flex tw-justify-between'>

          <div className='tw-flex tw-gap-3'>
            <CallIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
            <label className='tw-my-auto tw-text-[14px]'>Outgoing voice call at 7:19 PM</label>
          </div>

          <label className='tw-my-auto tw-text-[14px]'>1 minute 28 seconds</label>

        </div> */}
      </div>

    </div>

  );
}

export default CallViewSection;