import { Avatar } from '@mui/material';
import { CallDTO } from 'src/types/dto';
import CallIcon from '@mui/icons-material/Call';
import { RootState } from 'src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setCurrentCall } from 'src/store/slices/CallInfoSlice';



interface CallItemDTO {
    callItem: CallDTO
}

function CallItem({callItem} : CallItemDTO) {

  const user = useSelector((state: RootState) => state.user.additionalData);
  const dispatch = useDispatch();


  const trimAndEllipsis = (inputString:string, maxLength:number) => {
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength - 3) + '...';
    } else {
      return inputString;
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function formatDateDisplay(date) {
    const d = moment(new Date(date.seconds * 1000));
    const now = moment();

    const diff = now.diff(d, 'days');
  
    if (diff === 0) {
      return d.format('h:mmA');
    } else if (diff === 1) {
      return 'Yesterday';
    } else if (now.year() === d.year()) {
      return d.format('MMM D');
    } else {
      return d.format('YYYY/MM/DD');
    }
  }

  const handleClick = () => {
    dispatch(setCurrentCall(callItem));
  };


  return (
    <div onClick={() => handleClick()} className='tw-w-full tw-flex tw-justify-between tw-p-2 tw-rounded-md tw-cursor-pointer'>

      <div className='tw-flex tw-gap-4 tw-w-full'>

        <Avatar src={callItem.dp} />

        <div className='tw-flex tw-flex-col tw-gap-1 tw-w-full '>
            
          <div className='tw-flex tw-w-full tw-justify-between '>
            <label className='tw-text-sm tw-my-auto tw-font-medium'>{trimAndEllipsis(callItem.contactName , 15)}</label>
            <label className='tw-text-[10px] tw-my-auto tw-text-[#A3A3A3] tw-font-semibold'>{formatDateDisplay(callItem.timestamp)}</label>
          </div>

          <div className='tw-flex tw-gap-2'>
            <CallIcon sx={{ fontSize : 16 }} />
            <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>{ callItem.answered ? user?.uid == callItem.calleeId ? 'Incoming' : 'Outgoing' : 'Missed'}</label>
          </div>
        </div>

      </div>

    </div>
  );
}

export default CallItem;