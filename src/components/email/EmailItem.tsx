import { Avatar } from '@mui/material';

function EmailItem() {
  return (
    <div className='tw-w-full tw-flex tw-p-2 tw-justify-between tw-cursor-pointer'>

      <div className='tw-flex tw-gap-4 tw-w-[100%]'>

        <Avatar src="https://avatars.githubusercontent.com/u/48654030?v=4" />

        <div className='tw-flex tw-flex-col tw-w-[100%]'>
          <div className='tw-flex tw-justify-between tw-w-[100%]'>
            <label className='tw-my-auto tw-text-sm tw-font-medium'>ShiftX Tech</label>
            <label className='tw-my-auto tw-text-[10px] tw-text-[#A3A3A3] tw-font-thin'>1:00 PM</label>
          </div>
          <label className='tw-text-xs tw-text-[#A3A3A3] tw-font-thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</label>
        </div>

      </div>

    </div>
  );
}

export default EmailItem;