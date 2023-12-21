import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

function Chat() {
  return (
    <div className='tw-w-full tw-pb-5'>
      <h2 className='tw-mt-1 tw-text-lg tw-font-semibold'>Chats</h2>

      <div className='tw-w-full tw-mt-5 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-md tw-font-thin'>Chat history</label>
        <div>
          <PhoneAndroidIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-text-white tw-ml-2'>Synced with your phone</label>
        </div>
      </div>


      <div className='tw-w-full tw-mt-8 tw-flex tw-flex-col tw-gap-0'>
        <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-white'>Archive all chats</button>
        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>You will still receive new messages from archived chats</label>
      </div>

      <div className='tw-w-full tw-mt-8 tw-flex tw-flex-col tw-gap-0'>
        <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-red-300'>Clear all messages</button>
        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Delete all messages from chats and groups</label>
      </div>

      <div className='tw-w-full tw-mt-8 tw-flex tw-flex-col tw-gap-0'>
        <button className='tw-w-[150px] tw-bg-[#373737] hover:tw-bg-[#414141] tw-text-xs tw-text-red-300'>Delete all chats</button>
        <label className='tw-text-xs tw-text-[#A4A4A4] tw-mt-3  '>Delete all messages and clear the chats from your history</label>
      </div>


    </div >
  );
}

export default Chat;