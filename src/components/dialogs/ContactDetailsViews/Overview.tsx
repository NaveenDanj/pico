import { Avatar } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Overview() {
  return (
    <div className='tw-w-full'>

      <Avatar className="tw-mt-3" sx={{ width: 100, height: 100 }} src="https://avatars.githubusercontent.com/u/48654030?v=4" />

      <div className='tw-w-full tw-mt-3 tw-flex tw-justify-between'>
        <label className='tw-text-lg tw-font-thin tw-mt-3 tw-my-auto'>Naveen Dhananjaya</label>

        <div className="tw-w-[29px] tw-h-[29px] tw-flex tw-justify-center tw-items-center tw-rounded-md tw-my-auto hover:tw-bg-[#4B4B4B]">
          <InfoOutlinedIcon sx={{ width: 14 }} />
        </div>

      </div>

      <div className='tw-w-full tw-mt-3 tw-flex tw-flex-col'>
        <label className="tw-text-xs tw-text-[#878787]">Created</label>

        <div className="tw-flex tw-justify-between">
          <p className="tw-text-xs tw-max-w-[300px] tw-my-auto tw-mt-1">
                        ‎4‎/‎18‎/‎2022 ‎1‎:‎10‎ ‎PM
          </p>
        </div>
      </div>

      <div className='tw-w-full tw-mt-3 tw-flex tw-flex-col'>
        <label className="tw-text-xs tw-text-[#878787]">Description</label>

        <div className="tw-flex tw-justify-between">
          <p className="tw-text-xs tw-max-w-[300px] tw-my-auto tw-mt-1">
                        මේකට ඇඩ් උනාම අරකෙන් ලීව් වෙන්න අනිවාරෙන්❤️
          </p>
        </div>
      </div>

      <div className='tw-w-full tw-mt-3 tw-flex tw-flex-col'>
        <label className="tw-text-xs tw-text-[#878787]">Disappearing messages</label>

        <div className="tw-flex tw-justify-between">
          <p className="tw-text-xs tw-max-w-[300px] tw-my-auto tw-mt-1">
                        Off
          </p>
        </div>
      </div>


      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }} className='tw-w-full tw-pb-5 tw-mt-4 tw-flex tw-flex-col tw-gap-1'>
      </div>

      <div className="tw-w-full tw-justify-between tw-flex tw-mt-5">
        <div className='tw-flex tw-flex-col'>
          <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-white'>Exit group</button>
        </div>

        <div className=' tw-flex tw-flex-col'>
          <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-red-300'>Report group</button>
        </div>
      </div>

    </div>
  );
}

export default Overview;