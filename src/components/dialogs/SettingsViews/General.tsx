import { FormControlLabel, Switch } from '@mui/material';

function General() {
  return (
    <div className='tw-w-full'>
      <h2 className='tw-mt-1 tw-text-lg tw-font-semibold'>General</h2>

      <div className='tw-w-full tw-mt-3 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-md tw-font-thin'>Login</label>
        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-1'>Start Pico at login</label>
        <div className='tw-flex tw-mt-0'>
          <FormControlLabel className='tw-my-auto' control={<Switch className='tw-ml-1' size="small" defaultChecked />} label="" />
          <label className='tw-text-xs tw-text-[#A4A4A4] tw-my-auto'>Off</label>

        </div>
      </div>


      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }} className='tw-w-full tw-pb-5 tw-mt-4 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-md tw-font-thin'>Typing</label>
        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-1'>Change typing settings for autocorrect and misspelled highlight from Windows Settings</label>
      </div>

      <div className='tw-w-full tw-mt-4 tw-flex tw-flex-col tw-gap-1'>
        <button className='tw-w-[100px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-white'>Logout</button>
        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-1'>Your chat history will be cleared when you log out</label>
      </div>

    </div>
  );
}

export default General;