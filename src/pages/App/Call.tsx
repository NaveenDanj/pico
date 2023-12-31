import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
import { useEffect, useState } from 'react';
import { CallDTO } from 'src/types/dto';
import CallItem from 'src/components/call/CallItem';
import HandleCallService from 'src/services/Call/HandleCallService';
import LoadingComponent from 'src/components/dialogs/LoadingComponent';
function Call() {

  const [calls , setCalls] = useState<CallDTO[]>([]);
  const [loading , setLoading] = useState(true);

  useEffect(() => {

    const fetchUserCalls = async () => {
      setLoading(true);
      const calls = await HandleCallService.getUserCalls();
      setLoading(false);
      if(calls.success){
        setCalls(calls.calls);
      }
    };

    fetchUserCalls();

  }, []);

  if(loading) return (
    <LoadingComponent />
  );


  return (
    <div>

      <div className="tw-px-5 tw-mt-4 ">

        <div className="tw-flex tw-justify-between">

          <h1 className="tw-text-lg tw-font-bold tw-my-auto">Calls</h1>

          <div className="tw-flex tw-gap-1 tw-my-auto">
            {/* <CallMainDialog /> */}
          </div>

        </div>

        <div className='tw-mt-3'>

          <div className='tw-flex tw-w-full tw-bg-[#3B3B3B] tw-px-1 tw-rounded-sm'>
            <input type='text' placeholder='Search or start new call' className='tw-w-full  tw-p-1 tw-text-xs' />
            <SearchIcon sx={{ width: 16, marginLeft: 1 }} />
          </div>

        </div>

      </div>

      <div style={{ height: 'calc(100vh - 92px)' }} className='tw-px-5 tw-py-7 tw-flex tw-flex-col tw-gap-3 tw-overflow-y-auto'>

        <div className='tw-w-full tw-flex tw-justify-between tw-bg-[#4D4D4D] tw-p-2 tw-rounded-md tw-cursor-pointer'>

          <div className='tw-flex tw-gap-4'>

            <Avatar><LinkIcon className="tw-text-white" /></Avatar>

            <div className='tw-flex tw-flex-col'>
              <label className='tw-text-sm tw-font-medium'>Create call link</label>
              <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Share a link for your Pico call</label>
            </div>

          </div>

        </div>

        {calls.map((call) => (<CallItem callItem={call} />) )}
      </div>

    </div>
  );
}

export default Call;