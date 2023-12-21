import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

function Account() {
  return (
    <div className='tw-w-full tw-pb-5'>
      <h2 className='tw-mt-1 tw-text-lg tw-font-semibold'>Account</h2>

      <div className='tw-w-full tw-mt-3 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-md tw-font-normal'>Privacy</label>
        <label className='tw-text-xs tw-text-[#A4A4A4]'>Managed on your phone</label>
      </div>


      <div className='tw-w-full tw-pb-5 tw-mt-4 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-sm tw-font-thin tw-text-[#A4A4A4]'>Last seen and online</label>
        <label className='tw-text-sm tw-text-white '>Nobody</label>
        <label className='tw-text-xs tw-font-thin tw-text-[#A4A4A4]'>If you don't share your Last Seen, you won't be able to see other people's Last Seen.</label>
      </div>

      <div className='tw-w-full tw-pb-5 tw-mt-0 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-sm tw-font-thin tw-text-[#A4A4A4]'>Profile photo</label>
        <label className='tw-text-sm tw-text-white '>My contacts</label>
      </div>

      <div className='tw-w-full tw-pb-5 tw-mt-0 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-sm tw-font-thin tw-text-[#A4A4A4]'>About</label>
        <label className='tw-text-sm tw-text-white '>Everyone</label>
      </div>

      <div className='tw-w-full tw-pb-5 tw-mt-0 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-sm tw-font-thin tw-text-[#A4A4A4]'>Add to groups</label>
        <label className='tw-text-sm tw-text-white '>Everyone</label>
      </div>

      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }} className='tw-w-full tw-pb-5 tw-mt-0 tw-flex tw-flex-col tw-gap-1'>
        <label className='tw-text-sm tw-font-thin tw-text-[#A4A4A4]'>Read receipts</label>
        <label className='tw-text-sm tw-text-white '>On</label>
        <label className='tw-text-xs tw-font-thin tw-text-[#A4A4A4]'>Read receipts are always sent for group chats</label>
      </div>

      <div className='tw-w-full tw-pb-5 tw-mt-3 tw-flex tw-flex-col tw-gap-0'>
        <label className='tw-text-md tw-font-normal'>Blocked contacts</label>
        <div className='tw-flex tw-mt-0'>
          <i><label className='tw-text-sm tw-my-auto tw-text-[#A4A4A4]'>Managed on your phone</label></i>
        </div>

        <div className='tw-mt-3'>
          <PhoneAndroidIcon className='tw-my-auto' sx={{ fontSize: 18 }} />
          <label className='tw-text-xs tw-ml-2 tw-my-auto tw-text-[#A4A4A4]'>7 blocked contacts</label>
        </div>
      </div>

    </div >
  );
}

export default Account;